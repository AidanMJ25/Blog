---
title: "Smarter MacBook Charging with Shortcuts and BetterTouchTool"
date: 2025-09-15
draft: false
tags: ["Shortcuts", "BetterTouchTool", "Home Assistant"]
summary: "I automated MacBook charging with Shortcuts, Home Assistant, and BetterTouchTool. 
Two Shortcuts manage charging based on battery level and verify charger state, while 
BetterTouchTool triggers them at key moments. The setup ensures smarter charging and alerts 
me if something goes wrong."
---

I’ve been working on a smarter way to manage my MacBook’s charging routine. Instead of 
keeping it constantly plugged in—or worse, draining too far—I built a pair of Shortcuts that 
tie into Home Assistant and give me precise control over when my MacBook starts and stops 
charging.

BetterTouchTool handles the automation side, triggering these Shortcuts when certain 
conditions are met, so I don’t have to think about it. The result is a more balanced charging 
cycle and less battery stress—all fully automated.

⸻

### The Building Blocks

The setup consists of two Shortcuts:

- Charge MacBook: Handles turning the charger on or off depending on the battery percentage.
- Check MacBook Charger on Login: Verifies the charger’s state when I log in or at periodic 
intervals.

Both Shortcuts talk to Home Assistant through its API. I store my API key and endpoint in 
reusable helper Shortcuts, which makes the main flows cleaner and easier to maintain.

⸻

### Charge MacBook

This Shortcut first checks the current battery level. If it’s above 21%, it assumes charging 
isn’t critical. From there, if the level hits 100%, it sends a request to Home Assistant to 
switch off the charger using the /api/services/switch/turn_off endpoint.

If the battery is below 21%, the Shortcut flips the logic: it calls /api/services/switch/turn_on, 
waits a few seconds, and then double-checks whether the MacBook actually registered as charging. If 
it didn’t, I get an alert that says “Charge MacBook!!” so I can fix it manually.

It’s a nice mix of automation and failsafe. Most of the time, I don’t need to do anything—but 
if something misfires, I get a clear prompt.

⸻

### Check MacBook Charger on Login

The second Shortcut adds some resilience. On login (and also every hour), BetterTouchTool 
triggers it to confirm the charger’s state.

Here’s how it works:

1.	It checks the MacBook’s current battery percentage.
2.	It queries Home Assistant for the state of the switch.macbook_charger entity.
3.	If the battery is full and the switch is still on, it powers it down.
4.	If the battery is at or below 21% and the charger is off, it powers it on.
5.	Finally, it waits a few seconds and checks whether the MacBook is actually 
	charging. If not, it throws the same “Charge MacBook!!” alert.

This creates a feedback loop where the system not only sends commands but also confirms 
whether those commands actually worked.

⸻

### BetterTouchTool Triggers

The final piece of the puzzle is automation via BetterTouchTool. I’ve set up triggers for:

- Battery drops below 21% → Run Charge MacBook.
- Battery rises above 99% → Run Charge MacBook.
- On screen unlock → Run Check MacBook Charger on Login.
- Every hour → Run Check MacBook Charger on Login.

This combination ensures that charging is always managed proactively, whether I’m actively 
using the MacBook or not.

⸻

### Why It Matters

Apple’s built-in battery management is good, but not always predictable—and it doesn’t give 
me direct control. With this Shortcuts + BetterTouchTool setup, I can enforce my own rules: 
charge only when needed, stop at full, and always keep an eye on the charger’s actual state.

It’s a small project, but one that makes a noticeable difference in daily use. My MacBook 
now charges only when it should, with BetterTouchTool quietly handling the details in the 
background.

{{< approw >}}
{{< appcard 
    url="https://www.icloud.com/shortcuts/e22b09004acf43fa882a415f3eed7cd8" 
    name="Charge MacBook" 
    icon="/Shortcuts Icons/Charge MacBook Icon.jpg" 
>}}
{{< appcard 
    url="https://www.icloud.com/shortcuts/62a2a4c8473342cdb2ca72df8d5e9c1b" 
    name="Check MacBook Charger on Login" 
    icon="/Shortcuts Icons/Check MacBook Charger on Login Icon.jpg" 
>}}
{{< /approw >}}

### Apps and Tools Used for this Project

{{< approw >}}
{{< appcard 
    url="https://www.home-assistant.io/" 
    name="Home Assistant" 
    icon="/App Icons/Home Assistant Icon.jpg" 
>}}
{{< appcard 
    url="https://folivora.ai/" 
    name="BetterTouchTool" 
    icon="/App Icons/BetterTouchTool Icon.jpg" 
>}}
{{< /approw >}}

{{< buymeacoffee >}}