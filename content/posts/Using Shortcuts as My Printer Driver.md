 ---
title: "Using Shortcuts as My Printer Driver"
date: 2026-10-26
draft: false
tags: ["Shortcuts", "ESPHome", "Home Assistant", "Automation"]
summary: "How I turned Apple Shortcuts into a driverless printing system for my homemade ESPHome receipt printer, making it easy to print to-do lists, garbage schedules, random jokes, and just about anything else."
---

A few days ago, I finished building a small thermal receipt printer using an ESP32, ESPHome, and Home Assistant. The entire project consists of a relatively inexpensive 58mm thermal printer, a microcontroller, and an old Sony PlayStation 2 power supply that my dad found at a thrift store.

It's not particularly sophisticated hardware. In fact, that's part of what makes it so interesting.

I've already written about the hardware side of the project in [I Have the Receipts](https://blog.aidanmaurinjones.com/posts/i-have-the-receipts/), but since getting everything working, I've been spending considerably more time exploring what I can actually do with it.

As it turns out, the answer is quite a lot.

The most interesting part of this project isn't necessarily the printer itself. It's how easily I've been able to incorporate it into my existing workflows using Apple's Shortcuts app.

What started as a fun little electronics project has effectively become a programmable printing destination for almost anything I can retrieve, manipulate, or generate with Shortcuts.

And I think that's pretty neat.

### Turning a Receipt Printer into a Shortcuts Action

One of my favourite things about Apple's Shortcuts app is its ability to connect otherwise unrelated applications and services.

An application doesn't necessarily need to support another application directly. As long as there's a way to exchange information between them, Shortcuts can often bridge the gap.

My receipt printer is a particularly good example of this.

The printer itself is connected to an ESP32 running ESPHome, which exposes its functionality to Home Assistant. From there, I can communicate with the printer using Home Assistant's REST API.

In practical terms, this means I can send text to Home Assistant using an HTTP request, then instruct the printer to print it.

Shortcuts already includes a _Get Contents of URL_ action capable of making HTTP requests, so there isn't much else required.

Rather than repeatedly configuring those requests in every shortcut, I created a reusable shortcut called **Print Markdown to Receipt Printer**.

The shortcut accepts text as input, retrieves my Home Assistant API credentials and endpoint, and makes two requests:

1. It sends the supplied text to a Home Assistant text entity using the `text.set_value` service.

2. It triggers the printer's print button using the `button.press` service.

That's it.

The shortcut doesn't need to know anything about UART, ESPHome, the printer's command set, or the physical hardware. All of those details are handled elsewhere.

It simply accepts text and prints it.

More importantly, because the shortcut accepts input from other shortcuts, I can treat it like any other action in Apple's automation system.

I can retrieve information from an application, format it as Markdown, and pass it directly to my printing shortcut.

The entire process takes approximately two seconds from running the shortcut to having a completed receipt in my hand.

For something assembled from about $35 worth of hardware, that's surprisingly satisfying.

### Printing My To-Do List from Todoist

The first practical use case I experimented with was printing my daily to-do list.

I use Todoist to manage tasks, and although its interface is perfectly capable of showing me what I need to do, sometimes having a physical checklist is useful.

There's something appealing about being able to cross an item off a piece of paper rather than checking another box on a screen.

Fortunately, Todoist provides an API that makes retrieving tasks relatively straightforward.

I already have a collection of reusable shortcuts for interacting with different APIs, including one that retrieves the appropriate API key. Using those existing building blocks, I created a shortcut called **Print Today's To-Do List to Receipt Printer**.

The shortcut begins by retrieving my Todoist API key and passing a filter to another shortcut responsible for fetching tasks.

My filter is:

`(overdue | Today) & !@work`

This retrieves tasks that are either overdue or due today, excluding anything tagged with `@work`.

The returned data is a collection of dictionaries containing information about each task.

From there, Shortcuts iterates through the results, extracts the task content, and formats each item as a Markdown checklist entry:
    
    
    ### Today's To-Do List
    
    - [ ] Buy groceries
    - [ ] Clean desk
    - [ ] Finish ESPHome project

Finally, the formatted text is passed to my printing shortcut.

A moment later, I have a physical copy of my to-do list.

What's particularly nice about this arrangement is that the printer doesn't require any special Todoist integration. It doesn't even know what Todoist is.

The shortcut handles retrieving and formatting the information, while the printer simply prints whatever it receives.

That separation is what makes the entire system so flexible.

### Printing Toronto's Garbage Collection Schedule

My next experiment was a little more involved.

The City of Toronto publishes its garbage collection schedule as a CSV file, which is exactly the sort of thing Shortcuts is surprisingly good at working with.

I wanted to be able to run a shortcut and print the garbage collection information for the current day.

The shortcut starts by determining the appropriate collection date. Because the collection schedule I'm interested in operates on Tuesdays, it checks whether today is Tuesday and otherwise calculates the relevant upcoming Tuesday.

It then downloads the city's collection calendar from:

`https://www.toronto.ca/ext/swms/collection_calendar.csv`

Once the CSV has been retrieved, Shortcuts converts it to text, splits it into individual lines, and filters the results to find the matching date and collection schedule.

The next part is where things get interesting.

The CSV uses abbreviated values to represent different collection types. Rather than printing those values directly, I use a dictionary to translate them into readable descriptions.

For example, the dictionary includes Green Bin, Garbage, Recycling, Yard Waste, and Christmas Tree.

The shortcut extracts the relevant fields, looks up their descriptions, and combines them into a human-readable sentence.

