# Contributing guidelines

👍🎉 First off, thanks for taking the time to contribute! 🎉👍

## Getting started

There are a few ways you can contribute, including:

- Raise issues and pull requests to improve the site
- Raise a pull request to add a blog post
- Raise a pull request to update [the site's documentation](_docs) or READMEs

## How to run and test the site locally

The blog is built with [GitHub Pages](https://help.github.com/articles/what-is-github-pages/). Please set up a local version of your [Jekyll GitHub Pages](https://docs.github.com/en/pages/setting-up-a-github-pages-site-with-jekyll/testing-your-github-pages-site-locally-with-jekyll) site to test changes locally before creating a pull request.

### Raising an issues or pull request to improve the site

Follow the [issue template](./.github/ISSUE_TEMPLATE.md) and [pull request template](./.github/PULL_REQUEST_TEMPLATE.md) appropriately, for all purposes of the site (documentation, site construct.)

### Submitting a blog post

- Create your new post as a file under [_posts](_posts), using the following filename format:
    - `yyyy-MM-dd-<name of the blog>.md`.
- GitHub-style Markdown is fully supported.
  - For LaTeX, follow [GitHub's guide](https://github.blog/2022-05-19-math-support-in-markdown/).
- Each blog article requires a banner image, which should be placed in the folder `/assets/img/banners`. You can use an existing banner or add your own.
- If you include images in the content of the article, add them to the folder `/assets/img`.
- Please thoroughly test your changes locally before submitting a pull request.
- Each pull request will pass through [our review process](#review-process).
- Set the front matter boolean `published` (see below) to declare whether your post should be published immediately when your pull request is merged.

#### Markdown structure

- Front matter (standard [Jekyll front matter](https://jekyllrb.com/docs/front-matter)), for example:
- The content of your post, formatted with semantically structured Markdown.

#### Front matter example

```yaml
---
title: Title which will be displayed
published: true
author: First Author, Second Author
description: brief description of the blog as subtext on the site
categories: 
  - yaml list of categories
tags: 
  - yaml list of tags 
date: yyyy-MM-dd
banner:
  image: Image name without path, for example "image.png". Image must to be stored in `/assets/img/banner`
---
```

## Review process

TBD.