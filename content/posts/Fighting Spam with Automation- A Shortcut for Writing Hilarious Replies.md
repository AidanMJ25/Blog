---
title: "Fighting Spam with Automation: A Shortcut for Writing Hilarious Replies"
date: 2025-09-26
draft: false
tags: ["Shortcuts", "AI", "AppleScript"]
summary: "A playful Shortcut that uses AppleScript, Shortcuts, and LM Studio to automatically 
draft hilariously rude replies to spam emails."
---

One of the joys of Shortcuts on macOS is bending the system to your will. With a little 
creativity and some AppleScript, you can pull off automations that feel both absurd and brilliant. 
My latest project? A Shortcut that automatically drafts a brutally funny, sarcastic reply to 
spam and junk emails—powered by a local AI model running in LM Studio.

It’s not practical. It’s not productive. But it’s very satisfying.

⸻

### How It Works

At its core, the Shortcut is a four-part pipeline:

1. **Grab the Email Contents**
Using a short AppleScript snippet, the Shortcut fetches the subject, sender, and body of the 
currently selected message in Apple Mail. If no message is selected, it returns a friendly 
“No message selected.” To keep things stable, the Shortcut also checks if the text exceeds 
LM Studio’s character limit and truncates it if necessary.

```applescript
tell application "Mail"
	set selectedMessages to selection
	if selectedMessages is not {} then
		set theMessage to item 1 of selectedMessages
		set theSubject to subject of theMessage
		set theSender to sender of theMessage
		set theContent to content of theMessage
		return "Subject: " & theSubject & linefeed & "From: " & theSender & linefeed & linefeed & theContent
	else
		return "No message selected."
	end if
end tell
```

2.	**Prepare the Prompt**
The Shortcut sets a variable for the LM Studio model ID (gemma-3-4b-it in my case) and builds 
a carefully worded prompt. The instructions tell the model to write a “brutally funny, insult-filled 
response to a spam email. Be sarcastic and creatively rude… End with an absurd, over-the-top 
(but never threatening) final warning.” The result is a prompt that guides the AI into crafting 
exactly the kind of unhinged reply you’d never actually send, but will absolutely laugh at.

3.	**Send It to LM Studio**
With the email contents and the prompt combined, the Shortcut makes a call to LM Studio’s 
local API (http://localhost:1234/v1/chat/completions). The response is parsed as JSON, and 
the draft text is extracted. Because it runs locally, there are no cloud services 
involved—everything stays private.

```bash
curl -X POST "http://localhost:1234/v1/chat/completions" \
  -H "Content-Type: application/json" \
  -d '{
    "model": "gemma-3-4b-it",
    "messages": [
      {
        "role": "system",
        "content": "Write a brutally funny, insult-filled response to a spam email. Be 
        sarcastic and creatively rude (no slurs or hate speech). Make it clear I never 
        want to hear from them again. Reference the content of the email when possible. 
        End with an absurd, over-the-top (but never threatening) final warning, and a 
        signature that sounds unhinged yet articulate. Do Not include subject lines or 
        metadata."
      },
      {
        "role": "user",
        "content": "<<< email contents go here >>>"
      }
    ]
  }'
```

4.	**Open in Mail’s Reply Window**
Finally, another AppleScript takes over: it opens a reply window to the original spam message 
and drops the AI-generated draft into the compose area. From here, you can either hit send (bold!) 
or just chuckle at the absurdity and close the window.

```applescript
on run {input}
	tell application "Mail"
		set selectedMessages to selection
		if selectedMessages is not {} then
			set theMessage to item 1 of selectedMessages
			set replyMessage to reply theMessage with opening window
			set content of replyMessage to input
		end if
	end tell
end run
```

⸻

### Why Build This?

I won’t pretend this Shortcut is essential to my workflow. Nobody needs an AI-crafted insult 
generator for spam. But that’s the fun of automation: sometimes it’s about play, not productivity.

Spam clogs our inboxes daily, and most of us simply delete it. This Shortcut flips the script, 
giving you a mischievous outlet for all that frustration. Whether you actually send the replies 
or just read them for a laugh, it makes the experience of dealing with spam weirdly delightful.

⸻

### A Perfect Example of Local AI + Shortcuts

The real story here is how easily Shortcuts can integrate with local AI tools like LM Studio. By 
combining AppleScript’s system-level hooks with Shortcuts’ automation glue, you can build 
workflows that feel custom-tailored to your sense of humor—or your productivity needs.

In this case, the Shortcut isn’t saving me time or streamlining my day. But it is showcasing 
the power of running AI models locally, where latency is low, privacy is intact, and you can 
experiment with ideas that wouldn’t make sense on a cloud-based service.

⸻

### The Result

The first time I ran the Shortcut, the reply draft began with a sarcastic takedown of the 
email’s fake “investment opportunity,” segued into a rant about how the spammer’s grammar 
deserved jail time, and closed with a completely unhinged signature that read:

“Sincerely, Lord Emperor of My Inbox, Eternal Defender Against Your Nonsense.”

I didn’t send it. But I laughed harder than I have at an email in years. And that’s exactly 
the point.

⸻

**Bottom line:** Not every Shortcut has to be practical. Sometimes, the best ones are the ones 
that bring you joy—even if that joy comes from imagining a spammer’s reaction to an AI-written 
roast they’ll never actually read.

{{< appcard 
    url="https://www.icloud.com/shortcuts/a53cf7be25fe438d9425e73ff461f063" 
    name="Write Reply to Spam & Junk Email" 
    icon="/Shortcuts Icons/Write Reply to Spam & Junk Email Icon.jpg" 
>}}

### Apps Used to Create This Shortcut

{{< approw >}}
{{< appcard 
    url="https://lmstudio.ai/download?os=mac" 
    name="LM Studio"
    icon="/App Icons/LM Studio Icon.jpg" 
>}}
{{< appcard 
    url="https://latenightsw.com/" 
    name="Script Debugger"
    icon="/App Icons/Script Debugger Icon.jpg" 
>}}
{{< /approw >}}

{{< buttons-list >}}