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

{{< appcard 
  name="TTC Service Alerts"
  url="https://www.icloud.com/shortcuts/55642d82fd8b4108b6c2f9bd8a196a17"
  icon="https://cvws.icloud-content.com/B/AWp297docgbPQs1P16kZqh-LiEdp/${f}?o=Avepp8W75htF30yrHz5LUUFDwNkPr_NWxxuLtbgpav_e2y7rpAsYRXpcH0nuX-batg&v=1&x=3&a=CAogSm0bvEA6OflxKq_0oerkJMF2yCDno1Lh9xQDW7XU6jcSexDDs8yilTMYw5CopJUzIgEAUgSLiEdpajDmzXv5SGlTQNXHkiitz2L90hKcb5L2VLkZpLvMyzwbZe6grDMV61Y9NmrHRAs5BaByMLRueXEsz60cbKk0_oZmU_EHzmUY2ImMpYUbrhDVU7WlnYjjrpE1QhyXTrEeFBQYtQ&e=1758059956&fl=&r=76b98de1-bb54-48b0-9bf9-7182a30c14e8-1&k=_&ckc=com.apple.shortcuts&ckz=_defaultZone&p=33&s=W8Eh2f6kgAP5zcN4u10XHmawS7Q"
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
