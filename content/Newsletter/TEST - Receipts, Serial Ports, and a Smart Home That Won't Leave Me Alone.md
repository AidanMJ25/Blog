---
title: "TEST - Receipts, Serial Ports, and a Smart Home That Won't Leave Me Alone"
date: 2026-10-27
draft: true
summary: "A roundup of my latest projects, from building a driverless receipt printer and experimenting with RS-232 television control to automating my morning alarms and improving my Hugo blog."
---

It's been a busy few weeks on the blog, and apparently I've developed a habit of taking perfectly ordinary devices and making them do things their manufacturers probably never intended.

Between teaching a $35 receipt printer to print QR codes, convincing an offline television to listen to serial commands, and automating my morning alarms, I've had plenty to write about.

Here's a roundup of what I've been working on lately.

## 🧾 I Have the Receipts

It all started with a cheap thermal receipt printer, an ESP32, and an old Sony PlayStation 2 power supply my dad found at a thrift store.

Naturally, instead of just using a printer like a normal person, I decided to build my own ESPHome external component for it.

The result? A fully local, network-connected receipt printer that integrates directly with Home Assistant. No proprietary drivers, no cloud services, no subscriptions, and no ink.

Do I actually need a receipt printer in my house? Absolutely not. Has that stopped me? Evidently not.

[Read: I Have the Receipts](https://blog.aidanmaurinjones.com/posts/i-have-the-receipts/)

## 🖨️ Using Shortcuts as My Printer Driver

Once the printer was working, I started wondering how easily I could print things from my Mac, iPhone, and iPad.

As it turns out, Apple Shortcuts makes a surprisingly good printer driver.

Using nothing but built-in Shortcuts actions, I created a workflow that lets me send text to my receipt printer from practically anywhere.

Grocery lists? Sure. Garbage schedules? Why not. Random dad jokes? I have hundreds of them, so obviously.

The best part is that it takes roughly two seconds from running the Shortcut to having a finished receipt in my hand.

It's an absurdly satisfying workflow for something I never actually needed.

[Read: Using Shortcuts as My Printer Driver](https://blog.aidanmaurinjones.com/posts/using-shortcuts-as-my-printer-driver/)

## 📱 Wrapping It Up with Text, QR Codes, and Barcodes

Of course, I couldn't just leave the printer alone.

I've since expanded my ESPHome component to support native QR code printing, multiple barcode formats, automatic word wrapping, and additional Home Assistant controls.

It can even print Markdown-formatted text.

What started as a relatively simple UART experiment has turned into a surprisingly capable little printing system.

And because it's an ESPHome component, I can keep adding functionality without having to replace any hardware.

I'm beginning to suspect that the printer itself was the cheapest part of this hobby. The real expense is my inability to leave well enough alone.

[Read: Wrapping It Up with Text, QR Codes, and Barcodes](https://blog.aidanmaurinjones.com/posts/wrapping-it-up-with-text-qr-codes-and-barcodes/)

## ⏰ It Is Time to Wake Up

Moving away from printers for a moment, I've also been working on something considerably more practical: making sure I actually wake up for work.

I combined Home Assistant, Google Home's Script Editor, and Apple Home to build an alarm system that automatically sets and cancels my alarms based on my work schedule.

No more remembering to set alarms before bed.

And this isn't just a theoretical convenience. The automation has already saved me after I accidentally fell asleep without setting anything.

With two clocks and nine alarms on each, that's 18 alarms managing themselves.

Sometimes automation is just a fun experiment. Other times, it saves your ass.

[Read: It Is Time to Wake Up](https://blog.aidanmaurinjones.com/posts/it-is-time-to-wake-up/)

## 📺 My Adventures with RS-232

Before the receipt printer took over my attention, I spent ten days experimenting with RS-232 serial control on my LG CX television.

The television is deliberately kept offline, so I rely on infrared, HDMI-CEC, and Home Assistant to control it.

When Home Assistant introduced a new LG TV via Serial integration, I couldn't resist trying it.

That resulted in three posts documenting the adventure:

[**I Want to Be Number 6**](https://blog.aidanmaurinjones.com/posts/i-want-to-be-number-6/) -- My initial attempt to get the integration working, complete with cables, pinouts, a MAX3232, and plenty of troubleshooting.

[**I Am Number 6**](https://blog.aidanmaurinjones.com/posts/i-am-number-6/) -- The moment I finally got the television communicating over RS-232.

[**Ten Days with RS-232**](https://blog.aidanmaurinjones.com/posts/ten-days-with-rs-232---making-my-offline-lg-tv-a-little-smarter/) -- What I learned after living with it, including why infrared and HDMI-CEC still have their place.

RS-232 didn't turn out to be the ultimate television control solution I'd hoped for, but it did give me some useful functionality, particularly the ability to mute the screen without turning off the television.

Not every experiment has to replace an existing solution to be worthwhile.

## 🤖 Making My Blog Friendlier to LLMs

Finally, I've also been tinkering with the blog itself.

Since the site is built using Hugo, Markdown, and GitHub Pages, I decided to make its content easier for large language models to access.

I added an automatically generated `llms.txt` file and Markdown versions of every blog post.

The entire process happens during the normal site build, meaning there's no additional publishing work involved.

It's a small change, but one that fits perfectly with why I built this blog the way I did in the first place: keeping things simple, portable, and under my control.

[Read: Making My Hugo Blog Friendlier to LLMs with llms.txt](https://blog.aidanmaurinjones.com/posts/making-my-hugo-blog-friendlier-to-llms-with-llms-text-file/)

## What's Next?

I have absolutely no idea.

And that's probably my favourite part.

Most of these projects started with a simple question: _I wonder if I could make that work?_

One thing leads to another, and suddenly I'm writing an ESPHome component, debugging serial communications, or using Apple Shortcuts to print dad jokes on receipt paper.

That's also why I've come to enjoy maintaining this blog so much. It's become a place to document the experiments, the successes, the occasional frustrations, and all the strange little things I build along the way.

If any of that sounds interesting, you can find everything at [blog.aidanmaurinjones.com](https://blog.aidanmaurinjones.com/).

Until next time, I'll probably be making something unnecessarily complicated.


{{< buttons-list >}}