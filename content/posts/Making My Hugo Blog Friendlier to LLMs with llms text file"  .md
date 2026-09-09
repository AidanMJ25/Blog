---
title: "Making My Hugo Blog Friendlier to LLMs with llms text file"  
date: 2026-09-09  
draft: false  
tags: ["Hugo", "AI", "GitHub Pages", "Blogging"]
summary: "How I added llms.txt and Markdown versions of every post to my Hugo blog, with everything generated automatically as part of the normal build process."
---

I like websites that are just websites.

This blog is built with Hugo, written in Markdown, hosted on GitHub Pages, and deployed whenever I push a change to GitHub. There's no database, no CMS admin panel, and very little happening on the server because, well, there really isn't a server.

Recently, though, I decided to add something new to the site: `llms.txt`.

If you haven't come across it before, `llms.txt` is an emerging convention for giving large language models and AI agents a cleaner way to understand the contents of a website. The basic idea is somewhat reminiscent of `robots.txt` and `sitemap.xml`, except instead of being primarily about crawling or search indexing, `llms.txt` provides a concise, Markdown-formatted map of the content that an LLM may actually want to read.

That immediately appealed to me.

But I didn't want to maintain another file.

## **The Problem with HTML**

My blog is already written in Markdown. Every post starts its life as a Markdown file in my Hugo repository before Hugo turns it into the HTML page you see in a browser.

For a human, that's exactly what I want. The HTML version has the site's navigation, styling, metadata, app cards, images, and all the other things that make the blog look like the blog.

For an LLM, most of that is unnecessary.

An AI agent trying to read one of my posts doesn't particularly care what my navigation bar looks like. It wants the title and the article. Giving it the rendered webpage and asking it to reconstruct the original content feels a little ridiculous when the original content is already sitting there as Markdown.

So I decided that `llms.txt` shouldn't be an isolated feature. If I was going to make the site machine-readable, I wanted the actual articles to have machine-readable versions too.

## **Hugo Already Has Most of the Pieces**

One of my favourite things about Hugo is that the same piece of content doesn't have to produce only one file.

Hugo supports different output formats, so I added two to my `hugo.toml`: `Markdown` and `LLMS`.

The Markdown output is configured as plain `text/markdown` with `index` as its filename. The LLMS output is plain text, uses `llms` as its filename, and is generated at the root of the site.

The home page now has:
    
    
    [outputs]
    home = ["HTML", "RSS", "JSON", "LLMS"]
    
    [outputFormats.Markdown]
    mediaType = "text/markdown"
    baseName = "index"
    isPlainText = true
    
    [outputFormats.LLMS]
    mediaType = "text/plain"
    baseName = "llms"
    isPlainText = true
    notAlternative = true
    root = true

That means `llms.txt` isn't a file sitting in my `static` folder waiting for me to remember that it exists. It's an actual Hugo output format.

That distinction is important.

## **Every Article Gets a Markdown Version**

I also created a Markdown template for individual pages.

The result is that a normal blog post can exist in two forms:
    
    
    /posts/example/
    ├── index.html
    └── index.md

The HTML page is for you.

The Markdown file is for software that would rather skip the furniture and get straight to the article.

There is something wonderfully simple about this because I'm not really converting the blog _to_ Markdown for AI. The blog was Markdown in the first place. I'm just giving Hugo another way to publish it.

This also means the Markdown representation benefits from the same build process as everything else. I don't need a script that walks through my content directory after Hugo finishes. I don't need to upload a second copy of every article somewhere. Hugo knows what pages exist, so Hugo produces the alternate representations.

## 

## **Building **

**`llms.txt`**

The next part was the actual index.

I created `layouts/index.llms.txt`, which Hugo uses to generate the site's `/llms.txt` file.

The beginning is deliberately boring:
    
    
    # Blog - Aidan Maurin-Jones
    
    > Aidan Maurin-Jones shares tools, automations, and thoughts on whatever's interesting this week.
    
    ## Blog posts

Then Hugo does the useful part.

