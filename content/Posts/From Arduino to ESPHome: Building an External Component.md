---
title: "From Arduino to ESPHome: Building an External Component"
date: 2026-07-21
draft: false
tags: ["ESPHome", "Home Assistant", "AI", "Smart Home"]
summary: "Building my first ESPHome external component to make SwitchBot Curtains feel like native ESPHome devices."
---

There's a certain kind of project that, when it's finished, almost becomes invisible.

Not because it isn't impressive, but because it removes friction so effectively that you stop thinking about it entirely. It fades into the background, quietly doing its job every single day.

That's exactly what happened with my bedroom curtains.

Like many Home Assistant users, I started with SwitchBot Curtain robots. They're reliable, easy to install, and don't require replacing your existing curtain hardware. The downside is that controlling them inside Home Assistant has always felt like stitching together multiple layers of software. Bluetooth proxies, MQTT bridges, custom Arduino firmware--it all worked, but it never felt like it belonged.

I didn't want another device in my smart home.

I wanted another ESPHome device.

----

## ESPHome Has Changed My Home

Over the past few years, something unexpected happened.

Today, almost every custom device I build runs ESPHome. My IR transmitters are ESPHome devices. My HDMI-CEC controllers are ESPHome devices. My touchscreen dashboard is powered by ESPHome. Even my relay boards and sensors have gradually migrated away from custom firmware toward YAML-driven configurations.

The reason is simple.

ESPHome lets me think about _what_ I want a device to do instead of _how_ to program it.

That's an incredibly addictive workflow.

Once you've built enough devices this way, anything that _isn't_ ESPHome starts feeling like an exception.

Eventually my SwitchBot bridge became that exception.

----

## One Device Too Many

Originally I controlled my curtains using an Arduino project that communicated with the SwitchBot devices over Bluetooth before exposing them to Home Assistant via MQTT.

It worked.

But it also felt like a foreign language inside an otherwise ESPHome-based home.

Whenever I looked at the device I found myself wishing it behaved like every other ESPHome node on my network.

No MQTT topics.

No extra broker configuration.

No separate firmware.

Just…
    
    
    cover:
      - platform: switchbot_curtain
        name: Left Bedroom Curtain
        mac_address: ...

If ESPHome is all about making hardware feel like configuration instead of software, why couldn't SwitchBot Curtains work the same way?

That question became this project.

----

## Designing for YAML

The interesting part of building an ESPHome external component isn't actually writing C++.

It's designing the user experience.

Most people only ever interact with an external component through YAML.

That means every option, every default, every parameter becomes part of the product.

I spent far more time thinking about _how someone should configure it_ than I did thinking about Bluetooth packets.

The goal was that someone could discover the repository, copy a few lines from the README, change a MAC address, and be finished.

No documentation marathon.

No fifteen optional settings.

No explaining MQTT.

No explaining Bluetooth scanning.

Just install it and move on.

ESPHome's external components system makes this possible by allowing components to be pulled directly from Git repositories, effectively making community-developed integrations feel native to ESPHome itself.

----

## Home Assistant Shouldn't Know the Difference

One of my favorite things about ESPHome is that devices feel first-party.

When Home Assistant discovers a new ESPHome node, every entity behaves exactly the way you'd expect.

That's what I wanted here.

The curtains shouldn't appear as "some custom BLE bridge."

They should simply appear as covers.

Open.

Close.

Stop.

Position.

Exactly like any other ESPHome cover entity.

If someone forgot they were using an external component six months later, I'd consider that a success.

----

## AI Wrote Most of the Code

There's another reason this project matters to me.

I didn't write every line myself.

Large language models handled a surprising amount of the implementation.

That isn't the interesting part.

The interesting part is that AI didn't design the product.

It didn't decide the YAML should look a certain way.

It didn't decide what options should exist.

It didn't decide what should be automatic versus configurable.

Those decisions came from years of living inside Home Assistant and developing opinions about what makes good automation software.

AI became an implementation tool.

The architecture, user experience, and design philosophy were still human.

That's an important distinction, and I suspect we'll see more of it over the next few years.

----

## The Best Feature Is That There Isn't One

I think a lot about software that disappears.

The best Shortcuts.

The best Home Assistant automations.

The best hardware.

You don't admire them.

You stop noticing them.

Now, when my curtains open every morning or close at sunset, I don't think about Bluetooth.

I don't think about MQTT.

I don't think about firmware updates.

I certainly don't think about Arduino code.

I just think about curtains.

And I think that's exactly how home automation should feel.

----

If you'd like to take a look, the project is open source on GitHub:

**[Switchbot-ESPHome-Component](https://github.com/AidanMJ25/Switchbot-ESPHome-Component)**

Sometimes the most satisfying projects aren't the ones that add new capabilities.

They're the ones that remove one more layer between you and the way your home should have worked all along.


{{< buttons-list >}}