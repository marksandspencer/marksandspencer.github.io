# Contributing guidelines

👍🎉 First off, thanks for taking the time to contribute! 🎉👍

## Getting started

The few ways you can contribute

- Raise issues and pull requests to improve the site
- Raise pull requests to submit a blog post
- Raise pull requests to update documentation on the site [docs](./_docs) or README's

## Writing on your local site

The blog is built with [GitHub Pages](https://help.github.com/articles/what-is-github-pages/). Please set up a local version of your [Jekyll GitHub Pages](https://docs.github.com/en/pages/setting-up-a-github-pages-site-with-jekyll/testing-your-github-pages-site-locally-with-jekyll) site to test changes locally before making a pull request

### Raising issues and pull requests to improve the site

Follow the [issue template](./.github/ISSUE_TEMPLATE.md) and [pull request template](./.github/PULL_REQUEST_TEMPLATE.md) appropriately, for all purposes of the site (documentation, site construct.)

### Submitting blog posts.

- Create your blog posts under [_posts](_posts/).
- GitHub style Markdown is fully supported.
  - For LaTeX, follow [guide](https://github.blog/2022-05-19-math-support-in-markdown/).
- Each blog article requires a banner image which is stored in folder /assets/img/banners/. You can add a new banner there or use one of the existing ones.
- If you include images in the content of the article, please add those into the folder /assets/img/.
- Please test your changes locally before submitting a pull request.
- All pull requests need will need to pass through [the review process](#review-process).
- You can toggle the `published` boolean to control the publication or unpublishing of the blog to the site.

**Structure**

- Filename standard: `yyyy-MM-dd-<name of the blog>.md`
- Front Matter
  - Supports standard [jekyll Front matter](https://jekyllrb.com/docs/front-matter/)
  - e.g.:

```markdown
---
title: Title of your blog as you need it displayed
published: true/false (false will not publish it on the site)
author: Your name or comma separated names for multiple authors
description: brief description of the blog as subtext on the site
categories: 
  - yaml list of categories
tags: 
  - yaml list of tags 
date: yyyy-MM-dd
banner:
  image: just name of image (eg: image.png). The image will need to be stored in the /assets/img/banner folder
---
```

## Review process

TBD