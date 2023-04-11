---
title: Web Platform Accessibility
published: true
author: Emma Patricios
date: 2023-02-08
categories:
  - ui library
tags:
  - ui library
  - accessibility
banner:
  image: digital-design-language.png
---

# Web Platform Accessibility

From the very start of the development of the new web platform (Onyx), a single question has led the implementation of automated accessibility testing: How do we ensure the M&S customer is served an accessible web page?

## Code linting

We added an accessibility linter as part of the Onyx mono-repo for any issue that can be discovered during the development phase to catch issues early. [eslint-plugin-jsx-a11y](https://github.com/jsx-eslint/eslint-plugin-jsx-a11y) checks the static JSX code as it is written and flags any mistakes or omissions. It is set up in CI to fail the build if any violations are introduced via code merges.

We always add a caveat, that any type of automated testing is no substitute for real-world user and assistive device testing, but they give us a great starting point and encourage us to think about how we are coding.

![image](/assets/img/2023-03-08-linting.png)
_Example error flagged by eslint-plugin-jsx-a11y in the terminal_

## Storybook add-on

[Storybook](https://dev-core-components.azurewebsites.net/) is a visual representation of all the components that have been built so far, allowing us to view them in different states. We have added [@storybook/addon-a11y](https://github.com/storybookjs/storybook/tree/main/addons/a11y), provided by Storybook itself, to flag any violations the component story may have.

Again, the build will fail in CI if violations are found and not allow code to be merged into the main branch.

![image](/assets/img/2023-03-08-storybook.png)
_Example violation flagged inside Storybook_

## axe tests with Playwright

Although the components are tested, and as much as we try to prevent it, it is still possible for consumers to use them together in an inaccessible way when pages are built.

For this we use [axe](https://www.deque.com/axe/) which is an accessibility testing toolkit created by Deque Systems. It is most widely used as a browser extension, but we use the [axe-playwright](https://github.com/abhinaba-ghosh/axe-playwright) module to check on a page level and fail CI builds if violations are found.

## Contributing team documentation

Automated testing isn’t all we provide, we added a set of accessibility guidelines to Storybook that all contributors must read and adhere to when creating or updating components. If they are not followed, pull requests would not be accepted by our team.

Another page we added was my top ten accessibility mistakes, drawn up from the first few months of Onyx and my years of reviewing code with accessibility in mind.

## Summary

In summary, the implementation of automated accessibility testing in Onyx uses eslint-plugin-jsx-a11y for code linting, Storybook’s addon-a11y to check component stories, axe-playwright module to check at a page level and documentation for contributors. Our aim is to ensure that the M&S customer is served an accessible web page and we are well on our way to achieving that goal.
