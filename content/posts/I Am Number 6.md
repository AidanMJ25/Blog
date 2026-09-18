---
title: "I Am Number 6"
date: 2026-09-17
draft: false
tags: ["ESPHome", "Home Assistant", "Smart Home", "Automation"]
summary: "After days of troubleshooting cables, DB9 pinouts, TX/RX wiring, a MAX3232, LG service menus, and even my own debugging code, I finally got Home Assistant talking to my offline LG CX over RS-232--and became Number 6."
---

A few days ago, I wrote about my attempt to become what Home Assistant's analytics suggested would be the sixth active installation of its very new **LG TV via Serial** integration.

At the time, the title was aspirational.

I had an LG CX with an RS-232 port. I had an ESP32. I had a MAX3232 board. I had ESPHome's new-ish `serial_proxy` component. I had Home Assistant. I had LG's external control documentation. And I had absolutely no communication from the television.

After far too much time with a multimeter, service remote, DB9 pinouts, UART debugging, two different serial cables, and increasingly creative profanity, I can finally write the sequel.

**I am Number 6.**

More importantly, I learned quite a lot about RS-232 along the way.

### The Finished Setup

The final arrangement is delightfully simple:
    
    
    Home Assistant
          │
          │ ESPHome Native API
          ▼
    ESP32
    ESPHome serial_proxy
          │
          │ UART
          ▼
    MAX3232
    TTL ↔ RS-232
          │
          │ DB9
          ▼
    DB9 → 3.5 mm cable
          │
          ▼
    LG OLED55CXPUA
    RS-232C IN

The television remains completely disconnected from Ethernet and Wi-Fi. Home Assistant talks to the ESP32 over my local network, the ESP32 talks UART to a MAX3232, and the MAX3232 talks proper bipolar RS-232 to the television.

Home Assistant now has a native `media_player` for the CX. It knows whether the TV is on, knows its volume, can change that volume, change inputs, mute it, and issue commands directly to the television.

This now exists alongside my other two local control methods: infrared and HDMI-CEC.

Apparently one local control protocol for a television wasn't enough.

I needed three.

### Lesson One: Verify What the Pins Actually Mean

One of the most confusing parts of this project was the little HW-044 MAX3232 board.

Its TTL header is labelled:
    
    
    GND
    TXD
    RXD
    VCC

Normally, when connecting two UART devices, the rule drilled into your head is:
    
    
    TX → RX
    RX → TX

Naturally, that's how I initially approached it.

And it didn't work properly.

The configuration that actually works with this particular board is:
    
    
    ESP32 TX  → MAX3232 TXD
    ESP32 RX  → MAX3232 RXD

**TX to TX. RX to RX.**

That looks wrong.

It feels wrong.

If somebody posted that wiring diagram without explanation, I would probably tell them they'd crossed it incorrectly.

But this is where labels can be misleading. The labels on a converter board may describe the signal relative to the device the converter expects to connect to rather than simply describing the direction at the pin in the way you're assuming.

Eventually I stopped arguing with the silkscreen and tested the actual signal path.

With DB9 pins 2 and 3 bridged together, I transmitted:
    
    
    ka 01 FF\r

ESPHome showed:
    
    
    >>> 6B 61 20 30 31 20 46 46 0D
    <<< 6B 61 20 30 31 20 46 46 0D

Perfect loopback.

Every byte leaving the ESP32 made it through the MAX3232, crossed at the RS-232 side, came back through the receiver, and arrived at the ESP32 unchanged.

**Trust measurements more than assumptions about labels.**

### Lesson Two: DB9 Pin Numbers Are Very Easy to Read Backwards

This cost me more time than I'd care to admit.

Male and female DB9 connectors are mirror images when viewed from their mating faces.

For a male connector viewed from the front:
    
    
    1 2 3 4 5
     6 7 8 9

For a female connector viewed from the front:
    
    
    5 4 3 2 1
     9 8 7 6

Once I stopped counting the female connector backwards, continuity testing started making considerably more sense.

My Klein MM325 became one of the most useful tools in this project. Instead of continuing to reason about what a cable _should_ be doing, I could answer the much more useful question:

**What is this cable actually doing?**

### Lesson Three: "DB9 to 3.5 mm RS-232 Cable" Does Not Describe a Pinout

My original StarTech cable wasn't defective.

In fact, continuity testing showed it was wired perfectly consistently:
    
    
    DB9 pin 3 → 3.5 mm tip
    DB9 pin 2 → 3.5 mm ring
    DB9 pin 5 → 3.5 mm sleeve

The annoying part is that this is a perfectly legitimate arrangement. LG's own documentation even illustrates more than one DB9 arrangement depending on the serial configuration.

