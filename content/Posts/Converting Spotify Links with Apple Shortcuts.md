---
title: "Converting Spotify Links with Apple Shortcuts"
date: 2026-11-02
draft: false
tags: ["Shortcuts", "Automation", "Music"]
summary: "Spotify links aren't particularly useful when you use YouTube Music. Here's how I built an Apple Shortcut that uses Song.link's API to extract song metadata and turn Spotify links into YouTube searches."
---

Music streaming has made discovering and sharing songs easier than ever. Unfortunately, sharing music between streaming services remains unnecessarily complicated.

Someone sends you a Spotify link. You use YouTube Music. Now what?

You could open Spotify, find the song title and artist, switch to YouTube Music, and search for it manually. None of this is particularly difficult, but it's an annoying series of steps for something that should be effortless.

This is exactly the sort of small inconvenience that Apple Shortcuts is good at eliminating.

So I built a Shortcut that takes a Spotify link, identifies the song and artist, and opens a search for that song on YouTube.

No Spotify account required. No copying song titles. No switching between applications to figure out what someone sent me.

Just a link and a Shortcut.

### The Problem with Music Links

A Spotify link is useful if you use Spotify. If you don't, it's considerably less convenient.

Music streaming services have spent years building their own ecosystems, complete with playlists, recommendations, libraries, and sharing features. But the links they generate generally point back to their respective platforms.

The underlying music, of course, isn't exclusive to those links.

A song available on Spotify is often available on Apple Music, YouTube Music, Deezer, and other services. The problem isn't finding the music. It's translating a link from one service into something useful on another.

There are already services designed to solve this problem, including [Song.link](https://song.link/), which generates cross-platform music links.

And, conveniently, Song.link has an API.

That makes it an excellent candidate for Apple Shortcuts.

### Building the Shortcut

My Shortcut, unimaginatively named **Spotify Link Converter**, starts by accepting a URL through the Share Sheet.

If nothing is provided, it retrieves the contents of the clipboard instead. This means I can either share a Spotify link directly to the Shortcut or simply copy one and run it manually.

From there, the Shortcut extracts the URL and encodes it so it can be safely included in an API request.

The request itself is straightforward:

`https://api.song.link/v1-alpha.1/links?url=`

The encoded Spotify URL is appended to the end, and Shortcuts' **Get Contents of URL** action sends the request.

Song.link returns a JSON response containing information about the music associated with the original link, including metadata and links to other streaming platforms.

For my purposes, I only need two pieces of information: the song title and the artist.

### Extracting the Music Metadata

This is where the Shortcut becomes a little more interesting.

Song.link's API response contains an `entitiesByUniqueId` dictionary, which holds metadata about the music identified by the service.

The Shortcut uses the returned `entityUniqueId` to construct dictionary paths for two values:

- `entitiesByUniqueId.[entityUniqueId].title`
- `entitiesByUniqueId.[entityUniqueId].artistName`

Using Shortcuts' **Get Dictionary Value** action, I extract those values and store them in variables named `Song` and `Artist`.

This is one of my favourite things about Shortcuts: you can interact with a web API, process a JSON response, and extract specific values without writing a traditional application.

There are no dependencies to install, no server to maintain, and no need to write a script just to make a simple HTTP request.

It's all handled through a handful of native Shortcuts actions.

### Turning Metadata into a YouTube Search

Once the Shortcut has the song title and artist, it combines them into a single string:

`Song by Artist`

For example, if someone shares a Spotify link to _Dreams_ by Fleetwood Mac, the Shortcut produces:

`Dreams by Fleetwood Mac`

That text is then URL-encoded and appended to a YouTube search URL:

`youtube://www.youtube.com/results?search_query=`

Finally, the **Open URLs** action opens the resulting search.

And that's it.

Rather than trying to find an exact equivalent track on another streaming service, the Shortcut searches YouTube using the metadata returned by Song.link.

It's a deliberately simple approach. I don't need a complicated matching algorithm or a database of streaming service identifiers. YouTube's search functionality already does the heavy lifting.

The Shortcut also doesn't need access to my YouTube Music account, or any account for that matter.

One important distinction is that this opens a YouTube search, not necessarily the exact song in YouTube Music. I still choose the appropriate result, and search results may include music videos, live performances, or covers.

For my use case, that's perfectly acceptable.

### Why Not Just Use Song.link?

That's a fair question.

Song.link already provides a webpage containing links to different streaming services. I could simply open the Spotify URL through Song.link and choose the platform I want.

But that introduces another webpage and another interaction.

I don't need a list of every streaming service that carries a particular song. I already know where I want to listen to it.

By using the API directly, I can skip the intermediate webpage entirely.

The Shortcut gets the information it needs and immediately opens the search.

It's a small optimization, but one that makes the process feel considerably more natural.

### The Beauty of Small Automations

I've always believed that some of the most useful automations are the ones that eliminate tiny inconveniences rather than solve enormous problems.

This Shortcut isn't particularly sophisticated. It doesn't use artificial intelligence, maintain a database, or require a complicated collection of third-party applications.

It makes an HTTP request, extracts two values from a dictionary, constructs a URL, and opens it.

That's all it needs to do.

Could I have accomplished the same thing manually? Absolutely. Would doing so take more than a few seconds? Probably not.

But those extra steps are precisely why I built it.

The less friction involved in doing something, the more likely I am to actually do it.

And when a Shortcut can turn a series of repetitive actions into a single interaction, I consider that a worthwhile improvement.

Sometimes the best automation isn't the one that does the most.

It's the one that gets out of your way.

{{< appcard 
    url="https://www.icloud.com/shortcuts/de6b0253ab784af6b9b181af6209dba8" 
    name="Spotify Link Converter" 
    icon="/Shortcuts Icons/Spotify Link Converter Icon.jpg" 
>}}


{{< buttons-list >}}