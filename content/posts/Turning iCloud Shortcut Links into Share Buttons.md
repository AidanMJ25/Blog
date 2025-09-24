---
title: “Turning iCloud Shortcut Links into Share Buttons”
date: 2025-09-23
draft: false
tags: [“Shortcuts”, “Blog”, "Hugo"]
summary: “A Shortcut that takes an iCloud Shortcut link, grabs its metadata and icon, and 
turns it into a ready-to-paste Hugo app card.”
---

One of the best things about Shortcuts is that it can bridge services that were never designed 
to talk to each other. The Shortcut I’ve been using lately—Share Shortcut HTML Button—is a 
perfect example of that. With it, I can take any iCloud Shortcut link and instantly generate 
a fully-formed Hugo shortcode that embeds the Shortcut on my blog with its name and icon, no 
copy-pasting or manual uploading required.

⸻

### The Problem

When you share a Shortcut publicly, Apple gives you an iCloud link that looks something 
like this:

https://www.icloud.com/shortcuts/123abc...

It works fine for sharing with friends, but when I want to add that Shortcut to my blog, I 
need more than just the link. I need:
- The Shortcut’s proper name
- Its icon image
- A clean HTML/Hugo shortcode block I can drop into a Markdown file

Doing all of this by hand was tedious. So I automated it.

⸻

### How the Shortcut Works

The Shortcut breaks down into three key stages: fetching metadata, processing the icon, and 
generating the blog card.

**Fetching Metadata**

The Shortcut starts by receiving a Shortcut iCloud link (or grabbing it from the clipboard 
if none is passed in). From there:
- It rewrites the link into Apple’s hidden API endpoint at https://www.icloud.com/shortcuts/api/records/.
- Using Get Contents of URL, it downloads the Shortcut’s metadata as JSON.
- With Get Dictionary from Contents of URL, I can then pull out fields like fields.name.value 
(the Shortcut’s title) and fields.icon.value.downloadURL (the actual icon).

**Processing the Icon**

Here’s the clever part: I don’t just hotlink the icon from iCloud. Instead:
- I construct a GitHub API URL pointing to my site’s static/images/Shortcuts Icons folder.
- The Shortcut checks whether a file with the same name already exists (by calling GitHub’s 
API and looking for a SHA).
- If the icon isn’t there, it downloads the image, renames it with the Shortcut’s title, and 
encodes it in Base64.
- Finally, it uploads the icon to GitHub via the API, neatly slotting it into my Hugo site’s 
image folder.

Now every Shortcut I publish has its own local icon, version-controlled alongside the rest 
of my site.

**Generating the Blog Card**

The last step is pure convenience:

{{< appcard
  url="https://www.icloud.com/shortcuts/..."
  name="My Shortcut"
  icon="/Shortcuts Icons/My Shortcut.jpg"
>}}

The Shortcut assembles this block automatically, copies it to my clipboard, and I can paste 
it directly into my Markdown post. No typing, no file juggling, no guesswork.

⸻

### Why It Matters

This Shortcut may sound niche, but it’s been a huge time saver for me. I publish a lot of 
posts about Shortcuts, and before this, each one meant multiple minutes of repetitive work: 
saving icons, renaming them, uploading them, writing out HTML. Now it’s one tap.

The broader lesson here is that Shortcuts isn’t limited to “personal productivity” hacks. 
It’s powerful enough to serve as part of a publishing pipeline, gluing together iCloud’s 
hidden APIs, GitHub’s developer endpoints, and Hugo’s templating system.

And that’s why I love this Shortcut: it turns Apple’s barebones sharing into a complete, 
blog-ready package.

{{< appcard 
    url="https://www.icloud.com/shortcuts/feeec271478543b299710fb20e6bffab" 
    name="Share Shortcut HTML Button" 
    icon="/Shortcuts Icons/Share Shortcut HTML Button (Public) Icon.jpg" 
>}}

### Apps Used to Create this Shortcut

{{< appcard 
    url="https://apps.apple.com/ca/app/jayson/id1468691718?mt=12&uo=4" 
    name="Jayson" 
    icon="/App Store App Icons/Jayson Icon.jpg" 
>}}