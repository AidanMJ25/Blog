---
title: "I Have the Receipts"
date: 2026-10-24
draft: false
tags: ["ESPHome", "Home Assistant"]
summary: "I connected a thermal receipt printer to an ESP32, integrated it with Home Assistant, and built an ESPHome component to control it. Why? That's an excellent question."
---

I have a confession to make: I bought a thermal receipt printer.

Not because I run a business, need to print shipping labels, or have any particularly compelling reason to produce tiny pieces of paper. In fact, I have absolutely no practical use for a receipt printer whatsoever.

I bought one because I thought it would be fun to connect it to an ESP32 and control it using ESPHome.

And, well, I was right.

This is one of those projects that perfectly illustrates why I enjoy tinkering with electronics and Home Assistant. Sometimes the goal isn't to solve a problem or make something more convenient. Sometimes it's simply to see whether you can make two pieces of technology talk to each other.

As it turns out, making a receipt printer spit out messages from Home Assistant is enormously satisfying.

### A Solution in Search of a Problem

The printer in question is a QR701, a relatively inexpensive 58 mm thermal receipt printer module. It's the sort of mechanism you might find inside a kiosk, vending machine, or other piece of equipment that needs to produce a small printed receipt.

Unlike a conventional desktop printer, the QR701 is essentially a bare printer mechanism with a serial interface. There are no Wi-Fi credentials to configure, no manufacturer's app to install, and certainly no cloud account to create.

Just a printer, a handful of wires, and some serial commands.

Naturally, this appealed to me.

The QR701 is available in several interface variants, including USB, RS-232, and TTL serial. I specifically chose the TTL version because it could communicate with an ESP32 over UART without needing a USB host or an RS-232 converter.

I already use ESPHome extensively throughout my home, so the obvious next step was to make the printer another ESPHome device.

Was this necessary? Absolutely not.

Was I going to do it anyway? Of course.

### Making the Connections

One of the nice things about this project is that the hardware is surprisingly straightforward.

The QR701 communicates using a serial interface, which means an ESP32 can send it commands over a couple of GPIO pins.

For my setup, I used the following connections:

| 

**ESP32**

 | 

**QR701**

 | 
| ---- | ----  |
| 

GPIO17 (TX)

 | 

RXD

 | 
| 

GPIO16 (RX)

 | 

TXD

 | 
| 

GND

 | 

GND

 | 

The printer also requires its own power supply. Unlike the ESP32, which can happily run from USB power, the QR701 needs a considerably beefier supply to operate its thermal printhead.

The printer is rated for a 5--9 V supply with sufficient current capacity. It's not something you should attempt to power directly from an ESP32.

One important electrical detail: the printer's serial output voltage needs to be verified before connecting it to an ESP32's 3.3 V GPIO. If it outputs 5 V logic, a level shifter is required on the ESP32's receive line. For printing alone, the receive connection can simply be omitted.

Once the hardware was connected and powered, the next challenge was getting ESPHome to communicate with it.

### Enter ESPHome

ESPHome is one of my favourite pieces of software in the home automation world.

It allows you to turn relatively inexpensive microcontrollers into surprisingly capable devices using YAML configuration files. More importantly, it integrates beautifully with Home Assistant and doesn't require relying on a manufacturer's cloud infrastructure.

There was just one small problem: ESPHome doesn't include a native component for the QR701.

Fortunately, ESPHome supports external components, allowing additional functionality to be implemented without modifying ESPHome itself.

So I put together an external component specifically for this printer.

