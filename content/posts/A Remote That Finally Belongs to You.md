---
title: "A Remote That Finally Belongs to You"
date: 2026-04-02
draft: false
tags: ["ESPHome", "Home Assistant"]
summary: "Local-first smart home control meets real device awareness. This setup combines an ESPHome-powered IR remote for instant, customizable control with an HDMI-CEC listener that provides accurate, real-time TV state--eliminating guesswork and cloud dependencies entirely."
---

Most people think of IR remotes as relics. Dumb plastic wands that exist purely to be lost in couch cushions and die at the worst possible moment.

But strip away the UX sins and what you're left with is something surprisingly powerful: instant, local, zero-latency control.

This ESPHome-based IR node leans into that idea hard.

At its core, it's an ESP8266 (ESP8285 board) running both a receiver and transmitter. That alone isn't special. What makes it interesting is how it's wired into Home Assistant--not as a workaround, but as a first-class control layer.

### IR as Input, Not Just Output

Most setups treat IR as a one-way street: send commands, hope for the best.

Here, the remote becomes a trigger device.

Specific NEC codes--like the colored buttons on an LG remote--are mapped directly to Home Assistant actions:

- Pink button → toggle TV lights
- Green button → toggle bedroom light
- Yellow button → toggle soundbar power
- Blue button → toggle TV power

No cloud. No polling. No delay. Press button → thing happens.

That's the entire philosophy.

And because it's ESPHome, you're not stuck with whatever some manufacturer thought was useful. You decide what every button means.

 
### The Quiet Killer Feature: IR Proxy

Buried in this config is something that feels like a glimpse into the future:
    
    
    infrared:
      - platform: ir_rf_proxy

Right now, it's rough. Definitely not plug-and-play. But conceptually? It's huge.

This is the beginning of IR becoming network-native inside Home Assistant.

Instead of:

- Capturing codes manually
- Writing YAML
- Flashing firmware

You eventually get:

- Discoverable IR devices
- Reusable command sets
- Shared control layers

In other words, IR stops being a hack and starts acting like a real integration.

We're not fully there yet--but this is the direction.

### Output Still Matters

On the flip side, the transmitter side is just as important.

Every key TV function is exposed as a Home Assistant button:

- Power
- Volume up/down
- Mute
- Navigation
- Playback

Which means your "dumb" TV is now:

- Scriptable
- Automatable
- UI-controllable
- Fully local

No app. No API. No nonsense.

Just raw IR, weaponized properly.

### HDMI-CEC: Listening Instead of Guessing

If the IR node is about control, the HDMI-CEC node is about awareness.

And honestly, this is the more interesting one.

Because most smart home setups fake device state. They assume the TV is on because you told it to turn on.

This one doesn't assume anything.

It listens.

### Sniffing the HDMI Bus

Using an ESP32 and this [esphome-hdmi-cec component](https://github.com/Palakis/esphome-native-hdmi-cec), this device taps directly into the HDMI-CEC line and watches traffic in real time.

Not controlling (well, not primarily)--just observing.

With:
    
    
    promiscuous_mode: true
    decode_messages: true

…it's basically Wireshark for your HDMI cable.

And from that stream, it extracts something incredibly useful:

### A Real Power State Sensor

Two messages matter here:

- 0x36 → Standby (OFF)
- [0x90, 0x00] → Power ON

That's it.

No guessing. No delays. No "wait 10 seconds and hope."

Just:

- TV says it's off → sensor updates
- TV says it's on → sensor updates

Which means your automations suddenly get way smarter.

Lights, sound, notifications--everything can react to what's actually happening, not what you think is happening.

### Minimal Control, Maximum Precision

There's also a small but important addition:
    
    hdmi_cec.send:
      destination: 0x0
      data: [0x36]

A clean, direct "turn off everything" broadcast.

No IR blasting. No aiming. No interference.

Just a message on the HDMI bus that every device understands.

### Why This Setup Works So Well

Individually, these projects are solid.

Together, they're kind of ridiculous--in a good way.

You end up with:

### IR → Control Layer

- Instant input from physical remotes
- Reliable output to "dumb" devices
- Fully local, zero latency

### HDMI-CEC → State Layer

- Real device awareness
- No guesswork
- Clean integration into automations

And the combination solves a problem most people don't even realize they have:

> Smart homes are great at sending commands.

> They're terrible at knowing what actually happened.

This setup fixes that.

### The Bigger Picture


What's happening here isn't just "cool ESPHome stuff."

It's a shift in how you think about devices.

Instead of asking:

> "Does this support Home Assistant?"

You start asking:

> "Can I make this support Home Assistant?"

IR? Yes.

CEC? Yes.

RF (soon)? Probably.

And suddenly, entire categories of "dumb" hardware become viable again--without any of the baggage of cloud apps, firmware updates, or abandoned ecosystems.

### Final Thought

There's something deeply satisfying about turning off your TV with a 20-year-old protocol…

…while a microcontroller quietly logs the event and updates your house in real time.

It's not flashy.

It doesn't need to be.

It just works--and more importantly, it works on your terms.


{{< buymeacoffee >}}

{{< rss-button >}}

{{< buttondown >}}