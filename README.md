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
- `content/Webventures/`: short posts about interesting things discovered on the web
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

- Every post, newsletter issue, and Webventures entry gets a Markdown alternate beside its HTML page, for example `/posts/example/index.md`.
- Shortcodes render as Markdown-friendly links or content in the alternate representation.
- `/llms.txt` is generated from the posts and newsletter issues present in the build, linking only to their actual Markdown output URLs. Add a Webventures block to `layouts/index.llms.txt` when Webventures entries should be included there.
- HTML pages advertise their Markdown alternate with `rel="alternate"` and the site index with `rel="describedby"`.

To publish a new post, add its usual front matter and Markdown content under the appropriate content section—`content/posts/`, `content/Newsletter/`, or `content/Webventures/`—then build or push as normal.

## Publishing

The site deploys through GitHub Actions when changes are pushed to `main`.

General workflow:

1. Edit content, layouts, or theme files.
2. Run `hugo` to rebuild the site locally.
3. Commit and push to `main`.
4. GitHub Pages publishes the updated build.

## Notes

- Main site navigation is configured in `hugo.toml`.
- The Webventures section is available at `/webventures/`; add it to the main menu in `hugo.toml` when it is ready to be surfaced in navigation.
- RSS feeds are enabled for the home page, sections, and tag pages.
- Markdown and `LLMS` output formats are configured in `hugo.toml`.
- Raw HTML is allowed in Markdown via the Goldmark `unsafe` renderer setting.
