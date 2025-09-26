---
title: "Automating TP-Link Kasa Devices with Shortcuts"
date: 2025-09-25
draft: false
tags: ["Shortcuts", "Smart Home"]
summary: "Using three clever Shortcuts and the Kasa cloud API, you can log in, list devices, and control TP-Link Kasa smart plugs and switches directly from Shortcuts—no Homebridge required."
---

One of the things I love about Shortcuts is how it can act as a bridge between apps and services that don't officially support Apple's automation ecosystem. A perfect example of this is TP-Link's Kasa line of smart plugs, switches, and bulbs. Kasa devices don't natively integrate with Shortcuts--but with a little API trickery, you can bring them right into your automations.

Over the past week, I've been experimenting with three public Shortcuts that unlock the Kasa cloud API:

1. Get Kasa API Token

2. Get Kasa Device Details

3. Turn On/Off Kasa Device

Together, they form a powerful workflow that lets you log in to your account, retrieve all of your devices, and control them--all without ever opening the Kasa app.

---

### Step 1: Authenticating with the Kasa Cloud

Everything starts with the Get Kasa API Token Shortcut. This Shortcut asks for the email and password tied to your Kasa account, along with a UUID (a unique identifier that mimics the Kasa app itself). With these values, the Shortcut sends a login request to the Kasa cloud endpoint:
    
    
    https://wap.tplinkcloud.com/

The response includes a temporary API token--your golden ticket for making further requests. Without it, nothing else works. Tokens do expire occasionally (usually after an app update), but re-running the Shortcut instantly refreshes your access.

---

### Step 2: Retrieving Your Devices
  
Once you have a token, the next step is to get a list of devices tied to your account. That's where Get Kasa Device Details comes in.

This Shortcut takes your token and sends a getDeviceList request. The response is a JSON dictionary containing all of your Kasa devices--each with a friendly name (alias), a deviceId, and an appServerUrl (the regional server that manages the device).

The Shortcut loops through this dictionary, extracts the essentials, and combines them into a clean, human-readable list. Instead of parsing raw JSON, you get something like:
    
    "Living Room Plug": {"Device ID": "8006XXXXXX", "App Server URL": "https://use1-wap.tplinkcloud.com"}

This is the crucial information you'll need to actually control the device.

---

### Step 3: Turning Devices On and Off

With the token, device ID, and server URL in hand, the final piece of the puzzle is Turn On/Off Kasa Device.

This Shortcut first prompts you for the values you retrieved in step two, then asks you to choose an action: On or Off. Internally, those options map to 1 and 0, which the API uses to change the relay state.

The Shortcut builds a JSON request that looks like this:
    
    
    {
      "method": "passthrough",
      "params": {
        "deviceId": "YOUR_DEVICE_ID",
        "requestData": "{\"system\":{\"set_relay_state\":{\"state\":1}}}"
      }
    }

Send that request to the Kasa cloud, and--like magic--your smart plug or bulb responds instantly.

---

### Why This Matters

Kasa devices are popular because they're inexpensive, reliable, and don't require a separate hub. But until now, integrating them with Shortcuts has meant relying on Homebridge, third-party apps, or clunky workarounds.

These three Shortcuts cut out the middleman. They give you direct control over your Kasa devices from within Shortcuts, meaning you can tie them into existing automations:

- Turn on a desk lamp when you start a Focus mode.
- Power cycle your router with a tap on the Home Screen.
- Shut off everything in the house with a single command to Siri.
---

### Credit Where It's Due

All of this is made possible thanks to the excellent research and documentation by Joshua Tz, who published the Kasa API details. His guide [is available here](https://docs.joshuatz.com/random/tp-link-kasa/) and is an invaluable resource for anyone who wants to go deeper into the API beyond what Shortcuts can do.

---

### Future Improvements

Right now, the workflow involves some copy-paste steps--retrieving the token in one Shortcut, then pasting it into another. With a bit of refinement, the whole process could be chained into a single Shortcut: log in, fetch devices, pick one, and toggle it--all in one go. That's the kind of polish that makes Shortcuts shine.

But even as-is, this trio of Shortcuts transforms Kasa devices from "app-only" gadgets into fully programmable components of your Apple ecosystem. And that's the magic of Shortcuts: giving you the tools to bend devices and services to your will--even when their makers don't.

{{< approw >}}
{{< appcard 
    url="https://www.icloud.com/shortcuts/997094909661423e99810869f493d5ce" 
    name="Get Kasa API Token" 
    icon="/Shortcuts Icons/Get Kasa API Token (Public) Icon.jpg" 
>}}
{{< appcard 
    url="https://www.icloud.com/shortcuts/56b5bf3a4abe4a6e946ba2d3ee4fc9b7" 
    name="Get Kasa Device Details" 
    icon="/Shortcuts Icons/Get Kasa Device Details (Public) Icon.jpg" 
>}}
{{< appcard 
    url="https://www.icloud.com/shortcuts/0f8d26fecc294230bac0f1a0611bee1e" 
    name="Turn ON & OFF Kasa Device" 
    icon="/Shortcuts Icons/Turn ON & OFF Kasa Device (Public) Icon.jpg" 
>}}
{{< /approw >}}

### Apps Used to Create This Shortcut

{{< approw >}}
{{< appcard 
    url="https://apps.apple.com/ca/app/actions/id1586435171?uo=4" 
    name="Actions" 
    icon="/App Store App Icons/Actions Icon.jpg" 
>}}
{{< appcard 
    url="https://apps.apple.com/ca/app/jayson/id1447750768?uo=4" 
    name="Jayson" 
    icon="/App Store App Icons/Jayson Icon.jpg" 
>}}
{{< /approw >}}