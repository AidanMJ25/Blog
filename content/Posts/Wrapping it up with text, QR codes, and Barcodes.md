---
title: "Wrapping it up with text, QR codes, and Barcodes"
date: 2026-10-27
draft: false
tags: ["ESPHome", "Home Assistant", "Automation"]
summary: "My ESPHome receipt printer keeps getting smarter. I've added native QR code and barcode printing, automatic word wrapping, and new Home Assistant controls, making it even easier to print almost anything using Apple Shortcuts."
---

When I first started experimenting with a cheap thermal receipt printer and an ESP32, I wasn't entirely sure what I was going to do with it. I just thought it would be fun to have a receipt printer that I could control through Home Assistant and Apple Shortcuts.

As it turns out, I was right. Perhaps a little too right.

What started as a relatively simple project has quickly become one of my favourite things I've built with ESPHome. I've already used it to print dad jokes, experimented with sending content to it using Shortcuts, and built an [ESPHome external component](https://github.com/AidanMJ25/QR701-ESPHome-External-Component) to make the printer accessible from Home Assistant.

The best part is that the hardware hasn't changed. It's still the same inexpensive QR701 thermal printer, an ESP32, and an old Sony PlayStation 2 power supply that my dad found at a thrift store.

However, the software has become considerably more capable.

Over the past couple of days, I've added three particularly useful features to my ESPHome component: native QR-code printing, barcode printing, and automatic word wrapping. Individually, they're relatively small additions, but together they make the printer feel much more like a proper printing system rather than a fun little electronics experiment.

And, naturally, they give me even more excuses to print things I probably don't need to print.

## Printing QR Codes and Barcodes

One of the things I wanted to add to the component was the ability to print QR codes and barcodes directly.

This seemed like an obvious feature for a receipt printer. After all, we've all encountered receipts with QR codes for surveys, links, loyalty programs, and various other things.

What I hadn't fully appreciated when I started this project was just how much functionality is already built into these inexpensive thermal printers.

The QR701 communicates over UART and understands ESC/POS commands, a command system commonly used by receipt printers. Rather than generating a QR code as an image and transmitting all of its pixels, I can simply send the printer the data I want encoded and let its firmware handle the rest.

That's a pretty neat capability for something this cheap.

### Native QR-Code Printing

I've added a new `qr701.print_qr` action to the ESPHome component:
    
    
    - qr701.print_qr:
        id: receipt_printer
        text: "https://example.com"
        size: 5
        error_correction: M

The component uses the native ESC/POS `GS ( k` commands to configure and print the QR code.

It supports QR Model 2, adjustable module sizes from 1 to 16, and all four standard error-correction levels: L, M, Q, and H.

The QR code is automatically centred on the receipt, and the printer feeds the paper after printing.

What I particularly like about this implementation is that the ESP32 doesn't need to generate an image or maintain a large bitmap in memory. It just sends a relatively small sequence of commands and the QR-code data to the printer.

Of course, this functionality depends on the specific firmware installed on the QR701. Not every ESC/POS-compatible printer necessarily supports the same commands, so native QR printing will need to be tested on the actual hardware.

Still, being able to hand a URL to a $35 printer and have it produce a QR code is exactly the sort of thing that makes me love tinkering with electronics.

### Barcode Printing

I've also added a `qr701.print_barcode` action:
    
    
    - qr701.print_barcode:
        id: receipt_printer
        text: "123456789012"
        format: CODE128
        height: 80
        width: 2
        show_text: true

The component supports eight barcode formats:

- UPC-A and UPC-E
- EAN-13 and EAN-8
- Code 39
- Interleaved 2 of 5 (ITF)
- Codabar
- Code 93 and Code 128

Code 128 is the default, which makes sense for my purposes because it can encode a wide range of ordinary text.

I've also made the component automatically select Code Set B for normal Code 128 strings, while still allowing more advanced users to specify Code Sets A, B, or C manually.

Barcode height, width, and the human-readable text printed underneath can all be configured.

Like QR codes, barcodes are generated using the printer's native ESC/POS commands rather than rendering an image on the ESP32.

I don't currently have some elaborate barcode-based inventory system planned, but I love having the capability available.

Sometimes the entire point of a project is to make something possible and figure out what to do with it later.

## Making QR Codes Accessible Through Home Assistant

Adding the ESPHome actions was only half the fun.

One of the things I've particularly enjoyed about developing this component is finding ways to expose its functionality through Home Assistant without having to constantly edit and recompile ESPHome YAML.

To accomplish this, I've added several entities that are automatically created when the QR701 component is configured.

For QR codes, Home Assistant now gets a text entity for the data, a number entity for the size, a select entity for the error-correction level, and a button to print the result.

Barcodes get their own text entity and print button, using Code 128 with the default visual settings.

The workflow is wonderfully straightforward.

I can write a URL to the QR Data entity, optionally adjust the QR Size or QR Error Correction entities, and press the Print QR button.

That's it.

The printer receives the current values and prints the QR code.

There's no need to hardcode a URL in an ESPHome configuration or create a separate button for every possible QR code I might want to print.

An important detail is that the Print QR button reads the live size and error-correction settings. If I change either setting in Home Assistant, the next QR code uses those values automatically.

This makes the printer considerably more flexible, particularly when combined with Apple Shortcuts.

### Why This Matters for Shortcuts

I've previously written about how I've been using [Apple Shortcuts](https://support.apple.com/guide/shortcuts/welcome/ios) as a sort of driverless printing interface for this project.

Rather than installing a traditional printer driver, I can use Shortcuts to retrieve or generate content and send it to Home Assistant, which passes the data to the ESP32 and ultimately the printer.

With the new QR-code functionality, that same workflow can be extended to URLs.

For example, a Shortcut could accept a URL from the iOS or macOS Share Sheet, send it to the QR Data entity in Home Assistant, and press the Print QR button.

A couple of actions later, I have a physical QR code.

And because Shortcuts is available throughout Apple's operating systems, this functionality isn't tied to one particular application.

Safari, Drafts, Finder, or anything else capable of passing information to a Shortcut could potentially use the same printing system.

This is the part I find particularly exciting.

I'm not building a separate integration for every application I want to print from. I'm building a reusable interface that other applications and automations can call.

It's the same philosophy I've used for my blog publishing workflow: build one good Shortcut that handles the complicated part, then make it accessible from wherever I happen to be working.

## Finally, Automatic Word Wrapping

The other major improvement I've made is considerably less glamorous than QR codes, but arguably even more useful.

Automatic word wrapping.

Previously, printing longer text meant that I had to think about how it would fit on the receipt. The printer has a fixed printable width, and without proper wrapping, long lines could extend beyond that width or be broken in undesirable places.

That's not ideal when you're trying to print paragraphs, Markdown documents, or, most importantly, dad jokes.

So I added a wrapping engine directly to the component.

### Working Within 384 Dots

The QR701 has a printable width of 384 dots.

Using its standard 12-dot-wide Font A, that gives me 32 characters per line.

Markdown H1 headings are printed at double width, reducing their capacity to 16 characters per line. H2 and H3 headings use double-height text without increasing character width, so they retain the normal 32-character limit.

The component now understands these constraints and automatically wraps text accordingly.

For ordinary text, it tries to break lines at word boundaries instead of splitting words in the middle.

Explicit line breaks are preserved, and Windows-style CRLF line endings are handled as well.

If a single word or URL is too long to fit on one line, the component splits it into chunks that fit within the printable width.

The result is that I can send an entire paragraph to the printer without manually inserting line breaks every 32 characters.

That sounds like a small improvement, but it makes an enormous difference to how pleasant the printer is to use.

### Markdown Gets Smarter, Too

The more interesting challenge was making word wrapping work with Markdown.

My component already supports printing Markdown-formatted text, including headings, lists, quotes, links, and horizontal rules.

However, Markdown introduces an additional complication: the formatting characters aren't necessarily part of the visible printed text.

For example, the asterisks surrounding bold text shouldn't count toward the printed line width.

The wrapping engine now accounts for that.

It measures the visible content rather than blindly counting every character in the original Markdown.

It also understands that lists and blockquotes need space for their prefixes.

A list item, for example, uses a `- ` prefix, leaving 30 characters available for the content. When a list item wraps onto another line, the prefix is repeated.

Blockquotes receive similar treatment with their `| ` prefix.

Markdown links are kept together where possible, including links whose labels contain spaces.

Headings use their appropriate character limits, and the component resets the printer's formatting after each emitted line so styles don't accidentally carry over into subsequent text.

Horizontal rules also respect the normal printable width.

All of this means I can send a reasonably formatted Markdown document to the printer and let the component handle the layout.

I don't need to manually prepare a special receipt-friendly version of the text first.

That's exactly how I want it to work.

## A Surprisingly Capable Little Printer

Something I keep coming back to with this project is just how little hardware is involved.

There's no Raspberry Pi running a print server. There's no proprietary desktop application. There's no manufacturer cloud service, subscription, or ink cartridge.

There's just an ESP32 communicating with a thermal printer over UART.

ESPHome handles the device configuration and exposes its functionality to Home Assistant. Home Assistant provides a convenient interface for automations and other systems. Shortcuts provides the bridge to the applications I use on my Mac, iPhone, and iPad.

Each piece does its own job, and none of them needs to know very much about the others.

That's what makes the whole thing so flexible.

Adding QR-code printing didn't require me to rewrite my Shortcuts workflow. Adding word wrapping didn't require me to change how Home Assistant communicates with the printer.

The new functionality lives in the ESPHome component, where it belongs, and everything upstream benefits from it.

It's a great example of why I enjoy working with ESPHome so much.

## Still a Work in Progress

The new functionality has been implemented and committed to the [GitHub repository](https://github.com/AidanMJ25/QR701-ESPHome-External-Component).

The QR-code and barcode additions successfully passed ESPHome configuration validation and a full firmware compilation using ESPHome 2026.9.1 and ESP-IDF.

The word-wrapping changes also passed configuration validation and Git's whitespace checks. A full firmware compilation was attempted, but the local ESP-IDF environment failed during Python environment setup before the component code could be compiled.

So while the software changes are in place, there's still a distinction between successfully validating or compiling the component and confirming every feature works on the physical printer.

Native QR-code and barcode support, in particular, will depend on what the QR701's firmware actually implements.

I've also updated the repository's README and example configuration to document the new actions, Home Assistant entities, supported barcode formats, and wrapping behaviour.

One thing I particularly appreciate about maintaining the component as a public GitHub repository is that these improvements aren't tied exclusively to my own setup.

Anyone using a compatible QR701 printer can potentially take advantage of them by adding the external component to their ESPHome configuration.

### The Fun of Building Something You Don't Really Need

I've joked before that this project feels suspiciously like something a productivity influencer would show off.

A tiny printer that can spit out Markdown documents, dad jokes, URLs, and other information directly from Apple Shortcuts? It's almost offensively convenient.

But what I love most about it isn't necessarily the printing itself.

It's how easily the project has evolved.

I started with the simple goal of making a receipt printer work with ESPHome. Then I wanted to send text to it from Home Assistant. Then I wanted to control it using Shortcuts. Then I added Markdown support, QR codes, barcodes, and automatic word wrapping.

Each addition has made the next one more interesting.

And throughout all of this, the underlying hardware has remained exactly the same.

It's still a cheap thermal printer, an ESP32, and a secondhand power supply sitting on my desk.

The only recurring consumable is a roll of inexpensive 58 mm thermal receipt paper.

I have absolutely no idea what feature I'll decide to add next, or what ridiculous excuse I'll come up with to print another receipt.

But I think that's part of the appeal.

Sometimes the best projects aren't the ones that solve some enormous problem. They're the ones that are fun to build, easy to extend, and make you appreciate just how much you can accomplish with a few inexpensive components and some good open-source software.

And if the end result can also print 371 dad jokes, so much the better.


{{< buttons-list >}}