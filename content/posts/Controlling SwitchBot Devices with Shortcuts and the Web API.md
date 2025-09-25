---
title: "Controlling SwitchBot Devices with Shortcuts and the Web API"
date: 2025-09-24
draft: false
tags: ["Shortcuts", "Smart Home"]
summary: "With a couple of Shortcuts and the SwitchBot Web API, I can fetch my devices and send commands directly—no app required."
---


One of my favorite things about Apple's Shortcuts app is how it can bridge the gap between hardware and cloud APIs without requiring a single line of "real" code. A perfect example of this is SwitchBot: a line of Bluetooth and Wi-Fi-enabled devices that can be controlled through their official app--or, with a bit of setup, entirely through Shortcuts.

In this post, I'll walk you through two Shortcuts I built: one to fetch a list of all my SwitchBot devices, and another to send commands to them. Together, they let me control my smart home directly from Siri, widgets, or automations.

---

### Getting Device Details

The first Shortcut is a template for retrieving all registered SwitchBot devices from the company's cloud API.

It starts with a simple Text action where I paste in my API authorization key. That's followed by another Text action containing the endpoint URL:
    
    
    https://api.switch-bot.com/v1.0/devices/

The real magic happens in the Get Contents of URL action. Set to GET, this step includes a header named Authorization, pulling in the key from the earlier Text block. When the Shortcut runs, the response contains a full list of my devices and their details--device IDs, types, names, and more.

For me, this shortcut is especially useful when I need to look up a device ID to use in the second Shortcut.

----

### Sending Commands

The second Shortcut is where things get really interesting: sending a command to a specific device. It uses the same authorization key, but adds a few more building blocks:

- Device ID (so the API knows which device to target)
- Command Type (usually "command")
- Command (for example, "turnOn", "turnOff", or "toggle")
- Parameter (some commands require additional values, like brightness levels or modes)

The API endpoint looks like this:
    
    
    https://api.switch-bot.com/v1.0/devices/{deviceId}/commands

And instead of GET, this time the Shortcut uses a POST request with a JSON body. The Get Contents of URL action sends fields for commandType, command, and parameter, all filled from earlier Text actions in the Shortcut.

With this structure, I can turn lights on and off, start a fan, or even trigger my SwitchBot Curtain with a single tap. All without ever opening the SwitchBot app.

---

### Why This Matters

There are countless ways to integrate SwitchBot devices with other smart home platforms, but building these Shortcuts has two big advantages:

1. Speed -- I can tie them directly into Siri, widgets, or automations. Saying "Hey Siri, turn on the fan" actually triggers my Shortcut, which hits the SwitchBot API in less than a second.

2. Flexibility -- Since the commands are just text values, I can duplicate the Shortcut and customize it for any device and action I want, without writing code or digging through menus.

For someone like me, who's already knee-deep in Shortcuts for other parts of my life, this setup feels natural. I can slot these actions into bigger workflows--turning on my SwitchBot devices when I leave work, or including them in a "Good Morning" routine alongside music and calendar events.

----

### Final Thoughts

Shortcuts may not be the most glamorous way to control smart home gear, but you can do it. By working directly with the SwitchBot API, these automations skip the app entirely and give me the confidence that when I tap a button, my devices respond.

It's yet another example of how Shortcuts can serve as the glue between platforms, devices, and services. And for SwitchBot users, it's a reminder that sometimes the simplest approach is also the most powerful.

{{< approw >}}
{{< appcard 
    url="https://www.icloud.com/shortcuts/430120281f3c4b75a59c1bb2dbc90453" 
    name="Get SwitchBot Devices Template" 
    icon="/Shortcuts Icons/Get SwitchBot Devices Template (Public) Icon.jpg" 
>}}
{{< appcard 
    url="https://www.icloud.com/shortcuts/7042d2acf1864db9b7b604e8ea4971ed" 
    name="Send Command to SwitchBot Template" 
    icon="/Shortcuts Icons/Send Command to SwitchBot Template (Public) Icon.jpg" 
>}}
{{< /approw >}}