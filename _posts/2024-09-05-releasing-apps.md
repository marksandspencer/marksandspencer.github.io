---
layout: post
title: Releasing apps at M&S
published: true
author: 
  - name: Jamie Sanson
    github: jamiesanson
date: 2024-09-05
categories:
  - mobile
tags:
  - mobile
  - platform
banner:
  image: digital-design-language.png
---

At M&S we ship many apps, all the time. Our customer facing apps are growing by the day, and our old, time-consuming fortnightly release process was starting to show it’s age.

It was time to go weekly, but getting there isn’t as easy as changing a 2 to a 1. We’d have to take a broader look at branching, design something simple, and roll it all out to the Android and iOS codebases without disrupting the many teams in many timezones working on them. Releasing had to be less about dealing with source control, and more about ensuring quality.

This is the story of our journey towards higher quality, more frequent releases, starting with: Releasing!

--- 

### Slow old GitFlow
Both our iOS and Android repos used the classic GitFlow branching structure for the longest time. If you’re not familiar with it, here’s a quick recap:

Day-to-day code lands on `develop` over the span of a couple of weeks, after which a  `release` branches is cut. The release candidate is tested and stabilized on the `release` branch before merging to `main` to trigger the deployment. `main` would then need re-merging with `develop`, to ensure those fixes made on `release` made it in to the next one.

![image](/assets/img/2024-09-05-gitflow-branching.png)
*Dual-trunk branching with GitFlow*

All in all, pretty reasonable! However, it started to become a problem for us as more and more developers started contributing. Branching from a working trunk and stabilizing was fine, as was merging to `main` - a target that isn’t moving. The problem was going the other way - re-integrating `main` with `develop`.

Our working trunk moved quickly, meaning that fixes made on our release branch would likely end up conflicting. Resolving this conflict ended up being a responsibility of the release champion, who sometimes wouldn’t have the context needed to action it correctly without effort. We automated as much as we could, merging this pull request automatically if there wasn’t conflicts. This meant less clicks of the “Accept” button, but meant it was easier to miss that a conflict existed and not action the merge at all!

This extra cognitive load on the release champion leads to slower releases. Not only are releases slower and harder to action, with GitFlow we miss out on fixes on the working trunk until the release is finalized. We can mitigate this through _multiple_ pull requests, but that’s even more cognitive load.

### The one trunk to rule them all
Managing two trunks was starting to get impractical - why not get rid of one of them?

Trunk-based development is an approach where there’s one trunk branch (like `main`), and all work lands there. All work is releasable, made possible by feature flags and automated testing, meaning any given commit is safe to release! While this sounds great in theory, and works well in systems where rolling backwards or forwards is quick and easy, it’s problematic for mobile apps.

Apps are constrained by the stores, not shipping our releases to customers before taking their time reviewing. It’s takes a good amount longer for adoption to then ramp up, meaning it takes a long time to create a fix and address it. Even if we had incredible test coverage, it’s near-impossible to test every given scenario your app will be run under in production.

A branching structure growing in popularity for mobile apps nowadays is a combination of trunk-based development and release branches. Let’s explain:

Developers do their work in small, manageable chunks, and merge into a trunk branch: `main`. Every week (or fortnight in our case), a workflow kicks off to cut a _release branch_. This release branch behaves similarly to the GitFlow release branch - it’s fixing our base at a given point, allowing us to stabilize before releasing. Fixes for the release could go one of two ways - based on release and merged into the release branch, or based on `main`, and back-ported to the release branch.

// Insert branching diagram

Merging a release branch back in to where it came from was one of the time sinks we were looking to get rid of, removing the need to resolve merge conflicts. Instead, we aimed for fixing on `main`, and _never_ merging the release branch back in.

To make this “back-porting” simple for developers, we introduced an automatic cherry-picking workflow. When bugs come up in a release before deployment, pull requests with fixes would land in `main`, first. These pull requests have a special label which another piece of automation picks up on, knowing to cherry-pick the newly merged work on to the open release branch!

This works the majority of the time, but what about merge conflicts? In our old school GitFlow model, resolving conflicts ended up being the responsibility of the release champion, who may or may not have all the context needed. With our cherry-picking flow, the conflicts end up having to be resolved more granularly the _other way around_.

Developers fix their bugs on `main`, meaning the code they need to modify to address the issue has moved on from the base the release branch was cut from. If a fix can’t be cleanly cherry-picked onto the release branch, the author of the fix is prompted to create a pull request _per-fix_, addressing conflicts more granularly as they come up!

### Building a release process for portability
Across M&S we have more than 100 mobile applications in their own individual repositories. A lot of these have their own, manual release process, and a consistent branching structure doesn’t exist. We knew this coming in to the reimagining of our releasing process, and built it from the ground up with _portability_ in mind.

Our release process can be summarized as just two manual steps:
1. Create the release branch, and wait for stability.
2. Deploy the release to production.

Along the way we have automated processes that kick in and do the rest of the work: Commits to release branches submit builds to the stores, and a special cherry-pick label manages fixes destined for the release.

The common points across _all_ mobile release then end up being:
1. Releases are cut from the `main` branch.
2. Commits to the `release/X` branch builds the apps, and stages them somewhere.
3. Releases are “finalized”, promoting the latest build and sending any relevant comms.

We aimed to build these actions in a platform- & store-agnostic way - what applies to Android should apply to iOS, and what applies to Google Play should apply to internal Endpoint management systems!

We’ve recently reused the same code in iOS, leveraging reusable workflows to share portions of our process, and are generalizing more and more of the process to apply to all our other applications.

### Conclusion
Our first step towards weekly releases was to get the process right. Dual-trunks were a bottleneck at our scale, and things needed to change. Moving to a single trunk with familiar release branching simplified the day-to-day of our developers, and made championing a release a breeze.

By focussing on minimizing the strain on developers writing, merging and shipping code, we open the door to more focus on quality. Our release processes now take single-digit minutes of manual intervention, freeing up developers time for more important things, like testing and polish.

Nailing the process isn’t everything, and there’s more to do to keep our quality high before we get to weekly releases, but it’s a big step in the right direction.
