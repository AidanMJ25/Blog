# Automating My City's Garbage Schedule with Shortcuts

**Author:** Aidan Maurin-Jones


**Published:** 2025-09-18



**Tags:** Shortcuts, WebScraping


**Canonical:** http://localhost:1313/posts/automating-my-citys-garbage-schedule-with-shortcuts/



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


- [Toronto Garbage Schedule](https://www.icloud.com/shortcuts/54eefd7b13fe4ba39e21e8ac25fc3e6d)




### Apps & Tools I Used to Create this Shortcut


  
  - [Inspect Browser](https://apps.apple.com/ca/app/inspect-browser/id1203594958?uo=4)
  


  
  - [Jayson](https://apps.apple.com/ca/app/jayson/id1447750768?uo=4)
  





- [Buy Me a Coffee](https://www.buymeacoffee.com/AidanMJ25)
- [Subscribe via RSS](http://localhost:1313/posts/index.xml)
- [Newsletter via Email](https://buttondown.com/AidanMJ25)
- [Newsletter via RSS](http://localhost:1313/newsletter/index.xml)

