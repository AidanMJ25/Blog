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

- Fetch the feed – I use **_*Get Contents of URL*_** to grab the JSON.
- Parse the response – The raw data is turned into a dictionary, which makes it easy 
to work with inside Shortcuts.
- Check for active alerts – If the routes field has values, the shortcut moves forward. 

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

{{< shortcutcard
     url="https://www.icloud.com/shortcuts/60253b62ee354ae98492c08738c11bfd"
     name="TTC Service Alerts"
     icon="https://cvws.icloud-content.com/B/ARGWzVM2FobHCTtyJ20zL--N6vb3/${f}?o=Agdnr9fO8GLDkJ5AXWxwNBAvRMwBgxzD2midrT54j3AxJVEu2nxggPVwsAT_ipnqMw&v=1&x=3&a=CAogwCgiFMzhGIZC6l5DyQGC3daRrHuL9fgupQ21zLjEl40SexDI-tSflTMYyNewoZUzIgEAUgSN6vb3ajBQKEeHNWOb7MpwkfprQX8yT0AKbYykqwrnCi2-WFt_8ZzYQTQ-YaL4eVpxxgtEDXVyMDZnCTI33aZMok6gB4Q5WZ1dM_WeHmbcVRMubE7YUF-1aHrVhL-3ahpj0gbwWqvLsQ&e=1758053805&fl=&r=05af1008-70b2-41c4-b57b-405e85ceecad-1&k=_&ckc=com.apple.shortcuts&ckz=_defaultZone&p=33&s=qdWIYhCOrIuNDzTe3w2J83YHSlU"
>}}

### Apps & Tools I Used to Create this Shortcut

{{< approw >}}
  {{< appcard 
    name="Inspect Browser"
    url="https://apps.apple.com/ca/app/inspect-browser/id1203594958?uo=4"
    icon="https://is1-ssl.mzstatic.com/image/thumb/Purple211/v4/a9/71/c6/a971c683-ee6e-46d3-b3ee-75c8d2be2484/AppIcon-0-0-1x_U007epad-0-10-0-85-220.png/512x512bb.png"
  >}}

  {{< appcard 
    name="Jayson"
    url="https://apps.apple.com/ca/app/jayson/id1447750768?uo=4"
    icon="https://is1-ssl.mzstatic.com/image/thumb/Purple125/v4/78/3d/2e/783d2e1c-0191-32aa-3a7a-2a578ec6cfdf/AppIcon-0-1x_U007emarketing-0-7-0-sRGB-85-220.png/512x512bb.png"
  >}}
{{< /approw >}}