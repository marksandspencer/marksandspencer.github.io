---
title: Password Manage your environment and secrets with bitwarden
published: true
description: Manage your secrets and local environment with bitwarden password manager
author: Steven Gonsalvez
usemathjax: true
categories: 
  - environment
  - secretmanagement
tags: 
  - azure
  - environment
  - secretmanagement
date: 2022-07-26
banner:
  image: passwordmanager.png
---

## Use a password manager to organise your local env and dot env files.

`dotenv` files for local development have been ever so popular with tonne of tools out there to manage.  Even if you utilise it for local development, if secrets and keys find their way into those dotenv files for convenience, it becomes an attack vector ready to be compromised.

Furthermore, with a lot of code and projects scattered around your desktop and a variety of contexts, it becomes difficult to keep dotenvs safe and managed over time.

>Note: Even for local development, it is not secure to keep secrets in dotenv files because that file exists on your desktop beyond that terminal session. Setting secrets as environment variables is not the best recommended security pattern because there are potential accidents (accidental environment prints in the debug log), open to easy attacks (environment is accessible through process - XML entity attacks and injection attacks), and application crashes cause environments to be logged into log-files on disc. For your topology, it is advisable to proceed with a passwordless, zero trust, identity-based configuration. I'll follow up with another post about this and effective ways to manage secrets/passwords.

## Use a password manager

If you are already not using a password manager for your general/personal access on the web and apps, will suggest to start doing so. Ditch your sticky notes, the Google keep or your spreadsheets of passwords and use password manager which is essentially an encrypted digital vault that stores secure password login information you use to access apps and accounts on your mobile device, websites and other services.

