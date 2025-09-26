---
title: "A Raspberry Pi Stream Deck Server controlled by ESPHome"
date: 2025-09-15
draft: false
tags: ["Home Assistant", "ESPHome", "Stream Deck", "Raspberry Pi"]
summary: "I built a Raspberry Pi Stream Deck server with ESPHome power control, letting me 
turn it on, reboot, shut down, and monitor its state from Home Assistant."
---

I’ve turned one of my Raspberry Pi 4s into a dedicated Stream Deck hub. It’s hooked up to 
a 32-button Stream Deck that controls devices and automations in Home Assistant, which runs 
on a separate machine. The Pi’s only job is to sit there, listen, and push out commands — 
but if it ever hangs or I need to reboot it, I wanted a way to manage it properly without 
pulling cables.

That’s where the ESP32 comes in. I flashed it with ESPHome and wired it straight into the 
Pi’s GPIO pins so I can treat the whole setup like a real smart-home appliance: I can power 
it on, shut it down safely, reboot it, and always know its current state inside Home Assistant.

⸻

### How I Wired It

The wiring is pretty simple. Raspberry Pi GPIO14 goes into ESP32 GPIO27, which gives me 
feedback about whether the Pi is on or off. The Pi’s RUN pins are connected to ESP32 GPIO13, 
so I can pulse them to power it on. For shutdown and reboot, I used GPIO26 and GPIO13 on the 
Pi, wired to ESP32 pins that trigger those actions.

This way, the ESP32 can send commands to the Pi, and the Pi can talk back about its state.

⸻

### My ESPHome Config

On the ESP32, I wrote an ESPHome config with a few pieces:

- A template switch that acts as the main power control. It checks the binary sensor to 
see if the Pi is already on before trying to pulse the RUN pins.
- A shutdown switch that pulls Pi GPIO26 high, which my shutdown script listens for.
- A reboot button that does the same thing with GPIO13 for rebooting.
- A binary sensor tied to GPIO14 that tells me if the Pi is running or not.

Here’s the core YAML I’m running:
```YAML
switch:
  - platform: template
    name: "Raspberry Pi Switch"
    id: raspberry_pi_switch
    lambda: |-
      return id(raspberry_pi_power_state).state;
    turn_on_action:
      - if:
          condition:
            lambda: 'return !id(raspberry_pi_power_state).state;'
          then:
            - switch.turn_on: turn_on_pi
    turn_off_action:
      - switch.turn_on: turn_off_pi

  - platform: gpio
    name: "Turn On Raspberry Pi"
    pin: GPIO13
    inverted: true
    id: turn_on_pi
    internal: true
    on_turn_on:
      - delay: 500ms
      - switch.turn_off: turn_on_pi

  - platform: gpio
    name: "Shutdown Raspberry Pi"
    pin: GPIO12
    id: turn_off_pi
    internal: true
    on_turn_on:
      - delay: 500ms
      - switch.turn_off: turn_off_pi

  - platform: gpio
    name: "Reboot Raspberry Pi"
    pin: GPIO14
    id: reboot_pi
    internal: true
    on_turn_on:
      - delay: 500ms
      - switch.turn_off: reboot_pi

binary_sensor:
  - platform: gpio
    pin: GPIO27
    name: "Raspberry Pi Power State"
    id: raspberry_pi_power_state
    device_class: power
    filters:
      - delayed_on_off: 800ms
```

⸻

### The Pi Side

On the Raspberry Pi, I wrote two tiny Python scripts. One listens on GPIO26 and calls shutdown 
now, the other listens on GPIO13 and calls reboot. They just loop forever in the background, 
waiting for a HIGH signal from the ESP32:

```Python
# shutdown_monitor.py
import RPi.GPIO as GPIO, time, os
GPIO.setmode(GPIO.BCM)
GPIO.setup(26, GPIO.IN, pull_up_down=GPIO.PUD_DOWN)

while True:
    if GPIO.input(26) == GPIO.HIGH:
        os.system("sudo shutdown now")
    time.sleep(0.5)

# reboot_pi.py
import RPi.GPIO as GPIO, time, os
GPIO.setmode(GPIO.BCM)
GPIO.setup(13, GPIO.IN, pull_up_down=GPIO.PUD_DOWN)

while True:
    if GPIO.input(13) == GPIO.HIGH:
        os.system("sudo reboot")
    time.sleep(0.5)
```

I wrapped both of these in simple systemd services so they start automatically on boot and 
restart if they crash. That way, the Pi is always listening for signals from the ESP32.

⸻

### What It Feels Like in Practice

Now, inside Home Assistant, the Pi just shows up like any other smart switch. If it’s off, 
flipping the switch pulses the RUN pins and boots it up. If it’s on, flipping the switch 
triggers the shutdown script and powers it down cleanly. There’s also a reboot button when I 
need it. And the binary sensor tied to GPIO14 means I always know its current state.

The best part is how natural it feels. The Pi and Stream Deck live on my desk like a little 
smart-home console, but behind the scenes it’s running with the same polish you’d expect from 
a dedicated appliance. Everything is local, reliable, and integrated with the rest of my Home 
Assistant setup.

It’s one of those projects where the wiring is simple, the software is lightweight, but the 
result makes my whole setup feel more “finished.”

### Apps and Tools Used for this Project

- [Stream Deck HACS Integration](https://github.com/Patrick762/hassio-streamdeck)
- [Home Assistant](https://www.home-assistant.io/)
- [ESPHome - Smart Home Made Simple](https://esphome.io/)


{{< buymeacoffee >}}

{{< rss-button >}}

{{< buttondown >}}