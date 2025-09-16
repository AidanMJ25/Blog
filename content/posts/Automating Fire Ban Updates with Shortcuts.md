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

{{< shortcutcard
     url="https://www.icloud.com/shortcuts/8f8b2d38dfc24a4ab8e9315a6750deff"
     name="Fire Ban Status"
     icon="https://cvws.icloud-content.com/B/ARmDT7R4UUpdDrObyg5Rj-KR3W62/${f}?o=AnnJh8L_ETGqNnaYSDHd2U67dL5bHho0iXTZLL_k581XnSojSBG2yoSXBiGfHm-DQg&v=1&x=3&a=CAogQrWFrYlv9WeuNExNWQ0NPFgE7-RxsxmQ1klQM-IdZdUSexCd0oGhlTMYna_dopUzIgEAUgSR3W62ajB1ow-dCzVSU95v1MobsrziWs10soldAKKJ3EPdS_m-d20BGN0Xbdm9d3q4Ho8XUI9yMA9y8_tyhY6cmdK_ulZ4wiKNmV7SMunJ9Fxy4uAx5R1Sj1KH5R2dZze5iv_cd_qSQQ&e=1758056634&fl=&r=65b61ddd-4e03-407b-bb12-52d3bd5fec9a-1&k=_&ckc=com.apple.shortcuts&ckz=_defaultZone&p=33&s=ohAN-88qacl7dlTyd7nr2t2Fvqw"
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


