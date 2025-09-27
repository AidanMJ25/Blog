---
title: "Share Mac App HTML Button: Automating App Cards from Alfred"
date: 2025-09-23
draft: false
tags: ["Shortcuts", "Alfred", "Blogging", "Hugo"]
summary: "A Shortcut that turns any Mac app—App Store or direct download—into a polished 
Hugo app card with its icon, name, and link, all triggered as an Alfred File Action."
---

One of the realities of being a Mac user today is that many of the best apps you’ll discover 
aren’t on the Mac App Store. Developers often prefer to sell directly, avoiding Apple’s restrictions 
and revenue cut. That’s great for them (and often for us too, since it means more powerful software), 
but it leaves one problem: how do you share those apps elegantly in a blog post?

The Mac App Store gives you a tidy preview link and icon, but direct-purchase apps don’t. That 
means if I want to share an app like BBEdit or Audio Hijack, I’d normally have to dig into 
the app bundle, extract the icon, save it out, rename it, upload it, then write the HTML 
myself. Way too much friction.

So I built a Shortcut that does all of it for me. And because I run it as an Alfred File 
Action, all I have to do is select the app and hit the hotkey. The Shortcut takes care of 
the rest, turning any Mac app—App Store or not—into a polished HTML app card ready to paste 
into my Hugo blog.

⸻

### How It Works

The Shortcut is split into two halves: finding the app’s details and icon, then uploading 
and generating the HTML snippet.

**Extracting the app’s icon and name**

It begins with an AppleScript that points at the selected .app bundle and looks inside its 
Info.plist for the CFBundleIconFile. If that value’s missing, the script gracefully falls 
back to the default AppIcon.

From there, it resolves the .icns file inside /Contents/Resources/, hands it back to Shortcuts, 
and Shortcuts grabs the actual image. At the same time, it extracts the app’s display name so 
I don’t have to type it myself later.

**Handling the upload**

With the icon in hand, the Shortcut preps the upload for GitHub. It checks if the icon is 
already in my site’s /static/images/App Icons/ folder using the GitHub API. If it doesn’t 
exist, the Shortcut converts the image to base64 and uploads it automatically.

This is especially handy for apps outside the Mac App Store, since I can’t rely on Apple’s 
CDN to serve up a clean app icon for me. Once uploaded, the image is there permanently, ready 
for reuse across future posts.

**Assembling the HTML card**

Finally, the Shortcut generates the Hugo shortcode I use for app cards. This snippet is copied 
straight to my clipboard, so I can paste it into BBEdit alongside the rest of the post. To help 
me fill in the missing link (since there’s no App Store URL), the Shortcut even runs a DuckDuckGo 
search for the app’s name + “mac app.” Nine times out of ten, that surfaces the official 
website instantly.

⸻

### Why This Shortcut Matters

This automation is all about eliminating barriers. Whether the app is on the Mac App Store or 
sold directly through a developer’s site, I get the same consistent app card on my blog. No 
manual exporting, no renaming files, no repetitive uploads.

It also means I can highlight great indie apps without worrying about the extra effort. For 
someone who posts often, these saved minutes add up, but more importantly, they keep me in 
flow. When the tools fade into the background, the writing comes forward.

⸻

### Alfred + Shortcuts = A Perfect Match

Running this Shortcut through Alfred is what makes it truly seamless. Instead of digging 
through Finder or hunting down app paths manually, I just select the app in Alfred, trigger 
the File Action, and let Shortcuts do the heavy lifting.

This combination works beautifully: Alfred is my quick-launch interface, and Shortcuts is the 
automation engine in the background. Together, they make sharing Mac apps—App Store or not—as 
easy as a keyboard command.

⸻

### The Bigger Picture

This Shortcut fits into a larger workflow where I’ve automated nearly every part of blogging, 
from uploading screenshots to posting entire drafts to GitHub. Each piece removes just enough 
friction to make publishing easier and more enjoyable.

The end result is that I can write more, share more, and showcase apps without worrying about 
where they’re sold. The Mac App Store doesn’t have to be the gatekeeper for clean links and 
icons anymore.

{{< appcard 
    url="https://www.icloud.com/shortcuts/ad57e1ca98d6430ca512e8649ffc96b8" 
    name="Share Mac App HTML Button" 
    icon="/Shortcuts Icons/Share Mac App HTML Button (Public) Icon.jpg" 
>}}

### Apps Used to Create this Automation

{{< approw >}}
{{< appcard 
    url="https://apps.apple.com/ca/app/jayson/id1468691718?mt=12&uo=4" 
    name="Jayson" 
    icon="/App Store App Icons/Jayson Icon.jpg" 
>}}
{{< appcard 
    url="https://www.alfredapp.com/" 
    name="Alfred 5"
    icon="/App Icons/Alfred 5 Icon.jpg" 
>}}
{{< appcard 
    url="https://latenightsw.com/" 
    name="Script Debugger"
    icon="/App Icons/Script Debugger Icon.jpg" 
>}}
{{< /approw >}}

{{< buymeacoffee >}}

{{< rss-button >}}

{{< buttondown >}}