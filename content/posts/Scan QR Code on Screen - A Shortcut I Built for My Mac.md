---
title: "Scan QR Code on Screen: A Shortcut I Built for My Mac"
date: 2025-09-16
draft: false
tags: ["Shortcuts"]
summary: "I built a macOS Shortcut that lets me scan QR codes right from my screen. It grabs 
a screenshot, sends it to the QRServer API to decode, and opens the link in Safari—handling 
errors smoothly so I don’t need my iPhone or extra apps."
---

I built this Shortcut because I kept running into a simple but annoying problem. Every now 
and then, I’d come across a QR code on my Mac—maybe in a PDF, a presentation, or just an image 
on a website. And every time, I had to pull out my iPhone to scan it. macOS doesn’t offer 
a built-in way to do this, so I decided to make my own solution.

⸻

### The Problem I Wanted to Solve

Scanning a QR code on macOS isn’t straightforward. You either have to send the image to your 
iPhone or use a third-party app. Neither felt seamless. I wanted something that fit directly 
into my workflow: capture the QR code on my screen, decode it, and open the link—no extra 
devices or steps.

⸻

### How My Shortcut Works

I designed the Shortcut in two phases:

**Phase 1:** Capturing the QR Code

- The Shortcut opens the Mac’s Interactive Screenshot tool, which lets me select just the 
portion of the screen where the QR code is visible.
- If I don’t actually grab anything, the Shortcut just stops cleanly. No errors, no wasted 
steps.

**Phase 2:** Decoding and Opening the Link

- Once I’ve got the screenshot, the Shortcut sends it to the QRServer API (http://api.qrserver.com/v1/read-qr-code/).
- The API responds with the decoded content in a dictionary. I pull out symbol.1.data, which 
is where the actual text or URL lives.
- If it’s a valid URL, the Shortcut opens it immediately in Safari.
- If there’s nothing useful, I get a simple alert: “No URL Found.”

⸻

### Why I Like This Approach

What I like most about this Shortcut is how resilient it is. I added error checks at two 
points—first to make sure an image was actually captured, and second to verify that the 
decoded content is a valid URL. Both failure cases are handled gracefully.

It’s also a nice example of how powerful Shortcuts can be when you mix in APIs. By leaning 
on QRServer, I made a feature that Apple hasn’t brought to macOS yet, and I didn’t need to 
install extra apps to get there.

⸻

### How I Use It

Now, anytime I run into a QR code on my Mac, I just trigger this Shortcut. Whether it’s a 
menu, a payment link, or a download, I can scan and open it instantly without breaking my 
flow.

It’s a small thing, but it’s one of those utilities I use often enough that I can’t imagine 
not having it anymore.

{{< shortcutcard
  url=“https://www.icloud.com/shortcuts/97d10d8e9287407eae49da629048ba10”
  name=“Scan QR Code on Screen”
>}}

### Apps & Tools I Used to Create this Shortcut

{{< approw >}}
  {{< appcard 
    name="Jayson"
    url="https://apps.apple.com/ca/app/jayson/id1447750768?uo=4"
    icon="https://is1-ssl.mzstatic.com/image/thumb/Purple125/v4/78/3d/2e/783d2e1c-0191-32aa-3a7a-2a578ec6cfdf/AppIcon-0-1x_U007emarketing-0-7-0-sRGB-85-220.png/512x512bb.png"
  >}}
{{< /approw >}}

