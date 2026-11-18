---
title: "Building My Own Ebook Ecosystem with Calibre, a Raspberry Pi, and Open-Source Software"
date: 2026-11-17
draft: false
tags: ["ebooks", "raspberry pi", "open-source", "self-hosting"]
summary: "How I built my own self-hosted ebook ecosystem using Calibre, a Raspberry Pi, and open-source software, with automatic library synchronization, remote access, and reading progress sync."
---

I've always liked the idea of ebooks. Having an entire library available on a device small enough to fit in a pocket is genuinely wonderful. What I've never particularly liked is everything that tends to come attached to that convenience.

Buy a book from Amazon, and you're largely expected to read it using Amazon's software or hardware. Other retailers have their own ecosystems, accounts, applications, and restrictions. The underlying technology for reading a book is relatively simple, yet the experience of managing a digital book collection often feels unnecessarily complicated.

My expectations aren't particularly unreasonable: if I purchase an ebook, I want to keep a copy of it, organize it however I like, and read it on whatever compatible device I choose. I don't want my ability to access a book to depend on whether a particular retailer continues supporting an application or device.

I've been using Calibre to manage my ebook collection, and while it's an excellent application, I wanted something more.

I wanted the convenience of a modern, cloud-connected ebook ecosystem without handing control of my library to somebody else's cloud.

On November 16, 2026, I decided to see whether I could build one myself.

By the end of the day, I had a Raspberry Pi running a web-accessible ebook library, an OPDS catalogue, a separate reading synchronization service, and automatic library replication from my Mac.

Here's how it came together.

### Starting with Calibre

