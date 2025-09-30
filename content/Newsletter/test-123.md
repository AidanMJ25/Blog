---
title: "test-123"
date: 2025-09-21
draft: true
tags: ["Shortcuts", "Blogging", "GitHub Pages", "Hugo"]
summary: "This post breaks down how I use a simple Shortcut to publish Markdown files straight 
to my Hugo blog on GitHub Pages, no browser or CMS required."
---

One of the reasons I love this setup so much is that publishing isn't just simple -- it's 
fully automated with nothing more than stock Shortcuts actions on iOS and macOS. No scripts, 
no extra tools. Just Shortcuts and GitHub's API.

Here's how it works, step by step:

----

### 1. Take a Markdown file as input

The Shortcut starts by receiving a file -- either from the Share Sheet or by prompting me 
to pick one. This file is the blog post I've written in plain text.
- Action: Receive Files from Share Sheet
- Why: Keeps things flexible -- I can run the Shortcut from Finder on my Mac, Drafts on my 
iPhone, or anywhere else that can share a Markdown file.

----

### 2. Prepare the file name

Next, the Shortcut grabs the file's name, URL-encodes it (so it's safe for GitHub's API), 
and saves it as Pretty File Name.

- Action: Get Name from Blog Post → URL Encode → Set Variable

This ensures my post shows up as my-post.md inside the Hugo content/posts/ folder.

----

### 3. Encode the post content

The raw text of the file is pulled out and converted to Base64. GitHub's API requires files 
to be sent this way.

- Action: Get Text from Blog Post → Encode Text with Base64

Now I've got my post ready in a format GitHub understands.

----

### 4. Build the API request

The Shortcut constructs a URL to the right location in my repo:
    
    https://api.github.com/repos/<username>/<repo>/contents/content/posts/<Pretty File Name>.md

This points GitHub's API directly to where the Markdown file should live.

----

### 5. Check if the post exists

The Shortcut sends a GET request to that URL:

- If a file exists, GitHub's response includes a sha value (basically the file's unique ID).
- If it doesn't exist, there's no sha.

This lets the Shortcut decide whether to update an existing post or create a brand new one.

----

### 6. Update or create the post

Depending on the result, the Shortcut runs one of two PUT requests:

- Update Blog Post → PUT with the sha included
- Post New Blog Post → PUT without the sha

Both requests send JSON with:
    
    {
      "message": "Posted via Shortcuts - <Name of BlogPost>",
      "content": "<Base64 Encoded Markdown>",
      "branch": "main",
      "sha": "<if updating>"
    }

GitHub commits the file to my repo, and Hugo + GitHub Pages do the rest.

----

### 7. Done!

That's it. Within seconds, the post appears on my live site -- no browser, no dashboard, no 
manual uploads.

----

### Why This Is So Good

- Cross-platform: I use it on my Mac via Finder + Service Station, as an Alfred file action, 
in BBEdit via AppleScript, and on my iPhone via Drafts. If I had an iPad, it would work there too.
- Minimal setup: The Shortcut is just a chain of built-in actions. No scripts, no third-party 
apps.
- Future-proof: The only input it needs is a Markdown file -- and that's the one thing my 
blog will always be built on.

{{< appcard 
    url="https://www.icloud.com/shortcuts/d96fe2195053424793b4a4a9a3bfab33" 
    name="Post to Blog" 
    icon="/Shortcuts Icons/Post to Blog (Public) Icon.jpg" 
>}}

### Apps Mentioned in this Post

{{< approw >}}
{{< appcard 
    url="https://apps.apple.com/ca/app/drafts/id1435957248?mt=12&uo=4" 
    name="Drafts" 
    icon="/App Store App Icons/Drafts Icon.jpg" 
>}}
{{< appcard 
    url="https://apps.apple.com/ca/app/service-station/id1503136033?mt=12&uo=4" 
    name="Service Station" 
    icon="/App Store App Icons/Service Station Icon.jpg" 
>}}
{{< appcard 
    url="http://www.barebones.com/products/bbedit/index.html" 
    name="BBEdit" 
    icon="/App Icons/BBEdit Icon.jpg" 
>}}
{{< appcard 
    url="https://www.alfredapp.com/" 
    name="Alfred 5" 
    icon="/App Icons/Alfred 5 Icon.jpg" 
>}}
{{< /approw >}}


{{< buymeacoffee >}}

{{< rss-button >}}

{{< buttondown >}}