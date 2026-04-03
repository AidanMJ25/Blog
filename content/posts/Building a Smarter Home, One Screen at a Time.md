---
title: "Building a Smarter Home, One Screen at a Time"
date: 2026-04-03
draft: false
tags: ["ESPHome", "Home Assistant"]
summary: "A custom ESPHome touchscreen control panel and alarm keypad built with LVGL, designed to replace bloated dashboards with a fast, local-first interface that feels more like dedicated hardware than an app."
---

There's a certain point in any Home Assistant setup where dashboards stop feeling like control panels and start feeling like compromises.

Too many taps. Too many menus. Too much "smart" layered on top of what should be instant.

So instead of fighting the UI, I built my own.

### The Touch Panel That Replaced Everything

At the centre of this setup is a Waveshare ESP32-S3 touchscreen running ESPHome with LVGL. No Android tablet. No iPad. No cloud dependencies. Just a purpose-built interface that does exactly what it needs to--and nothing more.

The entire UI is a 5×5 grid of buttons.

That's it.

And that's the point.

Each button maps directly to something real in the room: TVs, lights, curtains, chargers. Tap it, and it happens instantly. No animations, no loading states, no second-guessing whether the command actually went through.

What makes it work isn't just the layout--it's the feedback loop. Every button reflects the _actual_ state from Home Assistant in real time. If a device is unavailable, the button disables itself. If something turns on elsewhere, the panel updates immediately. It's not a remote. It's a live mirror of the system.

There's no abstraction layer to fight against.

## Designing for Real Life, Not Demos

A lot of smart home interfaces are designed like they're being shown off, not used.

This one is designed around how things actually happen:

- Walking into a room → tap one button
- Going to bed → hit the alarm page
- Leaving → glance, confirm, done

The grid layout isn't flashy, but it's predictable. Muscle memory kicks in fast. After a few days, you're not _looking_ for buttons anymore--you're just pressing them.

Even small decisions matter:

- **Large tap targets** so you never miss
- **Consistent placement** so nothing moves around
- **No scrolling, ever**

It behaves more like a physical control panel than an app.

### The Screen That Knows When to Get Out of the Way

One of the most underrated parts of this setup is what happens when you _don't_ use it.

After 30 seconds of inactivity, the display shuts off. Completely. Backlight off, LVGL paused, even a subtle "snow" effect to prevent burn-in.

Touch the screen again, and it wakes instantly--right back to where you left it.

It's a small detail, but it changes how the panel feels. It's not constantly glowing in the background. It's not demanding attention. It's just there when you need it.

And gone when you don't.

### A Dedicated Alarm Interface That Feels Right

The second half of the project is something I'm disproportionately proud of: a dedicated alarm page.

Instead of cramming alarm controls into the main UI, it gets its own space--with a layout inspired by old-school physical keypads.

Mode buttons on the left. Keypad on the right. Code entry front and centre.

It behaves exactly how you expect:

- Enter a code → it masks with asterisks
- Arm/disarm → sends directly to Home Assistant
- Alarm triggers → screen turns on automatically and switches pages

There's even a small touch that makes a big difference: when the system is arming, the display changes to "Arming…" instead of sitting there blankly.

It feels responsive. Intentional. Alive.

### Why This Works Better Than a Tablet

A tablet can do more. That's exactly why it's worse for this job.

This panel is:

- **Instant** -- no OS, no background apps, no lag
- **Local-first** -- nothing breaks if the internet drops
- **Single-purpose** -- no distractions, no drift
- **Ridiculously efficient** -- barely sips power

Most importantly, it removes friction.

You don't _think_ about using it. You just do.

### The Real Upgrade Wasn't Hardware

The hardware is nice. The ESP32-S3 is more than capable. LVGL is flexible enough to build anything you want.

But the real upgrade is philosophical.

Instead of adapting to someone else's idea of a smart home interface, this setup flips the equation:

The interface adapts to you.

No unnecessary features. No forced workflows. No compromises.

Just a grid of buttons that does exactly what you expect--every single time.

If anything, this project proves something simple:

The best smart home UI isn't the one with the most features.

It's the one you stop noticing entirely.

{{< buttons-list >}}