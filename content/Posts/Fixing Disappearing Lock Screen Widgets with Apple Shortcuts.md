---
title: "Fixing Disappearing Lock Screen Widgets with Apple Shortcuts"
date: 2026-11-03
draft: false
tags: ["Shortcuts", "Simple Automation"]
summary: "An annoying iOS bug keeps making my Lock Screen widgets disappear after app updates. Rather than manually opening each application, I built a simple Apple Shortcut that restores them all."
---

One of the things I appreciate most about Apple Shortcuts is its ability to solve small, irritating problems that would otherwise require several repetitive steps.

Not every automation needs to be complicated. Sometimes the most useful Shortcuts are the ones that do something remarkably simple, particularly when that simplicity makes an everyday annoyance disappear.

Recently, I found myself dealing with a peculiar problem involving widgets on my iPhone's Lock Screen.

Whenever I update an application that provides one of my Lock Screen widgets, the corresponding widget occasionally disappears. The space it occupies remains, but the widget itself becomes an empty circle.

It's a minor inconvenience, but an irritating one nonetheless.

Fortunately, I discovered that fixing it is surprisingly straightforward: **open the application associated with the missing widget.**

That's it.

No restarting the iPhone, removing widgets, or digging through settings. Simply launching the application restores its widget.

Once I realized this, the obvious next step was to automate the process.

### The Problem with Disappearing Widgets

I've grown accustomed to having a handful of useful widgets available directly from my iPhone's Lock Screen.

Among them are widgets provided by Google, Google Maps, Drafts, and Fantastical.

These aren't particularly elaborate additions to my Lock Screen, but they provide convenient access to applications and functionality I use regularly.

Unfortunately, I've encountered a recurring issue where updating one of these applications causes its Lock Screen widget to disappear.

The widget doesn't necessarily get removed from the Lock Screen configuration. Instead, it becomes a blank placeholder where the widget should be.

The first time this happens, you might reasonably assume that something has gone wrong with the widget itself.

However, after encountering the problem repeatedly, I noticed something interesting.

Opening the affected application immediately restored its widget.

I don't know precisely what causes this behaviour. It may have something to do with how iOS handles widget extensions following application updates, but I haven't investigated the underlying mechanism.

What I do know is that launching the application fixes the problem reliably.

And if there's one thing Apple Shortcuts is particularly good at, it's automating a series of actions that you already know will work.

### Building a Shortcut to Reset My Widgets

My solution is a Shortcut appropriately named **Reset Widgets**.

Despite the name, the Shortcut doesn't actually interact with any widgets.

Instead, it opens each of the applications responsible for the widgets on my Lock Screen.

The entire Shortcut consists of four actions:

1. Open Google

2. Open Google Maps

3. Open Drafts

4. Open Fantastical

That's the entire automation.

When I run it, Shortcuts launches each application in succession, allowing iOS to do whatever it needs to restore the associated widgets.

There are no complicated conditions, scripts, third-party utilities, or special permissions involved.

It's simply four Open App actions.

And it works every single time.

### Why Opening the Applications Works

The interesting thing about this workaround is that it doesn't involve explicitly asking iOS to refresh anything.

Apple provides developers with WidgetKit, a framework for creating and updating widgets. Applications can request timeline reloads through WidgetKit, but Shortcuts doesn't expose a general-purpose action for forcing another application's widgets to reload.

At least, not directly.

In my case, launching the application appears to be enough to get its widgets working again.

It's possible that opening the updated application allows it to complete some initialization or refresh information required by its widget extension.

However, that's speculation rather than a confirmed explanation.

The important distinction is that **my Shortcut isn't directly resetting WidgetKit or reloading widget timelines.**

It's automating the workaround I've found to be reliable.

I also wouldn't assume that this approach fixes every possible issue involving missing widgets. A widget that has been removed from the Lock Screen entirely, for example, is a different problem from one that temporarily displays as an empty placeholder.

But for the specific behaviour I've been encountering after application updates, opening the associated applications has been sufficient.

### A Small Automation That Eliminates an Annoyance

What I particularly like about this Shortcut is how little effort it requires.

Before creating it, fixing the problem meant manually opening each affected application whenever its widget disappeared.

That's hardly a significant amount of work, but it's repetitive, unnecessary, and easy to forget about until the next time I look at my Lock Screen.

Now, whenever I notice a missing widget, I run Reset Widgets and let Shortcuts handle the rest.

There's something amusing about solving an iOS widget problem without using a single widget-related action.

The Shortcut doesn't know which widgets are missing. It doesn't check whether any applications have recently been updated. It doesn't even attempt to determine whether a reset is necessary.

It just opens four applications.

In a more elaborate automation, I might have tried to detect the affected application or introduce some conditional logic.

But why?

The existing approach works reliably, takes very little time, and requires almost no maintenance.

Adding complexity wouldn't necessarily make it better.

### The Value of Simple Shortcuts

I've written before about using Apple Shortcuts to eliminate repetitive tasks, and this is another example of why I find the application so useful.

It's tempting to think that automation needs to involve elaborate workflows, APIs, scripting, or integrations between multiple services.

Sometimes those things are necessary.

But often, the most useful automation is simply a sequence of actions that you no longer want to perform manually.

In this case, I didn't need to understand the inner workings of WidgetKit or find some obscure method of forcing iOS to refresh its widgets.

I just needed to recognize that opening an application solved the problem and then automate that behaviour.

The result is a Shortcut that takes only a few moments to build and solves an annoyance that I've encountered repeatedly.

Would I prefer Apple to fix whatever is causing my widgets to disappear in the first place?

Absolutely.

Until then, I've got a four-action workaround that works every time.

And frankly, that's good enough for me.

{{< appcard 
    url="https://www.icloud.com/shortcuts/5ba00c3dad3d4a438af44eba74b62d9d" 
    name="Reset Widgets" 
    icon="/Shortcuts Icons/Reset Widgets Icon.jpg" 
>}}


{{< buttons-list >}}