But it wasn't the arrangement that worked with my MAX3232 board.

I ordered another DB9-to-3.5 mm cable and immediately attacked it with the multimeter before plugging it into anything.

That one was:
    
    
    DB9 pin 2 → 3.5 mm tip
    DB9 pin 3 → 3.5 mm ring
    DB9 pin 5 → 3.5 mm sleeve

Pins 2 and 3 were reversed.

I plugged it in and sent:
    
    
    ka 00 FF\r

Then this appeared:
    
    
    >>> 6B 61 20 30 30 20 46 46 0D
    <<< 61 20 30 30 20 4F 4B 30 31 78

Or, translated back to ASCII:
    
    
    >>> ka 00 FF\r
    <<< a 00 OK01x

After days of silence, **the television talked back.**

That response wasn't noise. It wasn't loopback. It wasn't an ESPHome artefact.

It was an LG protocol acknowledgement saying, essentially:

> Yes. Command accepted. Power state: on.

I may have been slightly excited.

### Lesson Four: "Null Modem" Matters

The cable problem finally made the Home Assistant documentation's warning make considerably more sense:

The LG connection requires the appropriate crossed/null-modem arrangement.

RS-232 predates any expectation that plugging two things together should be obvious. DTE, DCE, straight-through, null-modem, male, female, TX on 2, TX on 3--there are enough conventions involved that two cables with the same connectors can behave completely differently.

The important lesson wasn't simply "swap pins 2 and 3."

It was:

**Determine the entire signal path.**

For my particular combination of ESP32, HW-044 MAX3232 module, DB9 cable and LG CX, the working arrangement ended up being the second cable:
    
    
    DB9 2 → tip
    DB9 3 → ring
    DB9 5 → sleeve

That's the configuration I'm documenting because that's the configuration I have actually proven works.

### Lesson Five: 3.3 Volts Wasn't the Problem

At one point I wondered whether powering the MAX3232 module from 3.3 V instead of 5 V might explain the lack of communication.

The multimeter settled that question.

The RS-232 side was producing approximately positive and negative 7 V signalling.

In other words, the charge pumps in the MAX3232 were doing exactly what they were supposed to do. The ESP32 wasn't somehow sending 3.3 V UART directly into a port expecting RS-232.

This was another useful reminder that when troubleshooting hardware, **measure the thing you're speculating about whenever possible**.

A voltage measurement can eliminate an entire branch of the fault tree in seconds.

### Lesson Six: LG Really Did Hide the Enable Switch in a Service Menu

Home Assistant's error message suggested that `RS-232C Control` might need to be enabled through LG's hidden InStart service menu.

Initially, I wasn't even sure that setting existed on my CX.

It does.

Using an LG service remote, I entered InStart and found:
    
    
    System 2
    → RS-232C Control

I enabled it.

I also found the serial baud-rate setting elsewhere in the service menu and confirmed that the television was configured for:
    
    
    9600 baud

The setting persisted through a complete AC power cycle.

I didn't touch anything else.

LG's service menus contain settings capable of doing considerably more exciting things than I wanted, and **IN STOP is very much not another way of exiting InStart**.

The goal was to enable RS-232, not accidentally service-initialize my OLED.

### Lesson Seven: The LG Protocol Is Refreshingly Simple

Once the electrical layer finally worked, LG's actual protocol turned out to be wonderfully boring.

A command looks like:
    
    
    [Command 1][Command 2] [Set ID] [Data]\r

For example, query power:
    
    
    ka 01 FF\r

The CX responds:
    
    
    a 01 OK01x

Then I queried mute:
    
    
    ke 01 FF\r

And received:
    
    
    e 01 OK01x

At that point there wasn't much left to debate.

The CX's RS-232 port worked.

The MAX3232 worked.

TX worked.

RX worked.

The cable worked.

Set ID 1 worked.

9600 8N1 worked.

And the television understood LG's documented protocol.

So naturally Home Assistant still refused to connect.

## Lesson Eight: Your Debugging Tools Can Become the Bug

This was my favourite part.

While troubleshooting, I had enabled ESPHome's UART debugger:
    
    
    debug:
      direction: BOTH
      dummy_receiver: true
      after:
        timeout: 100ms
      sequence:
        - lambda: |-
            UARTDebug::log_hex(direction, bytes, ' ');

This had been invaluable.

When I tried configuring Home Assistant's LG TV via Serial integration, the logs showed:
    
    
    >>> 6B 61 20 30 31 20 66 66 0D
    <<< 61 20 30 31 20 4F 4B 30 31 78

ASCII:
    
    
    >>> ka 01 ff\r
    <<< a 01 OK01x

