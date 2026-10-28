---
title: "I Want to Be Number 6"
date: 2026-09-15
draft: false
tags: ["ESPHome", "Home Assistant", "Smart Home", "Automation"]
summary: "My attempt to become the sixth active installation of Home Assistant's new LG TV via Serial integration turned into an adventure involving ESPHome, a MAX3232, service menus, DB9 pinouts, a multimeter, and an LG CX that stubbornly refuses to talk back."
---

There is a particular kind of Home Assistant project that begins with a perfectly reasonable idea and ends with you holding a multimeter against a DB9 connector while staring at the service menu of a television.

This is one of those projects.

My LG CX is currently controlled by Home Assistant in several different ways. I have infrared for essentially complete remote control. I have HDMI-CEC for power control and, more importantly, reliable power-state detection. Both work quite well.

Naturally, this meant I needed a third way to control the same television.

The reason is a small port on the back of my LG OLED55CXPUA labelled **RS-232C IN (CONTROL & SERVICE)**.

And, more specifically, a relatively new Home Assistant integration that promised to do something with it.

### LG TV via Serial

Home Assistant 2026.6 introduced a new integration called [LG TV via Serial](https://www.home-assistant.io/integrations/lg_tv_rs232?utm_source=chatgpt.com). It does exactly what the name suggests: instead of communicating with an LG television over Wi-Fi or Ethernet, Home Assistant talks directly to the television's RS-232 interface.

The integration supports turning the TV on and off, changing inputs, controlling volume and mute, and reading those states by polling the television every five seconds. More importantly for me, everything happens locally over a physical serial connection. [Home Assistant](https://www.home-assistant.io/integrations/lg_tv_rs232?utm_source=chatgpt.com)

My CX is deliberately disconnected from the network. I don't particularly want my television connected to the Internet, and between IR and HDMI-CEC, I've already managed to retain most of the functionality I care about.

RS-232, however, is extremely appealing.

It's an old, boring, well-understood interface designed specifically for controlling equipment. It doesn't need an LG account. It doesn't need Wi-Fi. It doesn't need an API token. It doesn't care whether LG decides to redesign webOS or shut down some service in five years.

There is a wire. You send commands down the wire. The television does things.

Perfect.

Or at least it should be.

### Five People

There is a wonderfully funny detail at the bottom of Home Assistant's documentation for this integration.

As I write this, **LG TV via Serial is used by five active installations**. [Home Assistant](https://www.home-assistant.io/integrations/lg_tv_rs232)

Five.

I want to be number 6.

That tiny number also explains something I discovered very quickly after deciding to try this: there is essentially no community knowledge surrounding this integration yet.

No YouTube walkthrough showing someone setting it up with an LG OLED. No decade-old Home Assistant forum thread with 600 replies. No random Reddit commenter who happened to use exactly the same television, cable, serial converter, and ESP32 three years ago.

The integration itself only arrived in Home Assistant 2026.6, where it launched at Silver quality. [Home Assistant](https://www.home-assistant.io/blog/2026/06/03/release-20266/?utm_source=chatgpt.com)

Even more significantly, Home Assistant currently lists exactly **one television** as having been tested with it:

> LG OLED55B7A

The documentation says that LG TVs and commercial displays exposing an RS-232C control port are generally supported, but my **OLED55CXPUA isn't among the tested models**. [Home Assistant](https://www.home-assistant.io/integrations/lg_tv_rs232)

So, sure. Let's find out.

### Obviously, I Used an ESP32

Home Assistant supports several ways of getting to the television's serial port. You can connect a USB-to-serial adapter directly to your Home Assistant server, use another network serial interface, or use an ESPHome-based serial proxy. [Home Assistant](https://www.home-assistant.io/integrations/lg_tv_rs232)

I chose ESPHome.

Of course I chose ESPHome.

At this point ESPHome has become my answer whenever a device I want doesn't exist, costs considerably more than I think it should, or is needlessly proprietary.

The basic architecture is wonderfully ridiculous:
    
    
    Home Assistant
          │
          │ ESPHome Native API
          ▼
    ESP32
          │
          │ 3.3V UART
          ▼
    MAX3232
          │
          │ RS-232
          ▼
    DB9 → 3.5 mm cable
          │
          ▼
    LG CX

The ESP32 can't speak RS-232 electrically by itself. Its UART uses 3.3-volt logic, whereas proper RS-232 uses bipolar signalling. A cheap MAX3232 converter handles that translation.

ESPHome's `serial_proxy` component then makes that physical UART available to Home Assistant.

Home Assistant even discovers it as a serial device.

This was all remarkably straightforward.

Until I tried adding the television.

**Connection failed.**

And thus began the adventure.

### How Hard Can Three Wires Be?

RS-232 on the CX is a three-wire interface: transmit, receive, and ground.

There are no complicated handshakes. No RTS. No CTS. No authentication. No encryption. We're communicating at the blistering speed of **9600 baud**.

The LG protocol itself isn't particularly mysterious either. Commands are ASCII.

To ask television number 1 for its current power state:
    
    
    ka 01 FF\r

That's it.

Home Assistant was correctly opening the ESPHome serial proxy and transmitting the query.

ESPHome's UART debugger showed the exact bytes leaving the ESP32:
    
    
    6B 61 20 30 31 20 66 66 0D

That is `ka 01 ff` followed by a carriage return.

The television said nothing.

So I bypassed Home Assistant.

I added a temporary ESPHome button that sent:
    
    
    ka 01 FF\r

Nothing.

I queried the broadcast Set ID:
    
    
    ka 00 FF\r

Nothing.

The problem was no longer simply "the new Home Assistant integration doesn't work."

I could send LG's documented protocol directly from the ESP32 and still get silence.

### Enter the Multimeter

This is approximately where the project stopped being software troubleshooting and turned into reverse-engineering a pile of inexpensive cables and converter boards.

My RS-232 converter is one of those wonderfully generic MAX3232 boards whose silk-screened labels turned out to be less intuitive than I expected.

Eventually, I stopped trusting labels and started measuring things.

I continuity-tested the DB9-to-3.5-mm StarTech cable:
    
    
    DB9 pin 3 → tip
    DB9 pin 2 → ring
    DB9 pin 5 → sleeve

That matches one of LG's documented wiring arrangements.

Then came the DB9 numbering itself, because male and female connectors viewed from the front are mirrored. At one point, I had successfully proven something about entirely the wrong pins.

Excellent.

Once that was sorted out, I bridged the actual DB9 pins 2 and 3 on the MAX3232 board and sent my power query again.

ESPHome logged:
    
    
    >>> 6B 61 20 30 31 20 46 46 0D
    <<< 6B 61 20 30 31 20 46 46 0D

Perfect loopback.

Every byte transmitted through the ESP32, UART, MAX3232, RS-232 output, bridge, RS-232 input, MAX3232, and back into the ESP32.

The converter worked.

I also measured proper bipolar RS-232 voltages of roughly ±7 volts.

The hardware was actually speaking RS-232.

Connect the television again:
    
    
    >>> 6B 61 20 30 31 20 46 46 0D

And then...

Nothing.

### There Is a Secret Menu, Naturally

Home Assistant's documentation contains another particularly important requirement: **RS-232C Control needs to be enabled**, and on many LG televisions that setting lives inside the hidden `InStart` service menu. [Home Assistant](https://www.home-assistant.io/integrations/lg_tv_rs232)

I didn't have access to that menu with the normal Magic Remote.

So I bought an LG factory service remote.

This project had now resulted in me owning a remote control whose primary purpose is accessing menus that LG very much does not intend normal television owners to poke around in.

This is going great.

The service remote worked.

And there it was:

**RS-232C Control: Off**

Aha!

I switched it on.

Surely this was it.

I sent:
    
    
    ka 01 FF\r

Nothing.

I unplugged the television completely, waited, plugged it back in, and confirmed that RS-232C Control remained enabled.

Nothing.

Then I found another relevant setting in the service menu:

**Baudrate: 9600**

Exactly what it should be.

At this point, the television and I had established a very clear communications protocol: I would send it valid serial commands, and it would pretend I didn't exist.

### The Troubleshooting Checklist From Hell

Home Assistant's troubleshooting documentation for a failed connection is quite reasonable. It tells you to ensure the TV is on, enable RS-232C Control, verify the crossover cable is fully inserted into LG's recessed jack, select the correct serial port, and check the Set ID. [Home Assistant](https://www.home-assistant.io/integrations/lg_tv_rs232)

I have now done essentially all of those things.

Repeatedly.

The TV has been tested on and in standby.

RS-232C Control is enabled.

Baud is 9600.

Set ID is 1.

I have also queried Set ID 0 as a broadcast.

The 3.5-mm plug is fully inserted.

The cable has been continuity-tested.

The MAX3232 has passed a complete transmit-and-receive loopback.

The RS-232 voltage levels have been measured.

ESPHome is demonstrably transmitting the correct bytes.

I've even tried reversing the transmit and receive arrangement despite the measurements. That produced an endless stream of NUL bytes rather than a valid LG response, which at least had the virtue of being a _different_ kind of failure.

The normal configuration produces beautiful, pristine silence.

### Maybe It's Not Me

And this is where those five installations have become much more interesting to me.

The Home Assistant documentation doesn't claim that the CX has been tested. It says the **OLED55B7A** has been tested and that compatible LG televisions are expected to work more generally. It also explicitly notes that different LG models support different subsets of the serial command set. [Home Assistant](https://www.home-assistant.io/integrations/lg_tv_rs232)

The CX certainly has the hardware. LG documents the serial protocol. The television has an RS-232C IN port. Its own service menu contains both an RS-232C Control switch and a configurable serial baud rate.

Everything about this television says:

**Yes, I speak RS-232.**

It simply hasn't actually spoken to me yet.

That leaves an uncomfortable number of possibilities.

There could still be something peculiar about the cable or the physical contact inside LG's recessed 3.5-mm jack. There could be an undocumented CX-specific requirement. There could be a firmware quirk. The serial interface in my particular television could simply be broken.

Or there could be some subtle difference between what the new Home Assistant integration expects and what the CX actually does.

With five active installations and one officially tested television, there simply isn't enough community experience yet to point at somebody else's CX and say, "Yes. This exact configuration works."

### Cable Number Two

Conveniently, before finding the StarTech DB9-to-3.5-mm cable I'm using now, I ordered another cable.

It arrives in about a week.

Normally, waiting a week for a different three-wire serial cable would be an extraordinarily boring conclusion to a technology story.

Right now, I'm genuinely excited about it.

The StarTech cable passes continuity testing, so I have no particularly compelling reason to believe it's defective. But another independently manufactured cable gives me something increasingly valuable in this project: **a new variable to test instead of testing the same things again**.

If the second cable works, fantastic. I will have learned that a cable can electrically test exactly as expected while still finding some wonderfully stupid way not to work with a particular recessed television jack.

If it doesn't, the case against the cable becomes considerably weaker.

And the case for investigating the CX itself becomes considerably stronger.

### I Still Want to Be Number 6

The absurd thing is that none of this is necessary.

My television already works with Home Assistant.

IR gives me essentially every remote command I could want. HDMI-CEC gives me excellent power-state detection. The CX is disconnected from the network, which was the entire point of this exercise in the first place.

I could stop.

But there's an RS-232 port back there.

And Home Assistant now has an integration specifically designed to use it.

And there are apparently five people using it.

Five.

After an ESP32, a MAX3232, two DB9 cables, a service remote, continuity testing, voltage measurements, UART debugging, serial loopbacks, LG service menus, several readings of LG's protocol documentation, and an increasingly personal relationship with the command `ka 01 FF`, I have developed a very simple objective:

**I want to be number 6.**


{{< buttons-list >}}