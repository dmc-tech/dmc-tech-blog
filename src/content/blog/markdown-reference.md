---
title: 'Markdown formatting reference'
description: 'A quick check that headings, code, lists, tables, and images all render.'
pubDate: 2026-09-06
tags: ['meta', 'reference']
---

A short reference for how Markdown renders on this site.

## Text

**Bold**, _italic_, `inline code`, and [a link](https://astro.build).

> A blockquote, for when someone else said it better.

## Lists

- First item
- Second item
  - Nested item
- Third item

1. Step one
2. Step two

## Code

```js
export function greet(name) {
  return `Hello, ${name}`;
}
```

## Table

| Generator | Needs CI? | Language |
| --------- | --------- | -------- |
| Jekyll    | No        | Ruby     |
| Astro     | Yes       | JS       |
| Hugo      | Yes       | Go       |

## Images

Drop an image in `src/content/blog/` next to the post (or in `/public`) and
reference it with standard Markdown image syntax.
