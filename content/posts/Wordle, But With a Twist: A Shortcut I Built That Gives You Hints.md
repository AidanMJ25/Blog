---
title: "Wordle, But With a Twist: A Shortcut I Built That Gives You Hints"
date: 2025-09-18
draft: false
tags: ["Shortcuts", "AI"]
summary: "A Shortcut that grabs today's Wordle answer, runs it through a local AI, and gives 
you a playful hint instead of a spoiler."
---

I've been having fun experimenting with Shortcuts, APIs, and local AI models, and recently 
I built something that is kinda fun: a Shortcut that gives you a hint for the daily Wordle without 
spoiling the answer.

____

### How It Works

Here's the flow I put together:

1. Grab Today's Wordle

The Shortcut starts by formatting the current date and plugging it into the New York Times' 
Wordle API (https://www.nytimes.com/svc/wordle/v2/[date].json). That gives me the official 
solution for the day in JSON format.

2. Parse the API Response

I use Shortcuts' "Get Dictionary from" action to pull out the solution field -- the actual 
word for today's puzzle. Normally that would be game over, but that's where the next step 
comes in.

3. Ask AI for a Hint

Instead of showing the word, the Shortcut creates a prompt:

> "Without telling me the word, provide a hint to what the given word is below."

I pass that along with the solution to Gemma 2B v2, a small local model I'm running. The 
model generates a creative hint while keeping the answer hidden.

4. Show the Hint

Finally, the Shortcut displays the hint in an alert, giving me just enough of a push without 
ruining the puzzle.

____

### Why I Like It

What I enjoy about this Shortcut is how it combines three different things I love tinkering 
with:

- Web data: pulling JSON directly from the NYT Wordle API.
- Automation: using Shortcuts to parse and structure everything.
- Local AI: letting an on-device model do the fun part of writing the hint.

The result is quick, private, and surprisingly fun -- every time I run it, I get a slightly 
different hint for the same word.

____

### Final Thoughts

I wanted a way to make Wordle more approachable on the days when the word feels impossible, 
without crossing into outright cheating. This Shortcut hits that sweet spot for me. It's a 
simple automation, but it feels fresh and playful every time I use it.


{{< appcard 
    url="https://www.icloud.com/shortcuts/dc2aab47577a49ab9095c2f6920e60f7" 
    name="Wordle Hint" 
    icon="/Shortcuts Icons/Wordle Hint Icon.jpg" 
>}}

### Apps Used to Create this Shortcut

{{< approw >}}
{{< appcard 
    url="https://apps.apple.com/ca/app/offlinellm-private-ai-chat/id6474508768?uo=4" 
    name="OfflineLLM: Private AI Chat" 
    icon="/App Store App Icons/OfflineLLM: Private AI Chat Icon.jpg" 
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