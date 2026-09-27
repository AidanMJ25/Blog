---
title: "Ten Days with RS-232 - Making My Offline LG TV a Little Smarter"
date: 2026-09-27
draft: false
tags: ["ESPHome", "Home Assistant", "Smart Home"]
summary: "After ten days of experimenting with RS-232 control on my offline LG CX, it didn't replace infrared or HDMI-CEC--but it found a surprisingly useful place in my smart home."
---

Ten days ago, I plugged an ESP32 into the RS-232 port on my LG CX.

This was, admittedly, not something I ever expected to write.

My TV has been disconnected from my network for months. Instead of using LG's webOS integration with Home Assistant, I control it using a combination of infrared and HDMI-CEC. IR handles essentially everything I would normally do with the remote, while CEC handles power-state detection and some of the coordination between the TV, Apple TV, and soundbar.

It works remarkably well. More importantly, none of it requires the TV itself to have network access.

But there was another port hiding on the back of the CX: a 3.5 mm jack labelled **RS-232C IN**.

Obviously, I had to see what it could do.

### The Serial Port on My Television

RS-232 feels delightfully out of place on a modern OLED TV.

It is a serial communication standard dating back decades, but it continues to exist on some televisions because it is incredibly useful for commercial installations. Think digital signage, conference rooms, hotels, and other environments where televisions need to be controlled by external systems reliably and without somebody pointing a remote at them.

LG's implementation provides a surprisingly extensive command set.

With an ESP32, a MAX3232 serial converter, a DB9 adapter, and an appropriately wired 3.5 mm cable, I could effectively give Home Assistant direct serial access to the television.

The ESP32 runs ESPHome and communicates with the TV at 9600 baud. From there, controlling something is wonderfully primitive.

Send some ASCII characters.

The television does something.

That's it.

There is no cloud API, authentication token, developer account, network discovery, OAuth flow, or manufacturer app involved. My ESP32 sends a command down a wire and the TV responds.

There is something deeply satisfying about that.

### The Manual Changed Everything

Initially, I wasn't entirely sure how useful RS-232 would actually be.

Then I found LG's external device control documentation.

That manual turned what I thought would be a small experiment into one of the more interesting Home Assistant projects I've done recently. The RS-232 interface exposes controls for power, volume, mute, inputs, picture settings, aspect ratio, screen mute, and considerably more.

So, naturally, I implemented basically everything.

My ESPHome configuration now contains buttons for nearly every useful RS-232 command supported by the television.

Did I need all of them?

Absolutely not.

Did I need to know that they worked?

Absolutely.

### RS-232 vs. Infrared

This created an interesting problem.

I already had excellent control of the television through infrared.

My Athom IR transmitter can reproduce essentially the entire LG remote. It doesn't care whether the TV has internet access, it is fast, and after years of IR remote controls being treated as the boring old technology in the room, it turns out boring old technology is extremely useful when you're deliberately keeping a smart TV offline.

RS-232 therefore wasn't replacing a bad system.

It was competing against a very good one.

For a while, I thought power control would justify the whole project. Unlike IR, RS-232 supports explicit commands rather than requiring a generic Power toggle. In theory, that meant I could send **Power On** when I wanted the TV on and **Power Off** when I wanted it off.

I also discovered that the television reports its power state over serial.

Excellent. One cable could potentially handle both control and state.

Except HDMI-CEC was already better at the second part.

My existing CEC power-state sensor detects the television changing state roughly three seconds faster than the RS-232 implementation. Three seconds isn't exactly an eternity, but when the faster system is already installed and reliable, replacing it with the slower one doesn't accomplish anything.

Then RS-232 power control itself proved less compelling than I expected.

After experimenting with it, I eventually gave power-control duties back to infrared.

Ten days after starting this project, my grand new serial interface had managed to lose both the Power Control Department and the Power State Detection Department.

Not an especially promising career trajectory.

### Then I Found Screen Mute

There is one RS-232 command, however, that changed the entire equation for me: **Screen Mute**.

Screen Mute turns off the OLED panel without turning off the television.

The TV remains on. The Apple TV remains connected. The soundbar keeps playing. Everything continues operating normally.

The giant glowing rectangle simply disappears.

This is exactly what I've wanted for years when using my Apple TV for music.

I like AirPlaying music to the Apple TV because it is already connected to the best speakers in my room. What I don't particularly want is the television displaying album artwork, lyrics, screensavers, or some other interface for hours simply because I want to listen to music.

Previously, the easiest solution was usually just not to use the Apple TV for music.

Now I press a button.

The OLED turns off.

Press another button and it comes back.

And because this is ESPHome, those commands aren't limited to Home Assistant. I've put **Screen Mute On** and **Screen Mute Off** directly on the 7-inch ESPHome touchscreen I use as a physical control panel in my bedroom.

That seemingly obscure serial command has suddenly become one of the most useful TV controls on the panel.

More importantly, it changes my behaviour. I'm already more inclined to AirPlay music to the Apple TV because the setup finally works the way I've always wanted it to.

Sometimes the best home automation isn't automating something you already do. It's removing the annoying little thing that stopped you from doing it in the first place.

### A Smarter TV by Making It Dumber

The amusing part of this project is that I've effectively made my smart TV smarter by disconnecting most of its smart features.

The LG CX itself has no network connection.

Home Assistant doesn't talk to webOS.

Instead, the television is surrounded by several extremely simple control systems, each doing the thing it is best at.

**Infrared** provides broad remote-control functionality.

**HDMI-CEC** provides excellent power-state detection and coordination with HDMI devices.

**RS-232** provides direct wired access to commands that aren't otherwise conveniently available, including Screen Mute.

And none of those systems require LG's servers--or even my local network--to be accessible from the television.

There is no single elegant integration tying everything together. Underneath my Home Assistant interface is a mildly ridiculous collection of IR codes, HDMI-CEC messages, serial commands, ESP32s, adapters, and template entities.

But the result feels more reliable and more under my control than when I simply connected the TV to Wi-Fi and let webOS handle everything.

The television has essentially become a display again.

A very, very nice display.

### Was RS-232 Worth It?

After ten days, RS-232 hasn't turned out to be the revolutionary replacement for IR or HDMI-CEC that I briefly imagined it might be.

That's probably the most interesting result of the experiment.

I went into this thinking serial control might become the foundation of how I interact with the television. Instead, I've ended up with a hybrid system where three completely different technologies coexist because each has particular things it does better than the others.

CEC won power-state detection.

IR won general remote control and, for now, power control.

RS-232 found its niche with specialized commands like Screen Mute.

And I'm perfectly happy with that.

Home automation projects don't always need to end with one technology replacing another. Sometimes the better solution is discovering which layer should be responsible for which job.

It also means RS-232 has gone from something I barely thought about ten days ago to something I will actively look for on future A/V equipment.

Not because I expect it to control everything, but because it gives me another local, documented, wired interface into hardware I own.

There is something wonderfully refreshing about connecting two devices with a serial cable, sending `ASCII` down a wire, and watching something happen.

No account required.

No internet connection required.

No app required.

Just 9600 baud and an increasingly unreasonable number of ESP32s.


{{< buttons-list >}}