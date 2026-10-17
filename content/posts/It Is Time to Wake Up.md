---
title: "It Is Time to Wake Up"
date: 2026-10-17
draft: false
tags: ["Home Assistant", "Google Home", "Apple Home", "Automation"]
summary: "How I combined Home Assistant, Google Home's Script Editor, and Apple Home to automate my morning routine, from setting and cancelling alarms to turning on the lights, without having to lift a finger."
---

_How I used Home Assistant, Google Home, and Apple Home to automate one of the most annoying parts of my morning routine._

I am not a morning person.

Unfortunately, that is no ones problem except my own.

For years, I've relied on a rather excessive collection of alarms to get myself out of bed in the morning. Not one alarm. Not two alarms. An entire series of alarms, spaced fifteen minutes apart, designed to make absolutely certain that I eventually acknowledge the unfortunate reality that I have to go to work.

It's not particularly elegant, but it works.

What doesn't work quite as well is having to manage those alarms manually. My work schedule varies depending on the day, and my wake-up routine needs to accommodate that. On weekdays, I need to be awake earlier than I do on weekends. On days when I'm not working, I'd rather not have my alarm clock screaming at me before sunrise.

I've spent a considerable amount of time automating various aspects of my home with [Home Assistant](https://www.home-assistant.io/). My lights, curtains, television, chargers, and countless other devices are all integrated into a system that largely operates without requiring my attention.

And yet, until recently, I was still manually setting my alarms.

That seemed like something worth fixing.

## The Problem with Smart Alarm Clocks

For something as seemingly straightforward as an alarm clock, the smart home industry has done a remarkably poor job of making them genuinely useful.

There are plenty of smart speakers that can set alarms. Lenovo Smart Alarm Clocks, for example, have supported voice-controlled alarms for years. You can ask Google to wake you up at a particular time, create multiple alarms, or cancel them entirely.

That's all well and good, but there's a catch.

Google doesn't provide a straightforward way for Home Assistant to manage the alarms stored on a Nest speaker.

I can control my lights, television, and curtains from Home Assistant. I can monitor the battery level of a wireless keypad and automatically charge it when necessary. I can even control my television using three entirely different communication protocols.

But asking Google to set an alarm?

Apparently, that's where things get complicated.

Fortunately, Google Home has a feature that makes this possible, albeit somewhat indirectly.

It's called the **Google Home Script Editor**, and it turns out to be the missing piece of the puzzle.

## Making Google Home Talk to Home Assistant

My smart home is built around Home Assistant, but I also use Apple Home and Google Home when they offer functionality that Home Assistant doesn't provide directly.

Rather than treating these platforms as competing ecosystems, I've found it much more useful to make them work together.

For this particular project, Home Assistant handles the logic, Google Home manages the alarms, and Apple Home contributes a separate automation that I'll get to shortly.

The first step was creating three helpers in Home Assistant.

These are simple input booleans, which are essentially virtual switches that can be turned on or off.

I created three:

- **Weekday Alarms** -- `input_boolean.weekday_alarms`
- **Weekend Alarms** -- `input_boolean.weekend_alarms`
- **Cancel My Alarms** -- `input_boolean.cancel_my_alarms`

Each helper serves a single purpose.

When Home Assistant turns on the Weekday Alarms helper, Google Home sets my weekday alarms. When it turns on Weekend Alarms, Google sets a slightly later collection of alarms. And when Cancel My Alarms is activated, Google cancels the alarms.

The clever part is that these helpers are exposed to Google Home as devices.

From Google's perspective, they're ordinary switches. It doesn't need to know that they exist solely to trigger an automation.

This is where the Script Editor comes in.

### Setting My Weekday Alarms

Google Home's Script Editor allows you to write automations in YAML, which should be immediately familiar to anyone who has spent much time working with Home Assistant.

My weekday alarm automation looks like this:
    
    
    metadata:
      name: Set weekday alarms
      description: Send the alarm command when Weekday Alarms turns on.
    
    automations:
      - starters:
          - type: device.state.OnOff
            device: Weekday Alarms - Aidan's Room
            state: on
            is: true
    
        actions:
          - type: assistant.command.OkGoogle
            devices:
              - Aidan's Room speaker - Aidan's Room
            okGoogle: "Set alarm every 15 minutes from 4:30 AM to 6:30 AM"

The automation watches the virtual switch exposed by Home Assistant.

When the switch turns on, Google Home sends a command to the Google Assistant associated with my Lenovo Smart Alarm Clock.

The command is exactly what I would say if I were speaking to Google myself:

_Set alarm every 15 minutes from 4:30 AM to 6:30 AM._

And just like that, Google creates my alarms.

Nine of them, to be precise.

Yes, nine.

I told you I wasn't a morning person.

What's particularly useful about this approach is that Google Assistant already understands the command. I've used this exact phrasing myself countless times, so I'm not relying on an unfamiliar or untested way of creating alarms.

