---
title: AXE (accessibility) tests in Onyx
published: true
author: Emma Patricios
date: 2023-04-04
categories:
  - ui library
tags:
  - ui library
  - accessibility
banner:
  image: digital-design-language.png
---

# Accessibility testing with AXE

Accessibility testing is necessary to ensure that our digital products and services can be used by everyone, including people with disabilities, improving the user experience in the process. It helps us to identify and remove barriers that may prevent people from completing their journey through a website.

## At M&S

At M&S we have added automated accessibility testing in two areas. The first is for each individual component within our Design System and the second is for the built pages within our apps.

### Why are the tests needed in two places?

While it’s possible to have totally accessible components they can still be put together in a way that makes the page itself inaccessible when using different data inputs.

### Can automated tests catch all violations?

Unfortunately not, we always add a caveat that any type of automated testing is no substitute for real-world user and assistive device testing. However, it does give us a great starting point and encourage us to think about accessibility from the start.

[An analysis of coverage rate attained by AXE automated testing from Deque Systems](https://www.deque.com/automated-accessibility-testing-coverage/)

### AXE by Deque Systems

We use [axe](https://www.deque.com/axe/) which is an accessibility testing toolkit created by Deque Systems. It is most widely used as a browser extension, but we use the [axe-playwright](https://github.com/abhinaba-ghosh/axe-playwright) module to check on a page level and fail CI builds if violations are found.

## Component level testing

Our components are built in a ui-library and displayed using Storybook. Each component gets tested using the automated AXE tests.

The axe test itself, runs over an automated list of Storybook IDs passed into the pnpm command. Using the Storybook IDs we can load each story and run `injectAxe()` to load in the `axe-core` runtime. Then we call `checkA11y(page, rootElement, options, shouldSkipErrors, reportType)`

```tsx
import { test } from "@playwright/test";
import { checkA11y, injectAxe } from "axe-playwright";

test.describe("Accessibility tests", () => {
  const storyIds = process.env.STORY_IDS.split(",");

  for (const storyId of storyIds) {
    test(`${storyId} has no a11y violations`, async ({ page }) => {
      await page.goto(`iframe.html?id=${storyId}&viewMode=story`);
      await injectAxe(page);
      await checkA11y(page, 'div[id="root"]', {}, false, "v2");
    });
  }
});
```

## Page level testing

Each app within our mono-repo has an associated e2e folder which is used for general end-to-end tests as well as the page level accessibility tests.

The test itself is similar to the component level tests, this time looping over a number of page urls taken from a config file.

```tsx
import { expect, test } from "@playwright/test";
import { checkA11y, injectAxe } from "axe-playwright";

import config from "../axe.config";

test.describe.parallel("Accessibility tests", () => {
  for (const path of config.paths) {
    test(`${path} has no a11y violations`, async ({ page }) => {
      await page.goto(path);
      await injectAxe(page);
      await checkA11y(page, "body", {}, false, "v2");
    });
  }
});
```

## Reports of violations

We use the `v2` reporter which is the new TerminalReporter inspired by the reports from [jest-axe](https://github.com/nickcolley/jest-axe). Violations are displayed like this in the console, giving additional information on how to fix the issue:

![image](/assets/img/2023-04-04-axe-test-violations.png)

## Running in CI

At M&S we use [GitHub Actions](https://github.com/features/actions) to build, test and deploy code into production. The tests above are added as jobs as part of the suit of checks that are run before code can be merged into the main branch.

```yaml
- name: AXE (accessibility) tests
  run: |
    set -x
    pnpm nx run ui-components:axe
```

## Summary

Automated AXE tests are just part of our accessibility testing at M&S. [Read more about accessibility testing in Onyx](https://www.notion.so/Accessibility-in-Onyx-6ef2f940fab94f8583c6dbe024a3d886).
