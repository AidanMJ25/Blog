---
title: "Giving My Thermal Receipt Printer a Proper Home Assistant Integration"  
date: 2026-11-11  
draft: false  
tags: ["Home Assistant", "ESPHome", "DIY", "Open Source", "Home Automation"]
summary: "Building a custom Home Assistant integration for my QR701 thermal receipt printer using ESPHome Serial Proxy, bringing Markdown, QR codes, barcodes, and native printing controls to Home Assistant while retaining the original ESPHome functionality."
---

I've always had a soft spot for hardware that can be repurposed to do something its manufacturer probably never intended. Sometimes that means building a custom controller for an old device. Other times, it means connecting an inexpensive piece of hardware to Home Assistant and discovering just how much functionality can be squeezed out of it.

My latest project falls firmly into the second category: a small, 58mm thermal receipt printer called the QR701.

A while ago, I started experimenting with the QR701 and an ESP32, eventually developing a [custom ESPHome component](https://github.com/AidanMJ25/QR701-ESPHome-External-Component) that could print text, Markdown, QR codes, and barcodes directly from Home Assistant. It worked, and it was a fun project. However, as I continued working on it, I began wondering whether there was another way to integrate the printer with Home Assistant.

The result is [QR701 Thermal Printer for Home Assistant](https://github.com/AidanMJ25/QR701-HA-Integration), a custom integration that takes a different approach to controlling the printer. Rather than requiring the custom firmware component to handle every print request, it uses ESPHome's Serial Proxy functionality to give Home Assistant access to the printer's serial connection.

It's a relatively small architectural change, but one that opens up some interesting possibilities.

### From ESPHome Component to Home Assistant Integration

The QR701 is a fairly ordinary thermal receipt printer. It prints on inexpensive rolls of paper, communicates using serial commands, and supports the ESC/POS command set commonly associated with receipt printers.

There isn't anything particularly remarkable about the hardware itself. That's partly what makes it interesting.

My original approach was to connect the printer to an ESP32 over UART and develop an external ESPHome component to handle the communication. ESPHome would receive instructions from Home Assistant, translate them into commands the printer understood, and send them over the serial connection.

This worked well enough that I eventually added support for Markdown formatting, QR codes, barcodes, and several Home Assistant entities for interacting with the printer.

However, there was one aspect of the design that I wasn't entirely satisfied with.

**ESPHome was doing almost all the work.**

The ESP32 wasn't simply providing connectivity. It was responsible for interpreting print requests, formatting content, and communicating with the printer. Any changes to that functionality required updating the custom component and rebuilding the device's firmware.

That's not necessarily a problem, and there are plenty of situations where having an ESP32 operate independently makes perfect sense. In this case, though, I was primarily using the printer through Home Assistant anyway.

I wanted to explore whether Home Assistant could handle the printing itself, without taking away the functionality I'd already built into ESPHome.

### Enter ESPHome Serial Proxy

One of the more interesting additions to ESPHome is its [Serial Proxy component](https://esphome.io/components/serial_proxy/).

The idea is straightforward: instead of requiring an ESP32 to understand the protocol of every serial device connected to it, ESPHome can expose the serial connection to Home Assistant.

Home Assistant can then communicate with that device through its existing ESPHome connection.

For the QR701, this means the ESP32 can also function as something closer to a wireless serial adapter.

The printer remains physically connected to the ESP32, but Home Assistant can generate ESC/POS commands, format receipts, and manage print jobs through the new integration.

The communication path looks something like this:

**Home Assistant → ESPHome Serial Proxy → ESP32 UART → QR701 Printer**

What I particularly like about this approach is that it doesn't require another network service running on the ESP32.

There's no separate TCP-to-serial server, no MQTT broker, and no additional cloud service. Serial Proxy uses the existing ESPHome API connection, including its authentication.

The ESP32 handles the hardware connection while Home Assistant can take care of the printing logic.

It also means future changes to the Home Assistant integration can happen without repeatedly flashing the ESP32.

**Importantly, the original ESPHome component and Serial Proxy can coexist.** Adding Serial Proxy doesn't inherently mean abandoning the custom QR701 component or its existing ESPHome functionality.

This gives me the flexibility to continue using the ESPHome implementation while also experimenting with a more conventional Home Assistant integration. Both provide different ways of interacting with the same physical printer, although print requests still need to be coordinated to avoid conflicting serial traffic.

### Making the Printer Feel Like a Home Assistant Device

Moving printing functionality into Home Assistant would be considerably less interesting if it meant sacrificing the convenience of the original ESPHome component.

Fortunately, the integration is designed to expose the printer as a conventional Home Assistant device, complete with entities, configuration options, and actions.

After installation, the QR701 can be added through Home Assistant's Devices & Services interface. The setup process allows you to select the appropriate serial connection, configure the baud rate, and optionally enable hardware status reporting.

Once configured, the integration provides controls for printing text, Markdown, QR codes, and barcodes, alongside buttons for feeding paper and refreshing the printer's status.

It also includes text fields for preparing print jobs and options for adjusting QR code size and error correction.

One particularly useful feature is that the integration restores saved text drafts and QR code settings after a restart. This makes it possible to prepare commonly used print jobs without having to recreate them every time.

For longer receipts, Home Assistant actions can accept the content directly, avoiding the character limits associated with text entities.

The integration also includes optional status reporting for conditions such as paper running out, the printer cover being open, or a printer error.

That last feature depends on the particular printer revision supporting the necessary status commands and having a correctly wired return serial connection. It's not something that can be assumed to work on every QR701.

Nevertheless, bringing these controls together under a dedicated Home Assistant integration makes the printer considerably more approachable than a collection of custom ESPHome actions.

### Printing Markdown, QR Codes, and Barcodes

One of the features I was particularly interested in preserving was Markdown support.

I've become increasingly comfortable using Markdown for everything from notes to documentation, and it seemed like a natural way to generate formatted receipts without having to write raw ESC/POS commands.

The integration supports a practical subset of Markdown, including headings, emphasis, lists, block quotes, links, horizontal rules, and code blocks.

For example, a Home Assistant automation can send something like this:
    
    
    action: qr701.print_markdown
    data:
      device_id: YOUR_QR701_DEVICE_ID
      text: |-
        # Shopping List
    
        **Don't forget:**
    
        - Coffee
        - Milk
        - Bread
    
        ---
    
        Printed by Home Assistant

Home Assistant handles the formatting and sends the appropriate commands to the printer.

Naturally, there are limitations. We're still dealing with a 58mm receipt printer, not a laser printer. Standard text wraps at approximately 32 characters, and formatting options depend on what the printer's firmware supports.

Markdown images, tables, and arbitrary HTML or CSS aren't supported. Printable text is also restricted to portable ASCII characters, while QR code data can use UTF-8.

Still, for simple receipts, lists, reminders, and other short documents, Markdown is a convenient alternative to manually constructing printer commands.

QR codes are another feature I wanted to retain.

The integration can generate native QR codes with configurable module sizes and error correction levels. This makes it possible to print URLs, short pieces of text, or other information that can be scanned with a phone.

Barcode printing is supported too, including Code 128, EAN, UPC, and several other common formats.

I don't have a particularly pressing need to print barcodes around the house, but that's never been a compelling reason not to add a feature to a project.

### A Printer That Can Participate in Automations

The more interesting part of integrating a receipt printer with Home Assistant isn't necessarily printing something manually. It's being able to incorporate physical printing into automations.

Home Assistant already knows an enormous amount about what's happening around the house. It can track schedules, monitor sensors, respond to events, and gather information from other integrations.

Giving it access to a printer creates another way to act on that information.

A few possibilities immediately come to mind.

A shopping list could be printed before heading out. A QR code could provide quick access to a frequently used webpage. A short summary of sensor readings could be printed for troubleshooting. A daily schedule could be turned into a physical receipt.

There's something appealing about taking information that normally exists only on a screen and turning it into a small piece of paper.

Of course, not everything needs to be printed. In most situations, a notification on my phone is considerably more practical.

But that's not really the point.

The appeal is having another output device available to Home Assistant, particularly one that's inexpensive, local, and simple enough to integrate into almost any automation.

### Keeping Everything Local

One of my longstanding preferences with home automation is to avoid unnecessary cloud services and proprietary dependencies.

I'm perfectly happy to use commercial hardware, but I generally want it to continue functioning without relying on an external server.

The QR701 fits that philosophy nicely.

The printer itself doesn't have an internet connection, a companion app, or an account system. It accepts commands over a serial connection and prints whatever it's told to print.

By combining it with ESPHome and Home Assistant, the entire system can operate locally.

The ESP32 provides connectivity, Home Assistant can handle the printing logic, and the printer produces the output.

There isn't much more to it.

I also appreciate that Serial Proxy allows the ESP32 to expose hardware functionality without requiring every feature to be implemented in firmware.

That doesn't mean the original ESPHome component is suddenly redundant. I still see value in having printing functionality available directly on the ESP32, independently of Home Assistant.

The benefit is having another option.

For some tasks, the existing ESPHome component makes perfect sense. For others, a dedicated Home Assistant integration is a more convenient place to manage the functionality.

Being able to use both approaches gives me considerably more flexibility than having to commit exclusively to one.

### Installation and the Current State of the Project

The integration is available on [GitHub](https://github.com/AidanMJ25/QR701-HA-Integration), along with installation instructions and an example ESPHome configuration.

It targets Home Assistant 2026.11 or newer and requires an ESPHome device with Serial Proxy support.

Installation can be performed manually by copying the custom integration into Home Assistant's `custom_components` directory, or through HACS by adding the repository as a custom integration.

The ESPHome configuration needs to expose the printer's serial connection through Serial Proxy. This can coexist with the original QR701 external component in a compatible configuration, rather than necessarily replacing it.

Once everything is configured, the printer can be added through Home Assistant's integration setup interface.

There are a few limitations worth mentioning.

The integration currently uses native ESC/POS commands for QR codes and barcodes, meaning compatibility depends on the printer's firmware. There isn't a raster graphics fallback for devices that don't support those commands.

Hardware status reporting is optional, and not every QR701 revision necessarily supports it.

Print jobs are serialized and transmitted in paced chunks to accommodate the printer's relatively small buffers. However, the integration doesn't automatically retry partially transmitted jobs, which avoids the possibility of unexpectedly printing duplicate receipts.

The project also remains in an early stage of development. The repository includes standalone tests and Home Assistant integration tests, but its documented validation does not yet establish successful operation on a live Home Assistant installation with physical printer hardware.

In other words, this is still a project for people who are comfortable experimenting, rather than something I'd recommend deploying unattended without testing it on their own hardware first.

### A Small Project With a Bigger Lesson

What started as an experiment with an inexpensive receipt printer has turned into a useful opportunity to explore two different approaches to integrating serial hardware with Home Assistant.

The original ESPHome component demonstrated how much functionality could be built directly into an ESP32. The new Home Assistant integration demonstrates how some of that functionality can instead be handled within Home Assistant through Serial Proxy.

And the particularly interesting part is that these approaches don't have to be mutually exclusive.

For the QR701, that means more conventional Home Assistant controls, the ability to develop integration features without continually rebuilding firmware, and the option to retain the existing ESPHome functionality.

It's also a reminder of one of the things I enjoy most about working with ESPHome and Home Assistant: relatively ordinary hardware can become surprisingly capable with a little experimentation.

Do I actually need a thermal receipt printer connected to my smart home?

Absolutely not.

But now that I have one, I can think of quite a few things I'd like it to print.

And that's usually how these projects begin.

**Project Links**

- [QR701 Home Assistant Integration](https://github.com/AidanMJ25/QR701-HA-Integration)
- [Original QR701 ESPHome External Component](https://github.com/AidanMJ25/QR701-ESPHome-External-Component)
- [ESPHome Serial Proxy Documentation](https://esphome.io/components/serial_proxy/)


{{< buttons-list >}}