The template gets the `posts` section, sorts its regular pages by date, and checks whether each page actually has a Markdown output:
    
    
    {{ with site.GetPage "/posts" }}
    {{ range .RegularPages.ByDate.Reverse }}
    {{- $p := . -}}
    {{ with $p.OutputFormats.Get "Markdown" }}
    - [{{ $p.Title }}]({{ .Permalink }})
    {{ end }}
    {{ end }}
    {{ end }}

My actual template goes a little further and includes the description from the post's front matter. If a description isn't available, it falls back to a cleaned-up and truncated summary.

So the finished file contains entries along these lines:
    
    
    - [Post Title](https://example.com/posts/post-title/index.md): A short description of the post.

I do the same thing separately for the newsletter archive.

The important detail here is that I'm asking Hugo for the page's actual `Markdown` output format and using its permalink.

I'm not taking the regular HTML URL and blindly adding `index.md` to it.

That means the index and the files it references come from the same source of truth.

## **Zero Maintenance Was the Requirement**

This was probably my biggest requirement for the entire thing.

I did not want publishing a blog post to become:

1. Write the post.
2. Publish the post.
3. Update `llms.txt`.
4. Forget step three.
5. Notice six months later.

Absolutely not.

My existing publishing workflow already does what I want. I write Markdown, add the normal Hugo front matter, and push it to the repository. In fact, I've built an entire Shortcuts-based publishing workflow around the idea that posting to my blog should require as little ceremony as possible.

`llms.txt` had to fit into that system rather than become another system.

And it does.

When I publish another post, Hugo sees it during the next build. The Markdown version is generated automatically. The `llms.txt` template sees the new page and adds it to the index automatically. GitHub Pages publishes all of it together.

I don't have to think about `llms.txt` ever again.

Which, in my opinion, is exactly how infrastructure like this should work.

## **Letting Machines Discover It**

I went one step further and added discovery information to the regular HTML pages.

The site advertises the Markdown representation using a standard `rel="alternate"` link with a `text/markdown` type. It also points to `/llms.txt` using `rel="describedby"`.

Conceptually, an HTML page can say:
    
    
    <link rel="alternate" type="text/markdown" href="...">
    <link rel="describedby" href="/llms.txt">

That gives software two useful pieces of information: there is a cleaner Markdown representation of this page, and there is a site-level document that describes the broader collection.

I like this part more than I expected.

The visible website doesn't change at all. Humans get the exact same blog they've always had, while software gets a few signposts telling it, essentially, _you probably want to look over here instead_.

## **The Finished Result**

The live `llms.txt` file is now a small index of the blog.

It starts with the site's name and description, then lists my blog posts and newsletter entries with their titles, descriptions, and direct links to their Markdown versions.

Those links lead to actual Markdown files generated during the same Hugo build.

So instead of an LLM receiving a page full of rendered HTML and having to work backwards, it can go:
    
    
    llms.txt
        ↓
    Find relevant article
        ↓
    Open index.md
        ↓
    Read article

That's it.

There isn't an AI service involved. There isn't a vector database hiding somewhere. There isn't a JavaScript library doing something clever in the browser.

It's a text file pointing to other text files.

Perfect.

## **A Very Hugo Solution**

What I like most about this implementation is that it feels completely consistent with the rest of my website.

Hugo already knows what my posts are. It already knows their titles, descriptions, dates, URLs, and sections. It already turns my Markdown into different outputs. Asking another script or service to rediscover all of that information would be unnecessary duplication.

Instead, `llms.txt` is generated in exactly the same way as the rest of the site.

And because my blog is static, the finished result is static too. GitHub Pages doesn't need to execute anything when somebody requests `llms.txt` or one of the Markdown articles. They're just files that Hugo generated ahead of time.

I've written before that I could technically write this blog in Notepad because, underneath everything I've built around it, it's still basically a folder full of text files.

Apparently the next logical step was making it easier for robots to read those text files too.

I can live with that.


{{< buttons-list >}}