I'm simply automating something I already know works.

The speaker also announces when it has finished setting the alarms, providing audible confirmation that the command was processed.

### Weekends Are a Little Different

My weekend automation is nearly identical, with one important difference.
    
    
    metadata:
      name: Set weekend alarms
      description: Send the alarm command when Weekend Alarms turns on.
    
    automations:
      - starters:
          - type: device.state.OnOff
            device: Weekend Alarms - Aidan's Room
            state: on
            is: true
    
        actions:
          - type: assistant.command.OkGoogle
            devices:
              - Aidan's Room speaker - Aidan's Room
            okGoogle: "Set alarm every 15 minutes from 5:30 AM to 7:30 AM"

On weekends, my alarms begin at 5:30 AM rather than 4:30 AM.

That extra hour of sleep is appreciated.

The important distinction here is that these aren't recurring weekday and weekend alarms configured directly on the speaker.

Instead, Home Assistant decides which collection of alarms I need based on my work schedule, and Google creates them for that particular morning.

That means I don't have to maintain separate sets of permanently enabled alarms or remember to disable them when my schedule changes.

Google simply does what Home Assistant tells it to do.

### Cancelling the Alarms

Of course, creating alarms is only half the problem.

Once I'm awake and getting ready for work, I don't particularly want my Lenovo Smart Alarm Clock continuing to announce that it's time to wake up every fifteen minutes.

So I created a third automation.
    
    
    metadata:
      name: Cancel my alarms
      description: Cancel all alarms when Cancel My Alarms turns on.
    
    automations:
      - starters:
          - type: device.state.OnOff
            device: Cancel My Alarms - Aidan's Room
            state: on
            is: true
    
        actions:
          - type: assistant.command.OkGoogle
            devices:
              - Aidan's Room speaker - Aidan's Room
            okGoogle: "Cancel all of my alarms"

Again, nothing particularly complicated.

Home Assistant activates a virtual switch, Google receives the command, and my alarms are cancelled.

The result is a surprisingly flexible system.

Home Assistant doesn't need direct access to Google's alarm functionality. It simply needs a way to ask Google to perform an action that Google already supports.

It's a workaround, certainly, but a rather effective one.

## Putting Home Assistant in Charge

With the Google Home automations configured, I needed to connect everything to my work schedule.

Fortunately, I already had a Home Assistant sensor that determines whether I'm working.

It's called `sensor.am_i_working`, and it reports one of two states: `Working` or `Not Working`.

I also have a separate sensor, `sensor.weekend`, that identifies whether the current day is a weekday or weekend.

Together, these sensors provide everything Home Assistant needs to determine which alarms should be set.

My primary automation is called **Set My Alarms**.

It triggers whenever my work-status sensor changes from `Not Working` to `Working`.

Once triggered, the automation performs two tasks.

First, it checks whether my iPad mini charger is turned off.

If it is, Home Assistant turns the charger on for ten seconds before turning it off again.

This briefly powers my iPad alarm clock setup, which is integrated with Apple Shortcuts.

I already had this part of the system working before introducing Google Home, and I saw no reason to abandon it.

After handling the iPad, Home Assistant checks whether the upcoming workday falls on a weekday or weekend.

If it's a weekday, Home Assistant turns on the Weekday Alarms helper.

If it's a weekend, it turns on the Weekend Alarms helper.

The corresponding Google Home automation then executes.

Thirty seconds later, Home Assistant turns the helper off again, leaving it ready for the next time it's needed.

That last step is important.

Google Home's automation is triggered by the switch changing to its on state. Leaving the switch on permanently would prevent the same transition from occurring the next time Home Assistant needed to set my alarms.

By automatically resetting the helper, I can use it repeatedly without ever having to interact with it myself.

And because the entire process is triggered by my work schedule, I don't even need to remember to initiate it.

That's the whole point.

## Automatically Cancelling My Alarms

Setting alarms automatically is convenient, but I wanted the entire process to manage itself.

That includes cancelling them.

For this, I created another Home Assistant automation called **Cancel My Alarms**.

It runs at two different times depending on the day:

| Day | Cancellation Time | 
| ---- | ----  |
| Monday--Friday | 8:00 AM | 
| Saturday--Sunday | 9:00 AM | 

There's one additional condition: Home Assistant must confirm that I'm working.

If I'm not working, the automation does nothing.

If I am working, Home Assistant activates the Cancel My Alarms helper, waits thirty seconds, and then turns it off again.

It also resets the weekday and weekend alarm helpers, ensuring everything is ready for the next cycle.

The Google Home automation receives the cancellation request and tells my Lenovo Smart Alarm Clock to cancel all its alarms.

In other words, the system now handles both ends of the process.

It creates the alarms when they're needed and cancels them when they're no longer useful.

