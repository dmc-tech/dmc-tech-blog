---
title: 'Hello, world'
description: 'Why this blog exists and how it is put together.'
pubDate: 2026-09-07
tags: ['meta']
---

This is the first post on the DMC Tech Blog. It exists mostly so I have somewhere
to write things down.

## How it works

Every post is a Markdown file in the `src/content/blog/` folder of a GitHub repo.
When I push to `main`, a GitHub Actions workflow builds the site with
[Astro](https://astro.build) and deploys it to GitHub Pages. No servers, no
database, no monthly bill.

## Writing a post

1. Create a new `.md` file under `src/content/blog/`.
2. Add the frontmatter block (`title`, `description`, `pubDate`).
3. Write the body in Markdown.
4. Commit and push.

That's the whole workflow.
