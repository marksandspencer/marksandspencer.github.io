# Integrating Cloud Entity with Next Auth

M&S is in the process of updating our retail platform. As part of this we will decouple identity from our existing monolith and modernise the feature set along the way.

Our chosen Customer Identity and Access Management (CIAM) provider is [Cloud Entity](https://cloudentity.com) (CE). This goal of this post is to cover the integration with [Next Auth](https://next-auth.js.org) as there wasn't much out there that helped me. In the future I expect the CE team will build a Next Auth provider but in the meantime there were a few gotchas for our setup so I'll wax lyrical about my findings. 

TLDR; copypasta to get going for the authorisation code flow.

...

```
{
      id: 'cloudentity',
      name: 'Cloud Entity,
      type: 'oauth',
      wellKnown: `${process.env.OAUTH_BASE_URL}/default/.well-known/openid-configuration`,
      authorization: {
        params: {
          scope: 'email offline_access openid profile profile.*',
          acr_values: acrValues,
        },
      },
      profile(profile) {
        return {
          id: profile.idp,
        };
      },
      idToken: true,
      clientId: process.env.CE_CLIENT_ID,
      clientSecret: process.env.CE_CLIENT_SECRET,
      checks: ['pkce', 'state'],
    }
```

## Getting Started

Setting up the Cloud Entity workspace is out of scope for this post because... that was all setup by the time I started :)

We'll pickup from creating an OAuth App in the CE portal. For Next Auth, we'll use a "ServerWeb" type app:

