---
title: "Automating Fire Ban Updates with Shortcuts"
date: 2025-09-14
slug: automating-fire-ban-updates-with-shortcuts
draft: false
tags: ["shortcuts", "webscraping"]
summary: "I built a Shortcut that pulls Dysart et al.’s fire ban feed, checks for “Fire Ban,” 
and shows the result in a simple HTML card. It’s fast, customizable, and gives me an instant, 
glanceable update from raw municipal data."
---

I built a Shortcut that makes it incredibly easy to check whether there’s currently a fire 
ban in Dysart et al. Instead of digging through a municipal website or scrolling a feed, I 
can now get a clean, glanceable update with one tap.

⸻

### How I Built It

The Shortcut pulls from this endpoint:

https://www.dysartetal.ca//modules/NewsModule/services/getalertbannerfeeds.ashx

That feed contains JSON data with alert banners, including fire ban notices. Here’s what 
happens step by step:
	
1.	Fetch the feed – Using “Get Contents of URL,” the Shortcut retrieves the raw JSON.
	
2.	Parse into a dictionary – I convert the response into a Dictionary so each item can be checked.
	
3.	Scan for fire ban notices – A “Match Text” action looks for the string Fire Ban. If 
there are matches, I know there’s an active ban.
	
4.	Extract title and description – I loop through the items, grab the title and 
description fields, and convert the HTML-rich text into plain strings.
	
5.	Build a styled HTML card – If a ban is active, the Shortcut injects the title and 
description into a block of HTML with big, bold text so it’s easy to read.
	
6.	Display the result – The HTML card is shown in a Safari-style web view. If no fire 
ban is in effect, I get a simple alert that says: “No Fire Ban Status currently available.”

⸻

### Why I Use It

Municipal websites aren’t always designed for quick updates, especially on a phone. With 
this Shortcut, I don’t have to waste time hunting for information—I get a direct answer in seconds.

It’s also a great example of how I like to use Shortcuts: not for giant, flashy automations, 
but for small, thoughtful utilities that make my day smoother.

⸻

### Customizing the Shortcut

Since the Shortcut outputs HTML, it’s easy to tweak the look:

- Change font sizes to make the text more readable.
- Add colors—red for “ban in effect,” green for “ban lifted.”
- Include extra fields from the feed if needed.

And because it’s all built with system actions, I can extend it further: send a push notification 
when a ban starts, or log changes to a running Notes document.

⸻

### Final Thoughts

This Shortcut takes raw municipal data and turns it into something useful that I can check 
at a glance. It removes friction, saves me time, and gives me peace of mind knowing I can 
always find out the current fire ban status instantly.

{{< appcard 
    url="https://www.icloud.com/shortcuts/32c07658e4f34b15b8d3bde1997d8e0f" 
    name="Fire Ban Status" 
    icon="Fire Ban Status Icon.jpg" 
>}}

### Apps & Tools I Used to Create this Shortcut

{{< appcard 
    url="https://www.icloud.com/shortcuts/eb224000b2e04f2cbaf85f83c99ba22e" 
    name="TTC Service Alerts" 
    icon="TTC Service Alerts Icon.jpg" 
>}}

### Apps & Tools I Used to Create this Shortcut

{{< approw >}}
  {{< appcard 
    url="https://apps.apple.com/ca/app/inspect-browser/id1203594958?uo=4" 
    name="Inspect Browser" 
    icon="Inspect Browser Icon.jpg" 
>}}

  {{< appcard 
    url="https://apps.apple.com/ca/app/jayson/id1447750768?uo=4" 
    name="Jayson" 
    icon="Jayson Icon.jpg" 
>}}
{{< /approw >}}


