---
title: "Convert Current Date to Unix Time with Shortcuts"
date: 2025-09-25
draft: false
tags: ["Shortcuts"]
summary: "A simple Shortcut that converts any date—or the current one—into Unix time, perfect for APIs, logging, and automation workflows."
---

Some automations are so simple that they almost feel like magic tricks. A great example of this is my Shortcut for converting any date--or just the current one--into Unix time.

For those unfamiliar, Unix time is a standard way of representing dates as the number of seconds since January 1, 1970, at midnight UTC. It's widely used in APIs, databases, and automation tools because it turns messy human dates into a single number that's easy for computers to understand.

---

### How the Shortcut Works

The Shortcut begins with a conditional check:

- If Shortcut Input has a value → use that as the date.
- Otherwise → fall back to the current date.

This flexibility means you can pass in a date from another Shortcut, an app, or a file--and it'll just work. If you don't supply anything, it defaults to "now," which is handy for most uses.

Next, the Shortcut defines a fixed reference point:

1970-01-01T00:00:00Z

This is the start of Unix time (known as the epoch). The Shortcut parses that text into a date object.

Finally, it calculates the difference in seconds between the chosen date (from input or current) and the epoch date. The result is a clean integer: Unix time.

----

### Why This Is Useful

I reach for this Shortcut whenever I'm working with APIs that require timestamps or when I need a quick way to normalize dates into a standard format. It's especially useful in web automations, logging workflows, and even in Home Assistant setups where Unix time values can simplify comparisons.
  
What I love about this Shortcut is how it elegantly combines a few building blocks--conditional input, a static reference date, and a date difference--into a tool I use far more often than I expected. It turns a concept buried deep in programming textbooks into a tap-friendly utility.

---

### Try It Yourself

You can run this Shortcut as-is for an instant timestamp or pass in dates from elsewhere to convert them. Either way, you'll always get a precise Unix time value at the end.

{{< appcard 
    url="https://www.icloud.com/shortcuts/0c224e59ffa14ae7a1f285199f3b1b15" 
    name="Convert Current Date to Unix Time" 
    icon="/Shortcuts Icons/Convert Current Date to Unix Time Icon.jpg" 
>}}

{{< buymeacoffee >}}
{{< rss-button >}}

{{< buttondown >}}