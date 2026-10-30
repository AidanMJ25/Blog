---
title: "Rediscovering Infrared - From Harmony to HAIR"
date: 2026-10-30
draft: false
tags: ["Home Assistant", "ESPHome", "Smart Home"]
summary: "Exploring open-source infrared code databases, the massive Logitech Harmony archive, and how HAIR brings forgotten remote controls back to life through Home Assistant and ESPHome."
---

_Exploring open-source infrared code databases, Logitech's enormous Harmony archive, and HAIR's attempt to bring it all together in Home Assistant._

I have spent a considerable amount of time experimenting with infrared control in Home Assistant. Between ESPHome, custom IR transmitters, HDMI-CEC, and even RS-232, I have developed something of an obsession with finding ways to control devices without relying on their manufacturer's software or cloud services.

Infrared has become one of my favourite technologies to work with, largely because of how uncomplicated it is.

You press a button, a little LED flashes, and something happens. No account, no internet connection, no firmware update, and no app that might disappear in five years.

Of course, there's a catch.

Infrared is generally a one-way communication system. Devices rarely tell you whether they received a command, and figuring out which commands a particular device understands can be an exercise in frustration.

That's where infrared code databases come in.

Recently, I came across several open-source projects that have collected, preserved, and organized an extraordinary number of infrared commands. Some have been around for years, while others are relatively new.

And with projects like HAIR bringing these collections closer to Home Assistant's native infrared support, things are getting particularly interesting.

### The Problem With Infrared Isn't Infrared

One of the things I appreciate about infrared is that the underlying technology has remained remarkably consistent.

A television manufactured fifteen years ago can still respond to commands from a modern microcontroller. You don't need an API key, a manufacturer account, or permission from somebody's server.

You just need the correct signal.

Unfortunately, knowing which signal to transmit isn't always straightforward.

If you have the original remote, you can capture its commands using an infrared receiver. ESPHome makes this relatively easy, and I've built several devices that can both receive and transmit IR signals.

But what happens when you don't have the original remote?

Or when the original remote doesn't expose every command the device supports?

For example, many televisions support separate Power On and Power Off commands, even though the supplied remote only has a single power toggle button.

The same can be true for selecting HDMI inputs, changing picture modes, or accessing functions that manufacturers never bothered putting on the physical remote.

These are precisely the situations where a good IR database becomes invaluable.

Instead of trying to discover commands yourself, you can take advantage of somebody else's work.

And as it turns out, quite a few people have been doing that work.

### IRDB: A Wikipedia for Infrared Commands