There are loads of password managers available, will leave that research out of this post, But if you are borderline about the premium to be paid for a password manager (it is worth it) - start with personal [bitwarden](https://bitwarden.com/), it is free for individual personal use and as a bonus it is also opensource.

The following is how I manage and access my environment/secrets for local development using Bitwarden. 

### Setup

Bitwarden setup is quite straightforward, and the [documentation](https://bitwarden.com/help/getting-started-webvault/) is clear to follow. This guide will more focus on the CLI and how you could use it effectively, to optimise your developer experience.

Once you've installed CLI locally, there are two ways to access the CLI (using an apikey/secret combination or login credentials with a 2FA code). Will recommend the latter because it is not static or stored.
Assuming you have also installed the desktop version of Bitwarden, then authenticating on the app will have logged you into Bitwarden across the workstation (if you configure the app on startup) (you would have to link up the browser helper e.g.: chrome bw extension, to the login of your app separately for the similar session.).
Instead of utilising 2FA, you might enable biometrics on your workstation or override with your system password.

- So on starting your terminal, you are logged into Bitwarden (you would not need to enter a 2FA). You would need to `bw unlock` for setting up a session on that terminal window to access secrets. Unlocking can also be done with apikey or with the master password (would not need 2FA, as it is an authenticated session.)
- You would need to set a session variable (as an env variable), to preserve the session on that terminal instance. This is to save you from `bw unlock` for every bw command you execute.
- The session is only valid for one terminal window/tab. So a new window/tab will need to do the above two steps

Once these steps are done, then you could execute any `bw` command within that session to access your vault. 


### Simplification

To simplify the above steps, will be using your shell startup configuration of the terminal to offload these steps e.g: ~/.zshrc or ~/.bash_profile or whatever is your preferred. The setup will execute and prompt for the password on the terminal when it is required (for setting session or unlocking).

Create the following aliases and functions in your shell configuration (~/.zshrc)

- unlock
  - On executing the `bw unlock`, the output will be as below
     ```
     Your vault is now unlocked!

     To unlock your vault, set your session key to the `BW_SESSION` environment variable. ex:
     $ export BW_SESSION="..REDACTED"
     $env:BW_SESSION="..REDACTED"
     ```       
    
    Create the following function in the startup configuration, which will export that environment variable and set the session.

     ```
     bwss() {
         eval $(bw unlock | grep export | awk -F"\$" {'print $2'})
     }
    ```
- Other command aliases.
  

    - `alias bwll="bw list items | jq '.[] | .name' | grep"` :- (to be executed as `bwll "somekey"` (just part of the key would do))
    - `alias bwg="bw get item"` :- (to be executed as `bwg "full_key_name"` after listing from above)
    - `alias bwl="bw list items | jq '.[] | .name'"` :- (to list all items `bwl`)

- Other helper functions
  
  - Function to set environment variables on the current session from a secure note of secret key/value pairs
   ```
   bwe(){
    eval $(bw get item $1 | jq -r '.notes')
   }
   ```
  
  - Function to create a new vault item out of existing dotenv files on your local: `bwc "name_of_vault_key"`
   ```
   bwc(){
     DEFAULT_FF=".env"
     FF=${2:-$DEFAULT_FF}
     #cat ${FF} | awk '{printf "%s\\n", $0}' |  sed 's/"/\\"/g' >/tmp/.env
     cat ${FF} | awk '{print "export " $0}' >/tmp/.xenv
     bw get template item | jq --arg a "$(cat /tmp/.xenv)" --arg b "$1" '.type = 2 | .secureNote.type = 0 | .notes = $a | .name = $b' |      bw encode | bw create item
     rm /tmp/.xenv
   }
   ```

  - Function to create a new vault item out of the entire terminal session environment: `bwce "name_of_vault_key"`
   ```
    bwce(){
      export | awk '{print "export " $0}' >/tmp/.env
      bw get template item | jq --arg a "$(cat /tmp/.env)" --arg b "$1" '.type = 2 | .secureNote.type = 0 | .notes = $a | .name = $b' | bw  encode | bw create item
      rm /tmp/.env
    }
   ```
   
### Using the functions and aliases.

Will use an example of managing azure apikeys/secrets/ for your local development. It does not need to be only limited to the secret, you can hold all environment variables for the context in a single key for effective bootstrapping.

So if you have a dotenv file as an example below

```
APIKEY=something
SECRET=something
configuration=host.com
environment=dev
region=eu-north
```

- To import this into the vault. At the location of the dotenv file, execute 
    - `bwss` and enter your password, this will setup the session on your terminal instance and
    - `bwc "az-example-dev"` to create the vault item. (Suggestion: use a prefix-item-env style naming convention for easy listing and setting.). This will create a new vault item with a secure note containing
       ```
       export APIKEY=something
       export SECRET=something
       export configuration=host.com
       export environment=dev
       export region=eu-north
       ```

- To use it (in a later session)
    - `bwss` and enter your password, this will setup the session on your terminal instance and
    - `bwe "az-example-dev"`: This will export all the environment variables in the secure note on that terminal session. 

- To list and set
    - `bwll "az-" to list all your azure vault items. e.g:
      
      ```
      "az-example-dev"
      "az-example-stage"
      "az-foo-dev"
      "az-wee-dev"
      "az-test-dev"
      ```
      And then you could execute `bwe` to set whichever setup you need.

- Deleting stale items : `bwdd "item-name"`
    ```
    bwdd(){
	 bw delete item $(bw get item $1 | jq .id | tr -d '"')
    }
    ```

How you organise your keys/secrets is up to you, but using a password manager will ensure 
- All secrets are safe in the vault, and there is no file sprawl.
- You could easily operate on other devices securely without having to worry about copying env files (because once the terminal is closed, the session/environment is lost).
- Simple management and configuration of environments in appropriate contexts, without the need to manage named dotenvs or folder hierarchies.

For the setup of your shell configuration using dotenv which includes all these functions and more, you can refer [stevengonsalvez/dotfiles](https://github.com/stevengonsalvez/dotfiles)

>Note: All of this is also possible in other password managers (Lastpass, 1password, Dashlane etc.)