---
title: "Wikipedia Article Downloader: A Shortcut for Offline Reading"
date: 2025-09-19
draft: false
tags: ["Shortcuts", "WebScraping"]
summary: "I built a Shortcut that lets me quickly turn any Wikipedia link into a clean PDF, 
making it easy to save articles for offline reading, research, or archiving."
---


Sometimes the best utilities are the ones that do just one thing, quickly and well. That's 
exactly what I had in mind when I built my **Wikipedia Article Downloader** Shortcut. It takes 
any Wikipedia link I throw at it and instantly saves a clean PDF of the article--perfect for 
offline reading, research, or archiving.

### How It Works

I designed the Shortcut to be flexible. It accepts input either from the Share Sheet or 
directly from my clipboard. That means I can grab a link from Safari, Messages, or anywhere 
else and send it straight into the Shortcut without any extra steps.

Here's the flow it follows once I trigger it:

1. **Extract the URL** -- The Shortcut pulls out the link from whatever I share or copy.

2. **Regex Matching** -- A quick regular expression finds the correct page identifier from 
the Wikipedia link, so it works even if the URL has extra junk in it.

3. **Build the API Request** -- Wikipedia has a little-known REST API that can generate a 
PDF version of any article. The Shortcut automatically constructs that request.

4. **Fetch the PDF** -- The API serves up the article as a PDF.

5. **Save to Files** -- Finally, the Shortcut saves the PDF wherever I choose, ready to 
open in Books, Preview, or any other PDF app.

---

### Why I Find It Useful

Wikipedia does have a "Download as PDF" feature, but it's buried in the desktop site's menus 
and isn't very friendly on mobile. With this Shortcut, I can grab a clean PDF in just a couple 
of taps.

I use it most when I'm traveling and don't want to rely on spotty internet access. It's 
also handy when I'm doing research and want to keep a local archive of detailed articles.

---

### Small Touches I Like

A few details make the Shortcut feel smooth in practice:

- **Clipboard fallback** -- If I don't run it from the Share Sheet, it automatically checks 
my clipboard for a valid link.
- **Regex cleanup** -- It doesn't assume Wikipedia URLs are always clean; it handles variations.
- **Automation potential** -- I can imagine extending it by having the PDFs saved directly 
into a tagged folder in Files, or even synced into Obsidian or DEVONthink.
---

### Final Thoughts

This Shortcut is a simple example of how I like to use automation: take a clunky process and 
reduce it to a single tap. By leaning on Wikipedia's API, I get a smooth way to save articles 
for offline use.

I've already found myself reaching for it constantly, whether I'm archiving something 
interesting or putting together a reading list for later. If you rely on Wikipedia as much 
as I do, this little Shortcut makes it effortless to keep what you find.

{{< appcard 
    url="https://www.icloud.com/shortcuts/4a7b4925023b4b6d9fb1699afd34654e" 
    name="Wikipedia Article Downloader" 
    icon="/Shortcuts Icons/Wikipedia Article Downloader Icon.jpg" 
>}}

### Apps & Tools Used to Create this Shortcut

{{< appcard 
    url="https://apps.apple.com/ca/app/jayson/id1468691718?mt=12&uo=4" 
    name="Jayson" 
    icon="/App Store App Icons/Jayson Icon.jpg" 
>}}

{{< buymeacoffee >}}

{{< rss-button >}}

{{< buttondown >}}