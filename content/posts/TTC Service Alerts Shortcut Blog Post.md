---
title: "TTC Service Alerts Shortcut: Real-Time Transit Notifications Made Simple"
date: 2025-09-14
draft: false
tags: ["shortcuts", "webscraping"]
summary: "Shortcut for real-time TTC service alerts in a clean, scannable view."
---

I built this shortcut because I wanted a faster way to check TTC service alerts without digging 
through the website or scrolling endlessly through apps. With one tap (or a Siri command), 
I can now see all active alerts in a clean, styled view that’s easy to scan.

⸻

### How It Works

At the core, my shortcut pulls live data straight from the TTC’s JSON endpoint:

_*https://alerts.ttc.ca/api/alerts/list*_

**Here’s the basic flow I set up:**
	•	Fetch the feed – I use **_*Get Contents of URL*_** to grab the JSON.
	•	Parse the response – The raw data is turned into a dictionary, which makes it easy 
	to work with inside Shortcuts.
	•	Check for active alerts – If the routes field has values, the shortcut moves forward. 
	If not, I skip right to a “No Service Alerts at this time” message.

⸻

### Iterating Through Alerts

When there are active alerts, the shortcut loops through them one by one. For each alert, 
it pulls out the key pieces of info:

- **_*headerText*_** for the main message
- **_*lastUpdated*_** for the timestamp

I then format the date into something readable and wrap everything in a bit of HTML. By 
setting font sizes, bolding headers, and adding dividers, the output looks more like a proper 
dashboard than just plain text.

⸻

### The Final Output

Once all the alerts are collected, I combine them into a single block of text, convert it 
into rich text, and name it “TTC Service Alerts.” From there, I preview it in Quick Look.

If there aren’t any alerts, the shortcut just shows me a simple popup that says: “No Service 
Alerts at this time.”

⸻

### Why I Made It

As someone who relies on public transit, I was tired of wasting time checking for service 
interruptions. This shortcut solves that problem: I get structured, up-to-date info from the 
official TTC feed, formatted in a way that’s quick to read.

It’s a small automation, but one that makes my daily routine less stressful.