![Image description](https://dev-to-uploads.s3.amazonaws.com/uploads/articles/5ddk3r2sxzfokjgfvrl1.png)

Once that's created, grab your client id and secret and stick  them wherever you put your environment config.

If the workspace was configured well, it's likely you won't need to change anything in the OAuth tab, but just to be sure, you'll need these types for grant and response type available for this setup to work:

![Image description](https://dev-to-uploads.s3.amazonaws.com/uploads/articles/bnhzsv5mhi9cwm1m7pdc.png)
 
Add any scopes you're interested in, they won't be relevant to the basic integration but you'll need to make sure the scopes you set in the provider are a subset of the selected scopes in the app.

The one change that is **required ** is configuring your redirect URIs. If you are using the config above then the url for local development would look something like: `http://localhost:3000/api/auth/callback/cloudentity`.

## Next Provider Setup

There's lots of potential configuration here. If you read the docs and you know oauth well, it would be a breeze. I went with the less efficient approach of diving in head first. Fortunately for you, I hit a lot of problems and now, after lots of poking around in node modules with the debugger, I have a decent understanding. There are a few things that are obvious in retrospect but I knew just enough to be dangerous and fell for all the traps!

Start with OIDC! The "OIDC DISCOVERY" url from the portal and `wellKnown` configuration in the provider match up nicely and do all of the work for you. This is where I started too but various errors caused me to revert to configuring each url and then to customising the request for them too, all ended up being unnecessary.

The overall flow is, in retrospect, simple:

1. App redirects to the `oauth2/authorize` passing the required payload in query params.
1. Cloud Entity asks the user to log in using one of the options configured (commonly email/password) 
1. On successful authentication CE redirects back your app, to the redirect url you provided, with a code
1. We POST that code back to cloud entity `oauth2/token` from the server side to CE and get a JWT back.


### My Learnings
- By default Next Auth uses basic auth (e.g. Authorization: base64(username:password)) when it sends the code to request a token. I thought this was a mismatch in what each offered and ended up implementing a custom token request like so:

```
token: {
          async request(context) {
            const params = {
              grant_type: 'authorization_code',
              client_id: context.provider.clientId,
              client_secret: context.provider.clientSecret,
              redirect_uri: context.provider.callbackUrl,
              code: context.params.code,
              code_verifier: context.checks.code_verifier,
              code_challenge_method: 'S256',
            };
            const res = await fetch(
              '${process.env.OAUTH_BASE_URL}/default/oauth2/token',
              {
                method: 'POST',
                body: new URLSearchParams(params).toString(),
                headers: {
                  'Content-Type': 'application/x-www-form-urlencoded',
                },
              }
            );
            return { tokens: await res.json() };
          },
        },
```
Turns out supported credential method can be configured in the CloudEntity app and this was the key to unlocking the OIDC config approach for me. 

![Image description](https://dev-to-uploads.s3.amazonaws.com/uploads/articles/q653o38qvpcvblx1il4w.png)
 
- The encode and decode options are only relevant to the JWT the next app uses to save the session. 
The confusion here came because our workspace is configured to use `ES256` to sign the tokens that come back from CE and by default Next Auth accepts `RS256` so when the token comes back I was seeing: `'unexpected JWT alg received, expected RS256, got: ES256'`. I'd seen the encode decode options so naturally jumped to these to try solve the problem :( 
The long and short of it is, you can configure the expected algorithm in each provider like so:

```
      id: 'cloudentity',
      client: {
        id_token_signed_response_alg: 'ES256',
      },
```

- PKCE setup is all automatic (with debug on, you'll see the generated values in the logs) so no need to touch that!
- As is state. At one point I was seeing an error about not passing state and it seemed like I had to pass a value in authorize params. If everything else is correct, you won't need to set this.

- It's a good idea to have debug mode on so you get visibility of the tokens and requests and you'll almost definitely want to have JWT sessions too. In the top level Next Auth options:

```
    debug: true,
    session: {
      strategy: 'jwt',
      maxAge: 30 * 24 * 60,
    },
```
- Cloud Entity returns idToken by default, you'll need to set `idToken: true` or you'll see `'id_token detected in the response, you must use client.callback() instead of client.oauthCallback()'` incidentally it's the `id_token: true|false` value set in the options that determines the function called.


- By default, even if you're using JWT session strategy, the access token (the one you'll likely want to make any future api requests) is not included. You can use the sample code in the docs https://next-auth.js.org/configuration/callbacks#jwt-callback for both session and JWT to get it included. For the poc I did we had different auth levels and wanted to expose that at the session level. It's also worth paying attention to the docs, the functions are called with different values for the first time and any future call. (IMO should be different functions, let consumers manage code reuse and expose a declarative API)

```
callbacks: {
      jwt({ token, account, user }) {
        const accessToken = user?.access_token || account?.access_token;
        const decoded = jwt.decode(accessToken as string) as JWT;
        return user || account
          ? {
              ...token,
              accessToken,
              sessionType: decoded.usersID ? 'registered' : 'guest',
            }
          : token;
      },
      session({ session, token }) {
        return {
          ...session,
          accessToken: token.accessToken,
          sessionType: token.sessionType,
        };
      },
    },
```

- `acr_values` can be another gotcha. The spec says they should be communicated by the OIDC discovery endpoint but for me they weren't so you might have to ask around if you didn't configure the workspace. My values were also dynamic: when converting a guest session to a logged in session I need to pass the access token in the acr value. You can achieve something like that by using `getToken` and changing the `export default NextAuth({` to:

```
import { getToken } from 'next-auth/jwt';
export default async function auth(req: NextApiRequest, res: NextApiResponse) {
    ...
    const accessToken = (await getToken({req}))?.accessToken as string; // (Depends on your session setup)
    return await NextAuth(req, res, nextAuthOptions);
}
```

## The Frontend

The frontend setup for your auth pages is simple (if everything else is working correctly!)

Grab the session with: `const session = useSession();`

And your CE JWT `session.data.accessToken`, again assuming you configure the session callback with the same property name as this.

## That's a wrap

Would the integration have been faster if I read the docs fully? Yes and I'd likely have got OIDC done first!

Would I understand what was happening under the hood and be able to quickly address problems in the future... probably not. The tricky job of matching the expected algorithm was in the openid-client docs and I probably wouldn't have gone to that level on first pass anyway.

Reading the docs definitely has its value but it rarely makes up for getting your hands dirty. Now, reading the docs with a working functional knowledge makes it feel like honing a sharp edge rather than trying to grind down a rusty old blade.

Hope you picked up something useful
