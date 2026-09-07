# DMC Tech Blog

A Markdown blog built with [Astro](https://astro.build) and deployed **free** to
GitHub Pages. Write a `.md` file, push to `main`, and GitHub Actions builds and
publishes the site.

## Project layout

```
.
├── .github/workflows/deploy.yml   GitHub Actions -> GitHub Pages
├── astro.config.mjs               site URL + integrations (EDIT the domain here)
├── src/
│   ├── consts.ts                  site title, description, author, socials
│   ├── content.config.ts          blog frontmatter schema
│   ├── content/blog/*.md          <-- your posts live here
│   ├── utils/posts.ts             post loader + archive/tag grouping
│   ├── components/                Head, Header, Footer, PostList, Sidebar, ...
│   ├── layouts/                   Base.astro (optional sidebar slot), BlogPost.astro
│   ├── pages/
│   │   ├── index.astro            home (latest 5 posts)
│   │   ├── about.astro
│   │   ├── blog/index.astro       all posts + sidebar
│   │   ├── blog/[...slug].astro   one post per Markdown file
│   │   ├── blog/[year]/index.astro       posts in a year  (/blog/2026/)
│   │   ├── blog/[year]/[month].astro     posts in a month (/blog/2026/09/)
│   │   ├── tags/index.astro       all tags
│   │   ├── tags/[tag].astro       posts for one tag (/tags/azure-local/)
│   │   ├── rss.xml.js             /rss.xml feed
│   │   └── 404.astro
│   └── styles/global.css
└── public/
    ├── CNAME                      custom domain (EDIT this)
    ├── favicon.svg
    └── robots.txt                 (EDIT the sitemap URL)
```

## Writing a post

Create `src/content/blog/my-post.md`:

```markdown
---
title: 'My post title'
description: 'One sentence shown in listings and search results.'
pubDate: 2026-09-07
# Uncomment either line below by deleting the leading "# ". Keep the value
# quoted and put NOTHING after it on the same line (no trailing comments).
# updatedDate: 2026-09-10
# heroImage: './images/my-post/cover.png'
tags: ['cloud', 'notes']
draft: false
---

Your content in **Markdown**.

Reference images relative to this file — Astro bundles and optimises them:

![Diagram](./images/my-post/diagram.png)
```

The file name becomes the URL: `my-post.md` -> `/blog/my-post/`.
Set `draft: true` to keep a post out of the build, listings, and RSS.

Commit and push to `main`; the site redeploys automatically.

## Navigation

The blog, year, month, and tag pages share a right-hand sidebar
([`src/components/Sidebar.astro`](src/components/Sidebar.astro)) with two parts,
both generated from post frontmatter at build time:

- **Archive** — `pubDate` grouped into collapsible year → month lists, linking to
  `/blog/2026/` and `/blog/2026/09/`. Dates are bucketed in UTC.
- **Tags** — every value from every post's `tags:` array, de-duplicated by a
  URL slug (`'Azure Local'` → `/tags/azure-local/`), sorted by frequency.

Nothing to maintain: add a post with a new date or tag and the pages, counts, and
sidebar links appear on the next build. The grouping logic lives in
[`src/utils/posts.ts`](src/utils/posts.ts). To drop the sidebar from a page,
remove the `<Sidebar slot="sidebar" />` line; `Base.astro` renders the two-column
layout only when that slot is filled.

## One-time setup

### 1. Install Node.js (for local preview only)

Not required to publish, but needed to run the site on your machine.
Install **Node.js 22 LTS or newer** from <https://nodejs.org> (or via `winget
install OpenJS.NodeJS.LTS` / `nvm`). The CI build uses Node 24.

### 2. Install dependencies and preview locally

```bash
npm install
npm run dev
```

Open <http://localhost:4321>. `npm run build` outputs the static site to `dist/`;
`npm run preview` serves that build.

### 3. Create the GitHub repo and push

```bash
git init -b main
git add .
git commit -m "Initial commit: Astro blog scaffold"
gh repo create dmc-tech/dmc-tech-blog --public --source=. --remote=origin --push
```

### 4. Turn on GitHub Pages

Repo **Settings -> Pages -> Build and deployment -> Source: GitHub Actions**.
The next push to `main` runs `.github/workflows/deploy.yml` and publishes.

### 5. Set your custom domain

1. Edit **`public/CNAME`** — replace `example.com` with your domain
   (e.g. `blog.dmc.tech` or `dmc.tech`).
2. Edit **`astro.config.mjs`** — set `site` to `https://<your-domain>`.
3. Edit **`public/robots.txt`** — update the `Sitemap:` URL.
4. Add DNS records at your registrar:
   - **Subdomain** (e.g. `blog.dmc.tech`): a `CNAME` record for `blog`
     pointing to `dmc-tech.github.io`.
   - **Apex/root** (e.g. `dmc.tech`): four `A` records to
     `185.199.108.153`, `185.199.109.153`, `185.199.110.153`,
     `185.199.111.153` (and optionally `AAAA` records to the GitHub Pages
     IPv6 addresses).
5. In **Settings -> Pages -> Custom domain**, enter the domain and, once DNS
   resolves, tick **Enforce HTTPS**.

Until the domain is live the site is reachable at
`https://dmc-tech.github.io/dmc-tech-blog/`. If you'd rather use that URL
permanently, delete `public/CNAME` and add `base: '/dmc-tech-blog'` to
`astro.config.mjs`.

## Cost

$0. Public GitHub repo + GitHub Pages + GitHub Actions (Pages builds don't count
against Actions minutes for public repos). A custom domain is the only optional
paid piece, and it's bought from your registrar, not GitHub.
