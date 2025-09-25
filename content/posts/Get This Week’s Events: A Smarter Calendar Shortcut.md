---
title: "Get This Week’s Events: A Smarter Calendar Shortcut"
date: 2025-09-25
draft: false
tags: ["Shortcuts"]
summary: "A flexible Shortcut that dynamically calculates the start and end of the current week and fetches only your calendar events within that range."
---

One of the things I love about Shortcuts is how they let you bend the system to match your mental model of time. Apple's Calendar app is great at showing what's on your plate, but sometimes you want to zoom out and get a clear snapshot of just this week. That's exactly what this Shortcut, Get This Week's Events, does--by calculating the week's boundaries dynamically and pulling in only the events you care about.

---

### How It Works

The Shortcut starts by establishing today's date and formatting it into a value that the rest of the workflow can understand. From there, it leans on a Dictionary that acts like a custom lookup table for each day of the week. This dictionary defines offsets for both the start and end of the week depending on the current day.

For example:

- Sunday maps to {Start: 0, End: 6}
- Monday maps to {Start: 1, End: 5}
- Wednesday maps to {Start: 3, End: 3}

This clever setup means the Shortcut doesn't have to assume whether your week starts on Sunday, Monday, or any other day--it adapts automatically by subtracting and adding the right number of days from the current date.

----

### Calculating the Range

Once the dictionary hands back the correct offsets, the Shortcut does a simple bit of date math:

- Subtract the "Start" offset from the current date to calculate the Start of Week.
- Add the "End" offset to the current date to calculate the End of Week.

Both results are saved into variables, which become the boundaries for the next step.

---

### Finding Your Events

With the week's start and end pinned down, the Shortcut uses the Find Calendar Events action to grab only the events whose start date falls between those two values. That means whether you run this on a Tuesday or a Friday, you'll always get a list scoped neatly to the current week, no manual scrolling required.

----

### Why This Matters

On the surface, it looks like a simple "show me my week" automation--but the beauty here is in how it generalizes. By abstracting the week's structure into a dictionary, you can easily tweak how you want your weeks defined. For instance, you could redefine Saturday as the end of the week or experiment with rolling five-day "work weeks" instead of calendar weeks.

This kind of flexibility is exactly why Shortcuts shines: you're not stuck with Apple's defaults--you can make the system reflect your schedule.

---

### My Take

I've tried plenty of ways to get a weekly overview--widgets, third-party apps, even manually filtering in Calendar--but nothing beats the elegance of this Shortcut. It's fast, it's reliable, and it always gives me the right slice of time, no matter the day. It's a perfect example of how Shortcuts can take something that feels rigid and make it fluid again.

{{< appcard 
    url="https://www.icloud.com/shortcuts/7830997656894d16a2fcb3aabc8cd56c" 
    name="Get This Week’s Events" 
    icon="/Shortcuts Icons/Get This Week’s Events Icon.jpg" 
>}}