---
title: "TEST - Curtains, Touchscreens, and a Remote That Actually Knows What's Going On"
date: 2026-08-15
draft: true
summary: "From Bluetooth curtains to custom touchscreen controls and a smarter TV remote, three ESPHome projects exploring local control, customization, and making everyday hardware work exactly how I want it to."
---

Apparently, I have a habit of looking at perfectly functional devices and thinking, _"I wonder if I could make that work with ESPHome?"_

This time, that curiosity has taken me from reverse-engineering Bluetooth curtains to building a touchscreen control panel and giving my television remote a serious upgrade.

Here are three recent projects from the blog.

## From Arduino to ESPHome: Building an External Component

I've been using SwitchBot Curtains for a while, but I wanted something that felt more native to ESPHome without relying on the manufacturer's cloud.

So I took an existing Arduino-based approach, started figuring out how ESPHome external components work, and built my own integration.

The result? My curtains can now be controlled directly through ESPHome, using Bluetooth, with all the benefits of Home Assistant integration.

It was also my first proper dive into writing an ESPHome external component, which turned out to be a rabbit hole worth falling into.

[**Read: From Arduino to ESPHome: Building an External Component**](https://blog.aidanmaurinjones.com/posts/from-arduino-to-esphome-building-an-external-component)

## Building a Smarter Home, One Screen at a Time

I've never been particularly interested in having a giant tablet stuck to the wall running yet another dashboard.

I wanted something closer to a proper physical control panel: quick, predictable, and designed around the things I actually use.

Using an ESP32 touchscreen and ESPHome's LVGL integration, I built a custom interface for controlling my bedroom, television, curtains, and security alarm.

It even doubles as an alarm keypad.

No unnecessary menus, no bloated interface, and no need to open an app just to turn something on.

Sometimes the best smart home interface is the one that doesn't feel like a computer.

[**Read: Building a Smarter Home, One Screen at a Time**](https://blog.aidanmaurinjones.com/posts/building-a-smarter-home-one-screen-at-a-time)

## A Remote That Finally Belongs to You

Infrared remotes are wonderfully simple. Press a button, send a signal, and hope something happens.

The problem is that infrared communication is generally one-way. Your remote doesn't actually know whether the television turned on, turned off, or completely ignored it.

I decided to fix that.

By combining an ESPHome-powered infrared transmitter with a separate HDMI-CEC controller, I built a system that can both control my television and monitor its actual power state.

The result is a customizable remote that integrates with Home Assistant, responds quickly, and doesn't depend on the television being connected to the internet.

Because apparently, even my television remote needs an ESP32 now.

[**Read: A Remote That Finally Belongs to You**](https://blog.aidanmaurinjones.com/posts/a-remote-that-finally-belongs-to-you)

* * *

## Three Projects, One Recurring Theme

Although these projects do very different things, they all come back to the same idea: **I want my devices to work the way I want them to, not necessarily the way their manufacturers intended.**

That's what keeps drawing me back to ESPHome.

Whether it's communicating with a Bluetooth curtain motor, building an interface from scratch, or listening to HDMI-CEC traffic, there's something incredibly satisfying about taking relatively inexpensive hardware and making it do exactly what you need.

And the best part? Once these projects are working, they just become part of everyday life.

Until, of course, I think of something else they could do.

Which usually doesn't take very long.


{{< buttons-list >}}