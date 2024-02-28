---
layout: post
title: M&S's Rollercoaster Component Library Journey
published: true
author: 
     - name: Dilesh Mistry
     - name: Emma Patricios
       github: Emmasax
date: 2023-02-08
categories:
  - ui library
tags:
  - ui library
  - design
  - javascript
banner:
  image: digital-design-language.png
---

Software Engineering at M&S have been developing the UI since 2014 and we have tried a few times to react to customer needs quickly over the years. This article gives an overview of our journey and the lessons we’ve learnt – from custom-built vanilla JS to an industry-standard, reusable framework.

## How it started

We started our headless commerce journey with an Angular framework we called FEAR (Front-End Architecture, internally it is a running joke that M&S loves a good acronym).

As the industry moved towards NodeJS and Handlebars we followed suit, drawing inspiration from eBay’s front-end framework which prioritised SEO and page speed. We named this new product FESK (Front-End Starter Kit). It contained everything an engineer needed to develop and deploy a web application, leveraging a pattern library and common utilities to solve customer problems faster than FEAR, using Vanilla JS.

## So, what went wrong?

On reflection we see this in three parts:

### 1. Technology challenges

We decided on Vanilla JS because of the instability of popular frameworks at the time; however, this eventually made it hard to onboard and recruit engineers as most were focused on learning the other popular and emerging frameworks (such as Angular, React, etc.) which were becoming more lucrative on the job market.

FESK was complex to use and did not stick to industry standards, for example creating an incremental DOM implementation as an alternative to React's VirtualDom. As a direct result we had to maintain a lot of custom code and document it extensively.

The framework was built as multiple modules, leveraging NPM packages. Unintentionally, but by design, it separated the module from the users’ application and left us unaware of what was being used and the impact of change if a component was updated. This resulted in an architecture that was not well thought out and each web app became a page template, with each page template requiring its own engineering team.

With many separate teams as consumers, it was hard to understand if they were consuming the latest releases, and some teams didn’t update past the first release. Resulting in us missing the benefits of code reuse, and having many different independent forks to maintain.

### 2. Company culture and buy in (support)

FESK began as a POC for improving the front-end customer experience delivery, with two main focuses; Page speed and SEO value. Once initially proved, it was moved quickly to production and throttled up to the majority of the customer base without the usual due diligence or preparation for production.

While developing FESK itself, it was difficult to understand the consumer problems as they couldn’t articulate how FESK might be able to help them. This resulted in production issues and a lack of confidence in the product and its rollout across the web channel. As more teams adopted the product, it became clear we had not taken the business, and more importantly, the engineers on the journey to develop, own and maintain it.

This lack of buy-in showed itself through teams frequently not contributing back to FESK because of slowness in PR approvals, or simply not understanding its usefulness in their day-to-day operation. In addition, UX came late to the party as it was engineering-led, so they were playing catch up to requests they maybe did not fully understand.

As it grew, in an attempt to encourage engineers to talk about their common platform and progress it, the centralised team was replaced with a community model. This failed as all the users did not know how to, or were not interested in contributing in this way. Subsequently, without an active community, teams ended up building siloed components and experiences, reinventing the wheel without realising.

### 3. Platform responsibilities

To rectify the lack of buy-in we tried to add more useful documentation but failed to understand the discoverability of any of it, having built something so unique it was difficult for anyone to self-serve.

Without a central team or active community, the quality assurance of code that was originally being done manually, was no longer happening, and we saw code quality dip and had repeated rebuilds of components. This removed the other key benefits such as accessibility and reusability.

## What is Onyx Component Library?

Let’s start with Onyx first, it is the name given to our more modern web stack that enables users to leverage common capabilities to build features into their web applications faster than ever before.

Our aim with Onyx is to create a ‘batteries included’ web stack product with a no brainer design system for M&S web components which becomes the single-source of truth for engineering and UX, with a focus on best practices and industry standards.

## Why will it be different this time?

From our previous attempts we have realised that we are doing this to enable more extensive re-use across our web channels. The previous failures have proved to us the value of this and that reducing the repetition of building components & features ultimately speeds up development.

This time we have some guiding principles;

- To use industry standard technologies to enhance the developer experience - e.g. React, Typescript, Styled Components, Storybook and Percy

- Any component can be used in any app, so must be contributed to the Storybook component library

- Accessibility is baked into all core components – ensuring this was not an afterthought but an acceptance criterion for any change made to the component library

- Work in partnership with the UX team – to ensure that they are in the driving seat of change to the component library, including documenting their own best practices

This has resulted in a more architecturally sound product in the form of what we now call the M&S Web Design System.

Although still at the beginning of this transformation, we can see engagement from at least 10 teams, and high levels of contribution and component adoption and reuse across applications.

Leveraging industry-standard tools and techniques we have managed to not just solve our reusability problems but add value to them with user adoption metrics, visual regression testing efficiencies and an elevated level of standardisation, including and driven by accessibility.

## Where do we go next?

We still have a lot to learn and are finding new ways to work together through new problems that arise. We have new goals for where we can take our Design System and we think this could be valuable to the open-source community and that exposure will lead to a better product for M&S.

Thanks for reading, and let us know if you would like to see our open-source material?