The foundation of the entire project is [Calibre](https://calibre-ebook.com/), the free and open-source ebook management application.

Calibre isn't exactly what I'd describe as a modern-looking Mac application. Its interface is dense, it has seemingly endless configuration options, and it can feel like software designed for people who enjoy managing software.

But underneath that interface is an extraordinarily capable ebook management system.

It handles metadata, authors, series, cover artwork, format conversion, and the actual organization of book files. More importantly, it stores the library locally, using an SQLite database alongside the books themselves.

That makes it a good foundation for something larger.

I already had Calibre installed on my MacBook Pro, and I didn't particularly want to replace it or migrate my collection into an entirely different system. Instead, I wanted to build around it.

My Mac would remain the authoritative home of my ebook collection. Every book would be imported and managed through Calibre, just as before.

Everything else would happen automatically.

### Giving My Library a Home on a Raspberry Pi

I had a Raspberry Pi 4 Model B with 8 GB of RAM available, which turned out to be more than adequate for the job.

Rather than installing another copy of Calibre on the Pi, I decided to use [Calibre-Web](https://github.com/janeczku/calibre-web).

Calibre-Web is a browser-based interface for an existing Calibre library. It reads Calibre's database and presents the collection through a much more approachable web interface, complete with covers, authors, series, and downloadable books.

It also supports OPDS, an open catalogue protocol that allows compatible ebook readers to browse and download books directly from a server.

That last feature was especially interesting to me.

Instead of connecting an e-reader to my Mac whenever I wanted another book, I could theoretically open a catalogue on the reader itself, select a title, and download it.

No proprietary storefront. No vendor-specific library synchronization. Just my own collection, available when I wanted it.

I deployed Calibre-Web on the Raspberry Pi using Docker Compose. The Pi runs Linux, with the project organized under `/srv/epub`.

There was one important question left to answer: how would the library get from my Mac to the Pi?

### Syncthing: The Piece That Makes Everything Work

I could have shared the Calibre library over the network, mounted it on the Raspberry Pi, or simply copied it over whenever I added new books.

None of those options particularly appealed to me.

I wanted the Mac to remain the primary library manager, but I didn't want the server to depend on my Mac being powered on.

That's where [Syncthing](https://syncthing.net/) comes in.

Syncthing is an open-source file synchronization application that synchronizes folders between devices. Unlike a traditional cloud storage service, it doesn't require uploading everything to a third-party storage provider.

I installed Syncthing on my Mac using Homebrew and deployed another instance on the Raspberry Pi.

The setup is straightforward:

- **MacBook Pro:** The original Calibre library, stored in `~/Calibre Library`.
- **Raspberry Pi:** A synchronized copy, stored in `/srv/epub/library`.
- **Syncthing:** Responsible for keeping the two locations synchronized.

The intended arrangement is for the Mac to use Syncthing's Send Only mode and the Raspberry Pi to use Receive Only mode.

This matters because I don't want changes made on the server to overwrite the library on my Mac.

Calibre remains in charge.

During the initial setup, I encountered a predictable problem: Calibre-Web couldn't find the Calibre database because Syncthing hadn't finished transferring it.

Once the initial synchronization completed, Calibre-Web immediately recognized the library.

The synchronized collection contained 70 files across 37 folders, occupying approximately 107 MiB.

There's one technical caveat worth mentioning here. Calibre uses SQLite for its library metadata, and Syncthing doesn't coordinate database transactions. I performed the initial transfer with Calibre closed to avoid copying a database in the middle of a write.

I also mounted the library into Calibre-Web as read-only:
    
    
    volumes:
      - ./calibre-web/config:/config
      - ./library:/books:ro

That `:ro` at the end is important. It prevents Calibre-Web from modifying the synchronized library through that mount.

The result is exactly what I wanted: one authoritative library on my Mac and an independently accessible copy on the Pi.

### Making the Library Accessible Anywhere

At this point, the system worked on my local network.

That was nice, but I wanted access when I wasn't at home.

I could have configured port forwarding on my router, set up a VPN, or used a reverse proxy. Instead, I chose [Cloudflare Tunnel](https://developers.cloudflare.com/cloudflare-one/connections/connect-networks/).

Cloudflare Tunnel allows a service running on a private network to be accessible through a public hostname without opening inbound ports on the router.

The Raspberry Pi establishes an outbound connection to Cloudflare, which routes requests to the appropriate local service.

I created a dedicated hostname for the ebook library and the address takes me directly to Calibre-Web, where I can browse my collection, view metadata, and download books.

It's a small detail, but having my library available through a normal HTTPS address makes the entire project feel much more like a finished product than a collection of services running on a Raspberry Pi.

And because the books are stored on the Pi, the library remains accessible even when my MacBook is turned off.

Of course, Cloudflare is still a third-party dependency for remote access. The important distinction is that Cloudflare isn't hosting my ebook library or managing my books. The data remains on my hardware.

### OPDS: An App Store for My Own Books

One of the most appealing features of Calibre-Web is its support for OPDS.

OPDS stands for Open Publication Distribution System. It's a standardized way for reading applications and devices to discover and acquire digital publications.

In practical terms, it means an ebook reader can connect to a catalogue, display available books, and download them without needing to understand how the underlying library is organized.

This is where the project starts to become more than a web interface for Calibre.

With a compatible e-reader, I can browse my personal library directly from the device. There's no need to connect it to my Mac, manually locate an EPUB, or transfer files over USB.

The reader doesn't need to know anything about Syncthing, Docker, or the Raspberry Pi. It only needs to know where the OPDS catalogue lives.

I particularly appreciate this separation.

The software responsible for managing the books doesn't need to be the same software responsible for distributing them, and neither needs to be the application used to read them.

That's exactly the kind of interoperability I wish were more common in consumer technology.

### CrossPoint Sync: Keeping Track of Where I Left Off

Distributing books solves only part of the problem.

One of the genuinely useful features of proprietary ebook ecosystems is reading progress synchronization. You can stop reading on one device, open the same book somewhere else, and continue from approximately where you left off.

I wanted that capability too.

For this, I deployed [CrossPoint Sync](https://github.com/crosspoint-reader/crosspoint-sync), a separate service designed to synchronize reading progress between compatible CrossPoint clients.

It's important to understand that CrossPoint Sync and Calibre-Web perform completely different jobs.

Calibre-Web provides the books.

CrossPoint Sync provides the reading state.

Neither needs to manage the other's data.

I deployed CrossPoint Sync in its own Docker container and gave it a separate Cloudflare Tunnel hostname.

The installation wasn't entirely uneventful.

CrossPoint Sync initially failed to initialize its SQLite database because the directory mounted into the container had incorrect ownership.

The fix was a simple Linux permissions change:
    
    
    sudo chown -R 1000:1000 /srv/epub/crosspoint-sync/data

After correcting the ownership, the service started successfully and its health endpoint returned:
    
    
    {"status":"ok","version":"0.2.0"}

At that point, the synchronization server was operational. A healthy server, however, isn't the same thing as a verified end-to-end reading synchronization experience; that still requires testing with compatible clients.

Nevertheless, having the infrastructure available opens up some interesting possibilities.

### Five Containers, One Little Raspberry Pi

By the time everything was configured, the Raspberry Pi was running five Docker containers.


| Container | Responsibility | 
| ----- | ----- |
| Calibre-Web | Web library and OPDS catalogue | 
| Syncthing | Replicating the Calibre library | 
| CrossPoint Sync | Reading progress synchronization | 
| Cloudflared | Remote access to Calibre-Web | 
| Cloudflared | Remote access to CrossPoint Sync | 

I deliberately kept these services separate.

It would have been possible to combine some functionality or use a more elaborate self-hosted library platform, but I didn't want to create unnecessary dependencies between components.

If I decide to replace Calibre-Web in the future, Syncthing can continue doing its job. If I change reading synchronization software, the ebook library doesn't need to change.

The services are also configured to restart automatically unless deliberately stopped.

Docker starts with the Raspberry Pi, and the containers use the `unless-stopped` restart policy.

On the Mac, Syncthing runs as a Homebrew-managed service through a macOS LaunchAgent, so it starts when I log in.

The goal is for the system to require as little attention as possible.

I don't want maintaining an ebook library to become another hobby that requires constant maintenance just to keep it functioning.

I already have enough of those.

### What Happens When I Add a New Book?

This is my favourite part of the entire setup, because the day-to-day workflow is almost comically simple.

I add an EPUB to Calibre on my Mac.

That's it.

Calibre manages the book and its metadata. Syncthing notices the changed files and transfers them to the Raspberry Pi. Calibre-Web reads the synchronized library, and the book becomes available through the browser and OPDS catalogue.

From a compatible e-reader, I can then download the book directly.

CrossPoint Sync operates independently to synchronize reading progress between supported clients.

Conceptually, the system looks like this:
    
    
                      MacBook Pro
                      ┌──────────────┐
                      │   Calibre    │
                      │ Master Books │
                      └──────┬───────┘
                             │
                          Syncthing
                             │
                             ▼
                      Raspberry Pi 4
                  ┌────────────────────┐
                  │  Calibre Library   │
                  │  Synced Replica    │
                  └─────────┬──────────┘
                            │
                            ▼
                     Calibre-Web
                        │     │
                   Web UI    OPDS
                        │     │
                        └──┬──┘
                           │
                      EPUB Reader
                           │
                           ▼
                    CrossPoint Sync
                   (Reading Progress)

There's no special export process, no proprietary synchronization application, and no requirement to keep the Mac running for readers to access books that have already been synchronized.

It feels like a natural extension of Calibre rather than an entirely separate system.

### The Less Glamorous Parts

I don't want to pretend that everything worked perfectly on the first attempt.

Getting the infrastructure running involved some troubleshooting, particularly around filesystem permissions, authentication, and initial synchronization.

Calibre-Web's administrator password reset was more involved than expected because the application enforced a password complexity policy that wasn't immediately obvious.

Syncthing needed its GUI authentication configured correctly.

CrossPoint Sync needed its data directory permissions corrected.

I also ended up with a few temporary Cloudflare containers during setup that needed to be identified and removed.

None of these problems was particularly dramatic, but they're a reminder that self-hosting replaces some of the convenience of a commercial service with responsibility for running the underlying infrastructure.

There are also operational details I still want to address, including independent backups, reviewing publicly accessible services, and verifying complete recovery after a Raspberry Pi reboot.

Syncthing is excellent for replication, but replication isn't a backup. If I accidentally delete a book from my master library, that deletion can propagate to the Pi.

And while CrossPoint Sync is running and reporting a healthy status, I still want to validate the complete reading synchronization workflow between compatible devices.

These are manageable tasks rather than fundamental problems with the design.

### Why Not Just Use Kindle or Kobo?

It's a fair question.

Commercial ebook ecosystems have spent years refining their experiences. Buying a book, downloading it, and synchronizing reading progress can be remarkably convenient.

Building your own equivalent requires more effort, more technical knowledge, and a willingness to maintain the services involved.

But those ecosystems also make decisions about how books are distributed, which devices are supported, and how much control customers have over their purchases.

I don't particularly like the idea that the company selling me a book should also get to decide which reading application I'm allowed to use.

Nor do I want my collection to become inaccessible because a device stops receiving updates or a retailer changes its policies.

Using standard EPUB files and OPDS doesn't solve every problem with the ebook industry, especially DRM restrictions. But it does mean that once I have a compatible, usable EPUB, I can manage and distribute it without tying the library to a single manufacturer.

And that's valuable to me.

It's not about refusing to use commercial products. It's about being able to choose them because they're good products, rather than because my books are trapped inside their ecosystems.

### The Bigger Picture

What I find most satisfying about this project isn't any particular piece of software.

Calibre, Syncthing, Calibre-Web, CrossPoint Sync, and Cloudflare Tunnel are all useful tools individually.

The interesting part is what happens when you connect them.

Each application handles one responsibility, and together they create an experience that would otherwise require a tightly integrated proprietary platform.

My Mac manages the collection. The Raspberry Pi makes it available. OPDS connects the library to compatible readers. CrossPoint Sync provides a separate foundation for synchronizing reading progress.

None of these components needs to know everything about the others.

There's something refreshing about that.

I also appreciate that I didn't need to purchase a NAS, subscribe to a hosted ebook service, or buy another computer. I built the system using hardware I already owned.

The Raspberry Pi 4 is hardly cutting-edge hardware, but serving a modest ebook library isn't an especially demanding task.

And while I enjoy experimenting with technology, the best outcome of a project like this is ultimately not having to think about it very much once it's working.

### One Day, One Idea, and My Own Ebook Cloud

The entire project started as an idea I had one morning.

By the end of that day, I had a working self-hosted ebook platform with automatic library replication, a web interface, remote HTTPS access, an OPDS catalogue, and an operational reading synchronization backend.

There's still some validation and maintenance work to do, but the core infrastructure is in place.

More importantly, I've ended up with something that reflects how I think digital media should work.

My books live in a library I control. I can organize them with software I choose. I can access them through open standards, and I can use compatible reading devices without making one company's ecosystem the centre of everything.

The fact that it all runs on a Raspberry Pi sitting somewhere in my house makes it even better.

Sometimes the most satisfying technology projects aren't about inventing something entirely new.

They're about taking a collection of existing tools, connecting them in the right way, and realizing that you've built exactly the experience you wanted.

And in this case, I came up with the idea over breakfast and had most of it working before going to bed.


{{< buttons-list >}}