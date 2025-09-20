---
title: "Save URLs from Show Notes with Overcast and Drafts"
date: 2025-09-20
draft: false
tags: ["Shortcuts", "Podcasts"]
summary: "This post explains how a custom Shortcut pulls links from Overcast show notes and saves them into Drafts, creating a seamless way to collect and organize podcast references."
---

I listen to a lot of podcasts in Overcast, and more often than not, I find myself wanting to save a link mentioned in the show notes--an app, a website, a follow-up article. Overcast does a great job of presenting those notes, but getting the links into my notes system has always been more work than it should be.

So, I built a Shortcut that solves this problem: it extracts every link from an episode's show notes in Overcast and saves them neatly to Drafts.

---

### How the Shortcut Works

The Shortcut starts with Current Episode Info from Overcast, which hands me both the title of the episode and its full show notes in raw HTML.
  

From there, I do a quick conversion dance:

- Make Rich Text from Show Notes HTML
- Make Markdown from Rich Text

The reason? Markdown gives me a predictable link structure--[title](URL)--that's easy to parse with a regex.

---

### Extracting the Links

With the text in Markdown, I use a Match Text action to find every link in the notes. The Shortcut then lets me pick which ones I actually want to save. That way, I'm not cluttering Drafts with every single link from an episode--just the ones I care about.

---

### Saving to Drafts

Here's the clever bit: before creating a new draft, the Shortcut searches Drafts to see if I already have a note for that episode.

- If nothing exists, it creates a brand new draft with the episode title and the selected link(s).
- If a draft already exists, it appends the new links to it--no duplicates, no mess.

The end result is a running note per episode with all the links I wanted to keep.

---

## Why This Is Useful

This Shortcut saves me from the usual friction of copy-pasting URLs out of Overcast. I don't have to jump between apps or worry about losing context. Everything ends up in Drafts, which is my text inbox and the place where I process notes later.

It's a small thing, but like so many good automations, it's one less manual step in my day. Now, when a host mentions a new app or service, I know I can capture the link in a couple of taps without breaking my listening flow.

---

## Final Thoughts


This is exactly the kind of automation I love: lightweight, repeatable, and tuned to the way I work. Overcast gives me the show notes, Drafts gives me the archive, and Shortcuts does the glue work in between.

The next time I need to reference that obscure link from a podcast episode I heard weeks ago, it'll be sitting there in Drafts, right where it belongs.

{{< appcard 
    url="https://www.icloud.com/shortcuts/8f82fa10d4bd469e9a11dd4d839eb04b" 
    name="Save URLs from Show Notes" 
    icon="/Shortcuts Icons/Save URLs from Show Notes Icon.jpg" 
>}}

### Apps & Tools Used to Create this Shortcut

{{< approw >}}
{{< appcard 
    url="https://apps.apple.com/ca/app/overcast/id888422857?uo=4" 
    name="Overcast" 
    icon="/App Store App Icons/Overcast Icon.jpg" 
>}}
{{< appcard 
    url="https://apps.apple.com/ca/app/drafts/id1236254471?uo=4" 
    name="Drafts" 
    icon="/App Store App Icons/Drafts Icon.jpg" 
>}}
{{< /approw >}}