Home Assistant had sent a perfectly valid power query.

The LG CX had returned a perfectly valid acknowledgement.

ESPHome had received that acknowledgement.

My phone simultaneously displayed:

> **Connection failed**
> 
> Home Assistant could not communicate with the LG TV over the serial port.

Excuse me?

I could literally see the television communicating with Home Assistant while Home Assistant told me it couldn't communicate with the television.

At this point there was very little hardware left to blame.

Then we noticed `dummy_receiver: true`.

That option had been useful while debugging UART reception, but now I had a real UART consumer: `serial_proxy`.

So I removed the debugging receiver and reduced the ESPHome configuration to the boring version it was supposed to be:
    
    
    uart:
      - id: lg_tv_uart
        tx_pin: GPIO17
        rx_pin: GPIO16
        baud_rate: 9600
        data_bits: 8
        parity: NONE
        stop_bits: 1
    
    serial_proxy:
      - id: lg_tv_serial
        uart_id: lg_tv_uart
        name: "LG CX RS232"
        port_type: RS232

Flashed it.

Opened Home Assistant.

Added **LG TV via Serial**.

Selected:
    
    
    LG CX RS232

Set ID:
    
    
    1

Pressed **Submit**.

And instead of the troubleshooting screen, Home Assistant asked me to name the device and assign it to a room.

I genuinely couldn't believe it.

**The debugging configuration I had added to figure out why the integration wasn't working was preventing the integration from working.**

That is such a perfect ending to an open-source hardware project that I almost can't be mad about it.

Almost.

### The Result

I now have this in Home Assistant:
    
    
    LG TV via Serial
    1 device

The device appears as a normal Home Assistant media player.

It reports its power state.

It reports volume.

I can control the television through an ESP32 connected to a MAX3232 connected to a 35-year-old serial standard connected to a 2020 OLED television.

And the television itself has **no network connection whatsoever**.

That's exactly what I wanted.

### And Now I Have Three Ways to Control One TV

The ridiculous part is that RS-232 hasn't replaced my existing local control systems.

I now have:
    
    
                        ┌── Infrared
                        │
    Home Assistant ─────┼── HDMI-CEC
                        │
                        └── RS-232

Infrared gives me essentially the complete physical remote.

HDMI-CEC provides power control and has been an excellent power-state sensor.

RS-232 gives me direct, bidirectional communication with the television itself.

Eventually I'll decide which technology should handle which commands. Some of the CEC functionality may become redundant now that I have serial telemetry. Other parts may stay simply because having an independent state source is useful.

I'm in no hurry.

The fun part now is discovering how much of LG's external-control command set the CX actually implements.

There are commands for power, volume, mute, input, brightness, contrast, colour, tint, sharpness, colour temperature, OSD behaviour, remote-control locking, key presses, and quite a few model-dependent features.

A few days ago I couldn't get the television to return a single byte.

Now I'm making ESPHome buttons just to poke commands at it and see what happens.

### What I'd Do Differently

If I were building this again tomorrow, my troubleshooting sequence would be dramatically shorter.

I'd continuity-test the DB9-to-3.5 mm cable before connecting it. I'd verify the actual DB9 pin numbering instead of relying on orientation in my head. I'd perform an RS-232-side loopback immediately. I'd measure the MAX3232 output to verify proper bipolar signalling. I'd enable `RS-232C Control` in InStart and confirm 9600 baud.

And, critically, once I installed `serial_proxy`, I would **not leave `dummy_receiver` attached to that UART**.

That one would have saved me a particularly confusing final hour.

But I also understand RS-232 much better now than I would have if everything had worked on the first attempt.

I learned why crossover wiring matters.

I learned not to blindly trust TX/RX labels.

I learned how easily DB9 numbering can fool you.

I learned that two cables with identical connectors can have meaningfully different wiring.

I learned how useful a simple continuity test is.

I learned that the CX really does implement LG's documented external-control protocol.

And I learned, once again, that the "open-source tax" is real.

Sometimes you save money by building something yourself.

Sometimes you pay the difference in troubleshooting.

### Number 6

When I started this project, Home Assistant's analytics showed only five active installations of LG TV via Serial.

The integration's documentation listed only one tested television.

I thought it would be funny if I could get my CX working and become number six.

For quite a while, that looked increasingly unlikely.

Then I saw:
    
    
    <<< 61 20 30 30 20 4F 4B 30 31 78

Then:
    
    
    a 01 OK01x

Then Home Assistant finally displayed:
    
    
    LG TV
    On

So, assuming the analytics eventually count me:

**I am Number 6.**

And my LG CX still isn't getting Internet access.



{{< buttons-list >}}