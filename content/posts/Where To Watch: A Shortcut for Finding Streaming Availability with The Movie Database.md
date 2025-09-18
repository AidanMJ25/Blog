---
title: "Where To Watch: A Shortcut for Finding Streaming Availability with The Movie Database"
date: 2025-09-17
draft: false
tags: ["Shortcuts"]
summary: "Where To Watch is a Shortcut that searches TMDb for movies or shows and instantly 
tells you where they're streaming in your region, opening the JustWatch page in Safari or 
showing if it's unavailable."
---

One of my favorite things about Shortcuts is how they can bridge the gap between scattered 
web services and a smooth, native-like workflow. I built a new shortcut called Where To Watch,
 which taps into The Movie Database (TMDb) API to answer a simple but constant question: 
 "Where is this movie or TV show streaming?"

⸻

### The Idea

The premise is straightforward: I want to type in the name of a movie or TV show, and 
instantly see whether it's available to stream in my region. No need to scroll through 
JustWatch, no extra apps, no hunting through five different services. Just one quick Shortcut
 that opens Safari with the results.

⸻

### How It Works

The Shortcut starts by letting me choose between Movie or TV Show. Behind the scenes, this 
choice determines which TMDb endpoint it will query. For example:

- movie queries film titles
- tv queries series titles

Once I make a choice, the Shortcut asks me to type in the name. That query string gets 
URL-encoded and sent off to TMDb's search API.

⸻

### Handling Results

TMDb often returns multiple matches (think about searching for "Batman"). To handle this, 
the Shortcut loops through results and builds a list of title/ID pairs. I can then pick the
 correct match from a clean, combined list:
    
 
    The Dark Knight : 155
    Batman Begins : 272

If no results are found, the Shortcut gracefully shows a "No results found :(" message and 
stops.

⸻

### Streaming Providers

Here's where it gets good: once I've selected the right result, the Shortcut uses its TMDb 
ID to fetch the watch/providers endpoint. This API call returns a region-specific breakdown 
of streaming availability.

The Shortcut checks for my country code (CA in this case), and if providers exist, it pulls 
the first available streaming link. Safari then opens directly to the movie's or TV Show's 
JustWatch webpage. If nothing is available in my region, the Shortcut tells me:

> "Unfortunately this title is not available in your region :("

⸻

### Why I Love This

Where To Watch has quickly become one of my most-used Shortcuts. It's the perfect blend of 
lightweight automation and practical everyday use. Instead of juggling apps or websites, I 
can now quickly search for a movie or tv show and it tells me instantly where I can watch 
something--or if I need to wait until it arrives in Canada.

{{< appcard 
    url="https://www.icloud.com/shortcuts/cd65d16803074adb9957d512164b8f40" 
    name="Where To Watch" 
    icon="Where To Watch (Public) Icon.jpg" 
>}}

### Apps & Tools Used to Create this Shortcut

{{< appcard 
    url="https://apps.apple.com/ca/app/jayson/id1447750768?uo=4" 
    name="Jayson" 
    icon="/App Store App Icons/Jayson Icon.jpg" 
>}}