The result is my [QR701 ESPHome External Component](https://github.com/AidanMJ25/QR701-ESPHome-External-Component), which I've published on GitHub.

With the component installed, the ESPHome configuration is pleasantly simple:
    
    
    external_components:
      - source: github://AidanMJ25/QR701-ESPHome-External-Component
        components: [qr701]
        refresh: 0s
    
    uart:
      id: printer_uart
      tx_pin: GPIO17
      rx_pin: GPIO16
      baud_rate: 9600
      data_bits: 8
      parity: NONE
      stop_bits: 1
    
    qr701:
      id: receipt_printer
      update_interval: 1s
      uart_id: printer_uart

That's essentially everything required to establish communication between ESPHome and the printer, assuming the hardware is correctly connected.

On the back of the QR701 it says to use 9,600 baud.

With that in place, the printer becomes something ESPHome can interact with through its own actions.

And this is where things get interesting.

### Printing from Home Assistant

The first thing I wanted was a simple way to tell the printer to print something.

Nothing elaborate. Just a button that would produce a few lines of text.

ESPHome makes this straightforward:
    
    
    button:
      - platform: template
        name: Print test receipt
        on_press:
          - qr701.print_text: |-
              Hello from ESPHome!
              This is a test receipt.

Pressing that button sends the text to the printer, which then produces a tiny paper receipt containing the message.

That's it.

And I cannot adequately explain how amusing I find this.

There is something wonderful about pressing a button in Home Assistant, hearing a little thermal printer spring to life, and watching a completely unnecessary piece of paper emerge from it.

The component also supports feeding paper manually:
    
    
    button:
      - platform: template
        name: Feed QR701 paper
        on_press:
          - qr701.feed: 3

And requesting an immediate status update:
    
    
    button:
      - platform: template
        name: Refresh QR701 status
        on_press:
          - qr701.refresh_status:
              id: receipt_printer

The component can also expose printer status information to Home Assistant, including paper-out, cover-open, and error conditions, provided the printer's serial receive connection is configured correctly.

In other words, Home Assistant can do more than simply send text to the printer. It can also receive information about the printer's condition.

Which is a frankly ridiculous amount of functionality for something I purchased without having any idea what I was going to use it for.

### A Surprisingly Capable Little Printer

One of the more interesting things about the QR701 is that it supports ESC/POS, a command system commonly associated with point-of-sale receipt printers.

This makes it possible to control the printer using relatively simple serial commands rather than implementing an entirely proprietary printing system.

My external component currently focuses on printing text, feeding paper, and reporting status.

It also supports sending text from Home Assistant through a text entity, meaning I'm not limited to messages hardcoded into an ESPHome configuration.

There's even support for printing a practical subset of Markdown, including headings, emphasis, lists, and other basic formatting.

For a device whose entire job is to heat up tiny dots on a roll of paper, that's pretty neat.

Of course, this isn't a replacement for a conventional printer. The QR701 is monochrome, uses narrow thermal paper, and has none of the conveniences you'd expect from a modern desktop printer.

But those limitations are also part of its charm.

It's simple hardware that does one thing, and does it without requiring an internet connection or somebody else's server.

### But What Is It Actually For?

This is the part where a more sensible person would explain the practical application that justified the entire project.

Perhaps printing shopping lists, Home Assistant notifications, reminders, or little status reports from various devices around the house.

And yes, I suppose it could do any number of those things with the right automations.

But that would imply I had some sort of plan when I bought it.

I didn't.

I saw a little thermal receipt printer, thought it would be entertaining to make it work with ESPHome, and decided to give it a try.

That's the entire story.

I already have plenty of ways to receive notifications, check the status of my smart home, and interact with Home Assistant. I don't need a machine that converts those things into disposable strips of paper.

But I now have one anyway.

And I can make it print things.

### The Joy of Pointless Projects

I think there's a tendency, particularly with smart home projects, to judge everything by how much time it saves or how useful it is.

Does this automation eliminate a repetitive task? Does this device make something more convenient? Does this integration solve a problem?

Those are perfectly reasonable questions, and they're often the motivation behind my other Home Assistant projects.

But they aren't the only reasons to build something.

Sometimes a project is worthwhile simply because you learn something while doing it.

In this case, I got to experiment with another serial device, work with ESC/POS commands, build an ESPHome external component, and integrate a completely new category of hardware into Home Assistant.

I also ended up with a reusable open-source component that somebody else might actually have a legitimate reason to use.

That's a pretty good outcome for a project that began with no purpose whatsoever.

And perhaps that's what I enjoy most about ESPHome and the wider open-source hardware ecosystem. You're not limited to the devices that manufacturers have decided should be part of your smart home.

If something has an interface you can communicate with, there's a decent chance you can make it work.

Even if that something is a receipt printer.

So, do I need a thermal receipt printer connected to Home Assistant?

Absolutely not.

Do I regret building one?

Not even slightly.

After all, I have the receipts to prove it.


{{< buttons-list >}}
