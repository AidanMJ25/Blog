---
title: "Automating My Newsletter Workflow: One Markdown File for Hugo and Buttondown"
date: 2025-10-01
draft: false
tags: ["Shortcuts", "Buttondown", "Hugo"]
summary: "I built a Shortcut that takes the same Markdown file I use for my Hugo site’s 
Newsletter Archive and publishes it directly to Buttondown. One file, two destinations, 
no extra work."
---

I’ve been working toward a goal for years: a single place to write, and as many automated 
outputs as possible. I don’t want to copy and paste, re-format, or duplicate my writing. The 
same Markdown file that powers a blog post should also power a newsletter, an archive, or 
whatever else I decide to publish.

That philosophy led me to a new Shortcut I built for my Buttondown newsletter. With it, I 
can take the exact same Markdown file I use for my Hugo-based site’s Newsletter Archive page, 
and publish it straight to Buttondown in one step. No duplication, no reformatting, and no 
breaking my Markdown-first workflow.

⸻

### A Dual-Purpose Draft

Every newsletter draft I write starts as a Markdown file in my Hugo project. It includes 
the standard YAML front matter — title, date, tags — so it can live side-by-side with my 
blog posts and generate an archive page on my site.

At the bottom, I’ve also standardized on a Hugo shortcode that handles things like subscribe 
links and callouts.

The front matter makes it valid Hugo content, but Buttondown doesn’t need that metadata. Likewise, 
the shortcode at the bottom is great for my archive page but doesn’t belong in an email. The 
Shortcut’s job is to strip out those bits and isolate the actual content.

⸻

### Regex to the Rescue

To solve that, I leaned on regular expressions. The Shortcut matches everything after the 
closing --- of the YAML front matter and before the buttons-list shortcode.

The pattern looks like this:

    \A---[\n\s\S]*?---\s*([\n\s\S]*?)\s*\{\{\s*buttons-list\s*\}\}

The captured group becomes the newsletter body. Meanwhile, the Shortcut takes the filename 
of the Markdown draft and uses it as the subject line. That way, one file works for both Hugo 
(which uses the front matter) and Buttondown (which only needs subject + body but I hope one 
day it supports front matter).

⸻

### Publishing via Buttondown’s API

The final step is an API call. The Shortcut uses the Get Contents of URL action, configured with:

- Endpoint: https://api.buttondown.com/v1/emails
- Headers: Authorization token (pulled from a secure Shortcut)
- Body: JSON with subject, body, and status

I set status to about_to_send, which creates the email in Buttondown ready for review. If 
I’m confident, I can flip this to sent and fire it off instantly.

⸻

### Why This Matters

The beauty of this setup is that I never have to write the same thing twice. My Hugo site 
automatically builds out a Newsletter Archive page from the Markdown file, while this 
Shortcut takes that same file and pushes it to Buttondown.

Plain text is the source of truth, Hugo and Buttondown are just outputs.

This also gives me flexibility: if I ever change services, or if I want to generate a PDF 
archive, I don’t need to rewrite anything. I’ve already got everything in a neutral, 
Markdown-first format that can be re-used anywhere.

⸻

### Why This Works So Well

Like many of my favorite automations, this Shortcut doesn’t feel flashy — it feels inevitable. Once 
you decide everything should start as Markdown, the next step is making sure the publishing 
side bends around your workflow, not the other way around.

Shortcuts, Buttondown, and Hugo all line up perfectly here. It’s one file, two destinations, 
and zero overhead. And that’s exactly the kind of automation that keeps me writing and publishing 
more often.

{{< appcard 
    url="https://www.icloud.com/shortcuts/b08625600f25483fa55e19207d004eec" 
    name="Publish Newsletter to Buttondown" 
    icon="/Shortcuts Icons/Publish Newsletter to Buttondown (Public) Icon.jpg" 
>}}

{{< buttons-list >}}