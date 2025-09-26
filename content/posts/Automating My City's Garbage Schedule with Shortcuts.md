---
title: "Automating My City's Garbage Schedule with Shortcuts"
date: 2025-09-18
draft: false
tags: ["Shortcuts", "Webscraping"]
summary: "How I built a Shortcut that fetches my city's garbage schedule from a CSV, 
translates it into plain English, and tells me exactly which bins to put out each collection 
day."
---


One of the things I love about Shortcuts on iOS is how it can take raw, unfriendly data and 
turn it into something useful and personal. I recently built a Shortcut that pulls in my city's 
official garbage pickup calendar (published as a CSV file), processes it, and tells me exactly 
what needs to go out on collection day.

It's a small thing, but it makes my life much easier.

___

## How It Works

The Shortcut really boils down to three main steps:

1. Fetching the schedule

I start with Get Contents of URL to download the CSV file the city publishes with all of the 
collection dates and types. It's just plain text, but the formatting is predictable enough 
to work with.

2. Parsing and filtering

Once I split the text into individual lines, I use a filter to find the rows that match my 
pickup day and today's date. That narrows down the entire dataset to just what I care about.

3. Turning codes into plain English

The CSV doesn't actually spell out "Garbage" or "Recycling." Instead, it uses numbers to 
represent each type of waste. To fix this, I built a dictionary inside Shortcuts that maps 
those numbers to labels (e.g., 1 = Green Bin, 2 = Garbage). A repeat loop goes through each 
row, checks which items are marked T (true), and then looks up the proper label.

___

### Handling Multiple Bins

One of the tricky parts was making the results readable when more than one type of waste is 
collected.

If there's only one item, the output is simple: "Garbage." But if two or three bins need to 
go out, I wanted it to sound natural.

  

The Shortcut counts the number of matches, and then formats them like this:

- Two items → "Green Bin and Recycling"
- Three or more → "Green Bin, Garbage, and Yard Waste"

It's a small touch, but it makes the alert feel like something I'd actually write, not just 
machine output.

___

### The End Result

When everything's processed, the Shortcut shows me an alert with the result. On pickup days, 
I just run it and immediately know what to take to the curb:

> "Today's pickup: Green Bin, Garbage, and Yard Waste."

No more scrolling through PDFs, no more guessing which week is recycling week.

___

### Why I Like This Shortcut

This project really highlights why I enjoy using Shortcuts:

- It takes local data and turns it into something that actually fits my life.
- The automation is readable and flexible, even when dealing with messy CSV data.
- It's practical--this Shortcut saves me time and prevents mistakes every week.

___

For now, though, it's already become part of my weekly routine. It's not flashy, but it's one 
of those little automations that quietly makes life better--one trash day at a time.

{{< appcard 
    url="https://www.icloud.com/shortcuts/54eefd7b13fe4ba39e21e8ac25fc3e6d" 
    name="Toronto Garbage Schedule" 
    icon="/Shortcuts Icons/Toronto Garbage Schedule (Public) Icon.jpg" 
>}}


### Apps & Tools I Used to Create this Shortcut

{{< approw >}}
  {{< appcard 
    url="https://apps.apple.com/ca/app/inspect-browser/id1203594958?uo=4" 
    name="Inspect Browser" 
    icon="/App Store App Icons/Inspect Browser Icon.jpg" 
>}}

  {{< appcard 
    url="https://apps.apple.com/ca/app/jayson/id1447750768?uo=4" 
    name="Jayson" 
    icon="/App Store App Icons/Jayson Icon.jpg" 
>}}
{{< /approw >}}


{{< buymeacoffee >}}
{{< rss-button >}}

{{< buttondown >}}