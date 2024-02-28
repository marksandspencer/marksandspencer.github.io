---
layout: post
title: Announcing our open-source project, Nx Plugins
published: true
description: Nx Plugins is a Nx mono repo which consists of plugins which supports the Nx eco-system.
author: Farhan Patwary, Prabhat Thapa, Andrea Caldera, Danyal Aytekin
author: 
  - name: Farhan Patwary
  - name: Prabhat Thapa
  - name: Andrea Caldera
  - name: Danyal Aytekin
usemathjax: true
categories:
  - nx-plugin
  - end-to-end-testing
tags:
  - open-source
  - nx
  - playwright
date: 2022-08-05
banner:
  image: terminal.png
---

Today, we are excited to announce an open-source project called [Nx Plugins](https://github.com/marksandspencer/nx-plugins).

## Introduction

Nx Plugins is a [Nx](https://nx.dev) mono repo which consists of plugins which support the Nx eco-system.

Our plugins so far include:

- [**nx-playwright**](https://www.npmjs.com/package/@mands/nx-playwright): an [Nx plugin](https://nx.dev/packages/nx-plugin) to add support to an Nx monorepo for Playwright testing using a native runner.

## Motivation

Our choice of framework for e2e testing is Playwright. There is already a plugin available for Playwright tests on NX but it does not support the native Playwright runner.

The native Playwright runner gives you the following advantages:

- Recommended by Playwright
- Nicer syntax and built-in assertions
- Easier to find docs on playwright.dev

## Why Open Source?

Adoption for Nx as a mono repo build tool has significantly increased over time. However, there is often some extra configuration work required in order to use external libraries/tools.

While working on an internal project where we were using Playwright for end-to-end testing, some manual configuration was required to integrate native Playwright with Nx.

We came up with an internal project to create a plugin which simplifies integration of Nx with Playwright.

With a successful implementation of the nx-plugins project, we decided to open-source it to allow the community to benefit from it and contribute to it.

## Licensing

Our project is published under the [MIT License](https://github.com/marksandspencer/nx-plugins/blob/main/LICENSE.md).

## Join Us

We appreciate all input and contributions from the community.  
Please share any feedback or questions via [GitHub Issues](https://github.com/marksandspencer/nx-plugins/issues).  
To contribute please check our [contribution guidelines](https://github.com/marksandspencer/nx-plugins/blob/main/CONTRIBUTING.md).  
Your support will help to shape the project to meet community needs.