[IRDB](https://github.com/probonopd/irdb) is one of the more interesting projects I discovered.

It describes itself as a manufacturer-independent, crowd-sourced database of infrared remote control codes. Its goal is essentially to become the Wikipedia of infrared commands.

Rather than storing enormous collections of raw pulse timings, IRDB uses a compact representation based on the infrared protocol, device, subdevice, and function.

That distinction matters.

An infrared signal is more than a string of numbers. It has a protocol, timing information, and a particular structure. If you know those details, you can generate the actual signal in different formats.

Tools such as IrScrutinizer and MakeHex can take the information stored in IRDB and turn it into something an infrared transmitter can use.

I particularly like this approach because the database isn't tied to a particular piece of hardware.

The codes aren't inherently for a Broadlink, a Flipper Zero, or an ESP32. They're descriptions of infrared commands that can be translated into whatever format your hardware requires.

That's exactly the sort of separation I appreciate in an open-source project.

The information exists independently of the device you choose to use.

### Flipper-IRDB: An Enormous Community Collection

Another fantastic resource is [Flipper-IRDB](https://github.com/Lucaslhm/Flipper-IRDB).

As its name suggests, this repository is primarily organized around the Flipper Zero, but there's nothing particularly exclusive about the infrared signals themselves.

The project contains community-contributed `.ir` files for a wide variety of equipment, including televisions, audio systems, projectors, air conditioners, and plenty of less common devices.

What makes this collection particularly useful is its accessibility.

Instead of having to understand a particular manufacturer's infrared protocol, you can often find a file containing named commands for the device you're trying to control.

Power, volume, input selection, navigation, and other functions can already be captured and organized.

The Flipper format is also relatively straightforward to inspect. It can represent decoded protocol commands as well as raw infrared timings.

That makes it useful well beyond the Flipper Zero itself.

For somebody working with ESPHome, a collection like this can be an excellent starting point for finding commands that aren't available on the original remote.

You still need to convert the commands into a format your transmitter understands, but that's considerably easier than discovering them from scratch.

And because it's a community-maintained repository, it isn't dependent on a single manufacturer continuing to operate a service.

### Logitech Harmony: Preserving a Massive Piece of IR History

Of all the projects I've been exploring, the [Logitech Harmony IR Archive](https://github.com/pickysysadmin/logitech-harmony-ir-archive) might be the most impressive.

Logitech spent years building an enormous database of consumer electronics and their corresponding remote-control commands.

That database was one of the reasons Harmony remotes were so useful.

Instead of manually teaching a universal remote every button, you could tell Logitech which devices you owned, and its software would retrieve the appropriate commands.

It was a fantastic idea, with one significant problem: much of that information lived on Logitech's servers.

With Harmony discontinued, preserving that information has become increasingly important.

This archive takes an extraordinary amount of that data and makes it available in a format that can be inspected and used independently.

The numbers are ridiculous:

- **276,236 devices**
- **7,889 manufacturers**
- **13,293,293 commands**
- **684 infrared protocol definitions**

That's more than thirteen million commands.

And importantly, the archive doesn't just contain button names.

It includes ready-to-send Pronto Hex for the overwhelming majority of its infrared commands, alongside protocol definitions and device-control information.

Some device profiles even describe whether power is controlled using separate On and Off commands, how inputs are selected, and how quickly commands can be sent.

That additional information is particularly valuable for home automation.

A universal remote might only need to know that pressing a button turns a television on or off.

An automation benefits enormously from knowing that Power On and Power Off are separate commands.

You can send the exact command you need instead of hoping the television is currently in the opposite state.

The archive also preserves the underlying protocol information, rather than relying exclusively on pre-generated signals.

That means the data can potentially be reused by tools and hardware that Logitech never intended to support.

There are some important caveats concerning the licensing of the original Logitech data, and not every archived device has a complete command set.

Still, preserving this information in accessible files is a remarkable achievement.

It's also a perfect example of why I dislike hardware that depends on a manufacturer's cloud infrastructure.

The hardware might continue working for decades, but the service that makes it useful can disappear whenever the manufacturer decides it's no longer worth maintaining.

Having the commands preserved independently gives that hardware a much better chance of remaining useful.

### SmartIR: Bringing Infrared Into Home Assistant

Of course, collecting infrared commands is only half the problem.

You still need a convenient way to use them.

[SmartIR](https://github.com/smartHomeHub/SmartIR) has been addressing this problem in Home Assistant for years.

It's a custom integration that allows infrared-controlled equipment to appear as familiar Home Assistant entities, including climate devices, media players, fans, and lights.

Rather than manually creating an automation for every button, SmartIR uses device-specific code files to map infrared commands to functions Home Assistant understands.

It supports several different controller backends, including Broadlink, Xiaomi, MQTT, and ESPHome through a user-defined transmission service.

I particularly appreciate the ESPHome support.

I already have several ESPHome devices capable of transmitting infrared commands. Adding another proprietary hub simply to control a television would be rather pointless.

SmartIR also maintains a substantial collection of device configurations, particularly for air conditioners.

Climate control is an area where infrared gets complicated very quickly.

Unlike a television remote, where pressing Volume Up generally sends one command, an air conditioner remote may transmit its entire operating state every time you press a button.

Temperature, fan speed, operating mode, and other settings can all be encoded into one signal.

That means supporting an air conditioner can require a large matrix of commands rather than a handful of simple button mappings.

SmartIR's device profiles help make that complexity manageable.

But SmartIR also represents an older approach to infrared integration in Home Assistant: maintaining a separate system for translating infrared commands into useful entities.

With Home Assistant introducing a native infrared platform, there's an opportunity to build something more integrated.

Which brings me to HAIR.

### HAIR: Giving Infrared a Proper Home

[HAIR](https://github.com/DAB-LABS/HAIR) -- an infrared device administration panel for Home Assistant -- is perhaps the most exciting project in this collection.

Rather than treating infrared as a collection of commands that you manually send through scripts and automations, HAIR attempts to make the entire experience feel native to Home Assistant.

It builds on Home Assistant's newer `infrared` platform, allowing compatible transmitters and receivers to be discovered and managed through a graphical interface.

The basic idea is wonderfully simple.

Point a remote at a receiver, press a few buttons, and HAIR can identify the signals and help organize them into a device.

From there, those commands can be associated with Home Assistant entities and actions.

But what makes HAIR especially interesting to me is that it doesn't stop at learning commands.

It also supports importing existing infrared code collections.

Its import functionality includes SmartIR JSON configurations, Flipper Zero `.ir` files, LIRC configurations, Girr exports, and its own portable code format.

That creates an interesting bridge between the enormous collections of infrared commands already available online and the devices we actually want to control.

Instead of every Home Assistant user having to capture the same remote independently, existing code files can become the starting point for a working device.

HAIR also supports receiving infrared commands and turning them into Home Assistant automation triggers.

That opens up another possibility: using ordinary infrared remotes as input devices for Home Assistant.

A button on an old remote could trigger an automation, activate a scene, or control something completely unrelated to the device it originally came with.

I love that.

There's something deeply satisfying about taking a remote that might otherwise end up in a drawer and giving it an entirely new purpose.

### The ESPHome Connection

This is where HAIR becomes particularly relevant to my own setup.

My infrared hardware is already built around ESPHome.

I have multiple ESPHome-powered IR transmitters and receivers, including devices based on Athom hardware and a KinCony KC868-AG hub.

They already work locally, integrate with Home Assistant, and don't require any manufacturer cloud services.

ESPHome's IR/RF Proxy support can expose compatible hardware through Home Assistant's native infrared platform, which is exactly the interface HAIR is designed to use.

That means HAIR potentially provides a more convenient management layer for hardware I already own.

No new hub. No proprietary application. No cloud account.

Just another piece of software making existing hardware more useful.

HAIR also includes features for assigning emitters to particular devices, monitoring transmitted commands, and associating power sensors with infrared-controlled equipment.

That last feature is particularly interesting.

One of the biggest limitations of infrared control is that transmitting a Power On command doesn't necessarily mean the device actually turned on.

HAIR can use a power-consumption sensor to help determine whether a device is running.

In my own setup, I've approached the same problem using HDMI-CEC to monitor my LG CX television's power state.

The important distinction is that the infrared transmitter doesn't have to be responsible for knowing everything about the device.

Infrared can handle the commands, while another system provides feedback.

That's a much more useful approach than pretending infrared suddenly became bidirectional.

HAIR doesn't eliminate infrared's limitations, but it does provide ways to work around some of them.

And that's exactly what I want from a Home Assistant integration.

### The Missing Piece: Making These Databases Work Together

Looking at these five projects together, what strikes me isn't simply the number of infrared commands available.

It's how much useful information already exists, scattered across different formats and repositories.

IRDB provides compact protocol-based command descriptions.

Flipper-IRDB offers a huge collection of community-captured remotes.

The Harmony archive preserves millions of commands and the protocol information needed to reproduce them.

SmartIR contains device profiles designed around Home Assistant's entity model.

And HAIR is building a graphical interface for learning, importing, organizing, and using infrared commands through Home Assistant's native infrastructure.

They don't all work together automatically, and their formats aren't universally interchangeable.

For example, IRDB's protocol descriptions aren't the same thing as a ready-to-import HAIR device profile. Likewise, the Harmony archive's Pronto commands may require some organization or conversion before becoming a complete device configuration.

But the pieces are increasingly there.

I can imagine a workflow where you search for a device, retrieve an existing command set, import it into Home Assistant, assign an ESPHome transmitter, and immediately have a usable remote.

No manufacturer app. No cloud service. No manually recording dozens of buttons.

We're not completely there yet, but projects like HAIR make that possibility feel considerably more realistic.

And perhaps more importantly, the underlying information is being preserved in formats that other projects can use.

### Why I Still Love Infrared

I realize it's a little ridiculous to be this enthusiastic about a technology that has been controlling televisions since long before I was born.

But that's part of the appeal.

Infrared doesn't need to be reinvented.

It already works remarkably well for what it was designed to do.

The problems have mostly been around discovering commands, organizing them, and integrating them with more capable automation systems.

ESPHome solves the hardware side of that equation for me. Home Assistant provides the automation platform. These databases supply the commands, and projects like HAIR are working on making the entire experience more accessible.

I also appreciate that none of this requires me to abandon the original remote.

The television can still be controlled normally, while Home Assistant gains access to commands and automation possibilities that the manufacturer might never have exposed through its own software.

That's the sort of interoperability I wish more modern electronics embraced.

It's also a reminder that sometimes the most useful smart home technology isn't particularly smart at all.

Sometimes it's just an infrared LED connected to an ESP32, backed by a few million commands that somebody was kind enough to preserve.

And frankly, I think that's pretty fantastic.

### Projects Mentioned

- [IRDB -- Crowd-Sourced Infrared Database](https://github.com/probonopd/irdb/tree/master/codes)
- [Flipper-IRDB -- Community Infrared Remote Collection](https://github.com/Lucaslhm/Flipper-IRDB)
- [Logitech Harmony IR Archive](https://github.com/pickysysadmin/logitech-harmony-ir-archive)
- [SmartIR -- Infrared Control for Home Assistant](https://github.com/smartHomeHub/SmartIR)
- [HAIR -- Infrared Device Management for Home Assistant](https://github.com/DAB-LABS/HAIR)
- [IRRF Proxy - ESPHome - Smart Home Made Simple](https://esphome.io/components/ir_rf_proxy/)
- [Infrared - Home Assistant](https://www.home-assistant.io/integrations/infrared/)
- [Radio frequency - Home Assistant](https://www.home-assistant.io/integrations/radio_frequency/)

{{< buttons-list >}}
