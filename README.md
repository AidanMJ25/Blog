# Aidan Maurin-Jones Blog

This repository contains the source for [blog.aidanmaurinjones.com](https://blog.aidanmaurinjones.com/), built with Hugo and deployed to GitHub Pages.

## Stack

- Hugo static site generator
- Custom theme in `themes/amj`
- Markdown content in `content/`
- GitHub Actions deployment from `main`

## Repository Layout

- `content/posts/`: blog posts
- `content/Newsletter/`: newsletter archive entries
- `themes/amj/`: custom layouts, CSS, and theme assets
- `layouts/shortcodes/`: repo-level shortcode overrides
- `layouts/_default/single.markdown.md`: Markdown alternate template for posts and newsletter issues
- `layouts/index.llms.txt`: build-time template for the site-wide LLM index
- `static/`: static files copied directly into the site
- `public/`: generated site output
- `.github/workflows/hugo.yml`: GitHub Pages build and deploy workflow

## Local Development

This project expects the Hugo extended build.

Preview locally:

```bash
hugo server -D
```

Build the site:

```bash
hugo
```

The generated output is written to `public/`.

## Machine-Readable Content

Hugo generates machine-readable content as part of every build; no additional post metadata, scripts, or hand-maintained index files are needed.

- Every post and newsletter issue gets a Markdown alternate beside its HTML page, for example `/posts/example/index.md`.
- Shortcodes render as Markdown-friendly links or content in the alternate representation.
- `/llms.txt` is generated from the posts and newsletter issues present in the build, linking only to their actual Markdown output URLs.
- HTML pages advertise their Markdown alternate with `rel="alternate"` and the site index with `rel="describedby"`.

To publish a new post, add only its usual front matter and Markdown content under `content/posts/`, then build or push as normal.

## Publishing

The site deploys through GitHub Actions when changes are pushed to `main`.

General workflow:

1. Edit content, layouts, or theme files.
2. Run `hugo` to rebuild the site locally.
3. Commit and push to `main`.
4. GitHub Pages publishes the updated build.

## Notes

- Main site navigation is configured in `hugo.toml`.
- RSS feeds are enabled for the home page, sections, and tag pages.
- Markdown and `LLMS` output formats are configured in `hugo.toml`.
- Raw HTML is allowed in Markdown via the Goldmark `unsafe` renderer setting.
