# Aidan Maurin-Jones Blog

This repository contains the source for [blog.aidanmaurinjones.com](https://www.blog.aidanmaurinjones.com/), built with Hugo and deployed to GitHub Pages.

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
- Raw HTML is allowed in Markdown via the Goldmark `unsafe` renderer setting.