I don't need to open an app, speak to Google, or remember which alarms are currently enabled.

There is one limitation worth acknowledging: the cancellation command applies to all alarms on that speaker, not just those created by this automation. That's fine for my setup, but it might be less desirable for someone who also uses their speaker for unrelated alarms.

## A Little Help from Apple Home

There is one more component to this setup, and it involves Apple Home.

I've been using Apple Home alongside Home Assistant for years, primarily because I appreciate its interface and how well it integrates with my Apple devices.

Although Home Assistant is responsible for nearly all the actual logic in my smart home, Apple Home still has a few useful tricks.

One of those is presence detection.

I have an Apple Home automation configured to turn off my lights whenever the last person leaves home.

This isn't directly responsible for setting my alarms, but it's another example of how I use the different smart home platforms together.

Home Assistant provides centralized control and complex automation logic. Google Home provides access to Google Assistant commands. Apple Home handles certain presence-based actions.

Each platform does what it's good at.

I'm not particularly interested in forcing everything into one ecosystem simply for the sake of doing so.

If Apple Home can reliably handle a particular task, I'll use Apple Home.

If Google Assistant can do something Home Assistant can't, I'll find a way to make them communicate.

And if Home Assistant can coordinate the entire process, even better.

## Waking Up Shouldn't Be Quite So Abrupt

There's one final piece of this project that doesn't involve Google Home at all.

My bedroom lighting.

I have two additional Home Assistant automations that turn on my TV lights at specific times, provided I'm working that day.

On weekdays, the lights turn on at **6:00 AM**.

On weekends, they turn on at **6:30 AM**.

Both automations check my work-status sensor and the weekday/weekend sensor before doing anything.

If I'm not working, the lights stay off.

This means that while my Lenovo Smart Alarm Clock is doing its best to convince me to get out of bed, Home Assistant is also turning on the lights.

It's not exactly a sophisticated sunrise simulation, but it does make the transition from sleeping to getting ready for work a little more deliberate.

And, importantly, it's another thing I no longer have to think about.

### The Beauty of a Virtual Switch

One of my favourite things about this project is how little specialized hardware it requires.

I didn't need to buy a new alarm clock.

I didn't need another ESP32.

I didn't need to replace my Lenovo Smart Alarm Clock or install some obscure third-party integration.

All I needed were three virtual switches and a handful of automations.

That's it.

The entire system works because Home Assistant can expose a virtual device to Google Home, and Google Home can use that device as the trigger for a Google Assistant command.

It's a simple idea with some surprisingly useful implications.

There are plenty of things Google Assistant can do through voice commands that aren't exposed through a conventional smart home integration.

The Script Editor provides a way to bridge that gap.

And once Home Assistant can trigger those commands, they become part of a much larger automation system.

For me, that means alarm management.

For someone else, it could mean something entirely different.

The underlying concept remains the same: **use a virtual device to turn an otherwise inaccessible voice command into an automatable action.**

It's not the same as having a proper alarm-management API. Home Assistant can't inspect the resulting alarms or independently confirm that every requested alarm was created.

But for my purposes, the approach is practical, and the speaker's audible confirmation is a useful indication that the command has been processed.

### The Best Automation Is the One You Forget About

I've built quite a few Home Assistant automations over the years.

Some are relatively simple, like automatically charging my Ring keypad when its battery drops below 20%.

Others are considerably more involved, such as my television control system, which uses infrared, HDMI-CEC, and RS-232 to control an LG OLED television without connecting it to the internet.

I enjoy those projects because they're interesting technical challenges.

But there's something particularly satisfying about an automation that solves an ordinary, everyday annoyance.

Setting my alarms isn't difficult.

It takes a few seconds to ask Google to create them.

Cancelling them isn't difficult either.

But those are still tasks I have to remember to perform, and they're tasks that serve absolutely no purpose beyond preparing for the following morning.

Now, Home Assistant can handle them.

When my work schedule indicates that I need to work, the system prepares my alarms. It selects the appropriate times, sends the commands to Google, and resets the virtual switches.

The following morning, my alarms go off, my lights turn on, and eventually the system cancels the remaining alarms.

All without requiring me to do anything.

That's the kind of automation I appreciate most.

Not because it's particularly complicated or technically impressive, but because it removes one more small responsibility from my day.

There are still a few things I'd like to improve. In particular, I'd love for Google to expose its alarm functionality through a proper API so Home Assistant could create, inspect, and cancel individual alarms directly.

Until that happens, the Script Editor provides a surprisingly capable alternative.

And while I'll continue keeping an eye on how reliably the entire system performs, I'm optimistic that I've finally reached the point where I won't need to manually set my alarms again.

Now, if only Home Assistant could convince me that getting out of bed at 4:30 in the morning is a good idea.

That might be asking a little too much.


{{< buttons-list >}}