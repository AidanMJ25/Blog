---
title: "App Store Links Made Beautiful with Shortcuts"
date: 2025-09-23
draft: false
tags: ["Shortcuts", "Blogging", "Hugo"]
summary: "This Shortcut takes an App Store link and automatically generates a Hugo-ready app 
card with the app’s name, icon, and URL—saving it straight to your clipboard."
---

One of the small but constant frictions of running a blog about apps is dealing with App 
Store links. Grabbing the name, copying the link, fetching an icon, turning it all into a 
nicely formatted snippet—it’s not hard, but it’s repetitive. And if you do it often enough, 
it’s exactly the kind of thing that cries out for automation.

That’s where this Shortcut comes in. Built entirely with stock Shortcuts actions, it takes 
a single App Store link and spits out a polished Hugo shortcode ready to paste into a blog 
post, complete with app name, link, and icon. What used to be a multi-step process is now 
a single tap.

⸻

### How It Works

**Getting the App Store ID**

The Shortcut starts by receiving an App Store URL, either from the Share Sheet or your 
clipboard. Using a quick regex ((?<=id)\d+), it extracts the numeric app ID buried in the 
link. That ID becomes the key for looking up everything else.

**Pulling App Metadata**

Next, Shortcuts’ built-in Find on the App Store action does the heavy lifting. It takes the 
app ID and returns structured data: the app’s name, its store page, and, crucially, the artwork 
URL for the icon.

At this point, the Shortcut already knows enough to generate a working app card, but it 
goes further.

**Naming and File Prep**

The app’s name is cleaned up and stored in a variable, then URL-encoded so it can be used 
safely as a filename. That ensures that even apps with spaces, dashes, or punctuation won’t 
break the upload process later.

**Uploading the Icon**

Here’s where things get clever. The Shortcut builds a GitHub API request to upload the app 
icon directly into the site’s repository. It grabs your personal API key, encodes the file, 
and sends it off with a PUT request. If the file already exists, the Shortcut skips the upload 
to avoid duplicates.

Behind the scenes, this means your blog’s /static/images/App Store App Icons/ folder is automatically 
updated with the latest app logos—no manual dragging or renaming required.

**Assembling the Shortcode**

Finally, everything comes together in a Hugo appcard snippet:

This block gets copied straight to your clipboard, ready to paste into any Markdown file. The 
icon path matches the uploaded file, the link points back to the store, and the name is exactly 
as it appears in Apple’s listing.

⸻

### Why It Matters

This is a classic example of automation as time-saving infrastructure. Writing about apps 
often involves dozens of small formatting chores that add up. By moving them into a Shortcut, 
you don’t just save a few clicks—you make the whole workflow predictable, repeatable, and 
error-free.

Better still, it’s all built with the tools Apple ships on every device. No third-party apps, 
no scripting languages, no dependencies. Just Shortcuts, GitHub, and a bit of creativity.

⸻

### The Result

Now, when inspiration strikes, I don’t have to think about sourcing icons or formatting 
snippets. I just share an App Store link, run the Shortcut, and paste the finished card into 
my blog post. It’s instant, it’s reliable, and it makes my site look great with zero extra 
effort.

For a blog that lives and breathes apps, this Shortcut has become one of those invisible 
automations that pays dividends every single day.

{{< appcard 
    url="https://www.icloud.com/shortcuts/7e33edc6ca804b259747d50c768bcf7d" 
    name="Share App Store App HTML Button" 
    icon="/Shortcuts Icons/Share App Store App HTML Button (Public) Icon.jpg" 
>}}

### Apps Used to Create this Shortcut

{{< appcard 
    url="https://apps.apple.com/ca/app/jayson/id1468691718?mt=12&uo=4" 
    name="Jayson" 
    icon="/App Store App Icons/Jayson Icon.jpg" 
>}}

{{< buymeacoffee >}}

{{< rss-button >}}

{{< buttondown >}}