The result is formatted with a heading:
    
    
    ### Garbage Pickup Today
    
    Green Bin, Garbage and Recycling

And, once again, the finished text is handed off to **Print Markdown to Receipt Printer**.

There's no dedicated application involved, no printer driver, and no special integration with the City of Toronto.

It's simply a publicly accessible CSV file, some text processing, and a reusable shortcut.

I particularly like this example because it demonstrates how Shortcuts can transform fairly uninteresting structured data into something immediately useful.

A municipal CSV file isn't exactly exciting. Being able to turn it into a physical reminder with a single click is considerably more appealing.

### Printing a Random Joke from Drafts

Not every automation needs to solve an important problem.

Sometimes it's perfectly acceptable for a project to exist simply because it's funny.

Over the years, I've accumulated a collection of 371 jokes in Drafts. They're mostly dad jokes, and until recently, they didn't have a particularly interesting purpose beyond occasionally making somebody groan.

Naturally, I decided they needed to be printed.

My **Print Random Joke to Receipt Printer** shortcut is probably the simplest of the bunch.

It retrieves my Jokes workspace from Drafts, gets the drafts contained within that workspace, and selects a random item.

The selected joke is then formatted as Markdown:
    
    
    ### Today's Random Joke
    
    Why don't scientists trust atoms?
    
    Because they make up everything.

Finally, the result is sent to the printer.

That's the entire shortcut.

What I like about this one is that it demonstrates how little effort is required to integrate an existing collection of information with the printer.

I didn't need to export my jokes, reorganize them into another format, or maintain a separate database.

They're already stored in Drafts, and Drafts already supports Shortcuts.

All I needed to do was connect the pieces.

Is having a dedicated button to print random dad jokes necessary?

Absolutely not.

Am I delighted that I have one?

Absolutely.

### The Real Advantage Is Reusability

After building these shortcuts, I realized that the most important decision I made was separating the printing functionality from the shortcuts that generate the content.

Each of my examples retrieves information from a completely different source.

Todoist uses a web API. Toronto's garbage collection schedule comes from a CSV file. My jokes are stored locally in Drafts.

Yet all three shortcuts end in exactly the same way.

They construct some Markdown and pass it to **Print Markdown to Receipt Printer**.

This is one of the things I appreciate most about Shortcuts: the ability to build small, reusable components that can be combined into increasingly sophisticated workflows.

I don't need to think about the printer's underlying implementation every time I want to print something.

Instead, I can focus entirely on the information I want to retrieve and how I want it presented.

That opens the door to all sorts of possibilities.

I could print weather forecasts, calendar agendas, shopping lists, Home Assistant sensor readings, or information retrieved from practically any service with an accessible API.

I could also incorporate printing into existing automations rather than running dedicated printing shortcuts.

For example, a shortcut that prepares information for the following day could optionally print a summary. An automation that retrieves information from a website could produce a physical reference copy. Even a simple text selection could potentially become a receipt.

The printer is effectively just another output destination.

And because Shortcuts is available across Apple's platforms, the same underlying approach can be reused from a Mac, iPhone, or iPad, provided the device can reach Home Assistant.

### There's Something Refreshing About Simple Hardware

Modern printers are often unnecessarily complicated devices.

They require drivers, proprietary applications, manufacturer accounts, expensive consumables, or some combination of the above.

My receipt printer has none of those requirements.

It's a small thermal printer connected to an ESP32. It communicates over UART, uses inexpensive 58mm receipt paper, and doesn't require ink.

It doesn't need an internet connection or a manufacturer's cloud service.

And because Home Assistant exposes the printer's functionality through an API, I can interact with it using practically anything capable of making an HTTP request.

In that sense, it's effectively a driverless network printer, albeit one designed specifically around my own requirements rather than traditional operating-system printing protocols.

There's a certain elegance to that.

I don't need to install anything on my Mac to make it work. I don't need to select a printer from a print dialog. I don't even need to generate a document.

I just send it text.

The simplicity of that interface is arguably more valuable than the hardware itself.

Of course, a 58mm thermal receipt printer isn't going to replace a conventional printer. It's monochrome, has a very narrow print area, and is best suited to relatively short pieces of information.

But those limitations are also part of its charm.

It encourages me to think about what information is actually worth printing and how to present it concisely.

A receipt-sized to-do list makes considerably more sense than printing an entire document.

And for the kinds of things I'm experimenting with, the format is almost perfect.

### A Surprisingly Useful Little Project

When I originally started working on this printer, I didn't have a particularly compelling reason to own one.

I wanted to see whether I could control a thermal printer using ESPHome, and the hardware was inexpensive enough to make the experiment worthwhile.

Once I got it working, I was left with a slightly ridiculous question:

_Now that I can print anything I want, what exactly do I want to print?_

That's what led me to start experimenting with Shortcuts.

And the more I experiment, the more I appreciate how useful the combination can be.

The interesting part isn't that I can print a to-do list or a garbage collection schedule. Those are relatively mundane tasks.

It's that adding an entirely new physical output device to my existing automation workflows required surprisingly little work.

I didn't need to write a macOS printer driver, build a dedicated application, or fundamentally change how I manage information.

I just created a shortcut that accepts text.

Everything else can build on top of it.

That's the kind of automation I find most satisfying: taking something that already works, connecting it to something else, and discovering that the result is more useful than either component on its own.

I'm still not entirely sure where this printer will permanently live or how frequently I'll end up using it.

But I've already gone from having no particular reason to own a receipt printer to having several shortcuts specifically designed around it.

And I suspect I'll find quite a few more.

After all, I've still got 371 dad jokes to get through.


{{< buttons-list >}}