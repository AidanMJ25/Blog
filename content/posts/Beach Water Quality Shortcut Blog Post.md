---
title: "Automating Toronto’s Beach Water Quality with Shortcuts"
date: 2025-09-14
draft: false
tags: ["shortcuts", "webscraping"]
summary: "A Shortcut that pulls Toronto’s beach water quality data and shows a simple, 
color-coded report in Safari."
---

This summer I wanted a faster way to check if it’s safe to swim at Toronto’s beaches. The city 
publishes daily water quality results through their open data portal, but digging through JSON 
feeds on a phone isn’t exactly convenient. So, I built a Shortcut that automates the whole process: 
it checks for the latest update, pulls the results, and displays a clean, color-coded report in Safari.

⸻

### Checking for Fresh Data

The first thing my Shortcut does is make sure I’m not working with stale results. I format the 
current date, subtract one day (since advisories usually trail by a day), and call the city’s 
last_update API. From there, I grab the lastUpdate field and confirm whether it matches the date I expect.

If no data is available, the Shortcut stops and shows me an alert: “No recent results 
found.” That way, I’m not wasting time on old advisories.

⸻

### Fetching the Results

Once I know the data is current, I build a URL against the beach_results API. I pass both a 
startDate and endDate based on the formatted date, and I also define a list of beach IDs. Right 
now I have two beaches set up—IDs 8 and 9—but I can easily add more later.

A Repeat loop runs through each beach ID, fetching its data individually and parsing the 
results. This keeps the Shortcut flexible if I want to expand it.

⸻

### Formatting the Data

This is the part I had the most fun with. The Shortcut parses out the CollectionDate, 
statusFlag, eColi count, and any advisory notes. To make the results clear at a glance, 
I map:
	
- SAFE → green
- UNSAFE → red
- Anything else → black

I then build an HTML card for each beach, using large black headers for the beach name, 
medium-sized text for the collection date, and a color-coded status flag for the water 
quality. Everything is wrapped in <span> elements with inline font sizes so the final 
report looks neat and easy to read.

⸻

### Displaying the Report

After the loop finishes, the Shortcut combines all of the HTML snippets into one page. It 
converts that text into rich content and opens it in a Safari web view. What I end up with 
is a simple dashboard that shows the latest conditions for each beach I care about.

If the data feed has no values for that day, I just get a quick alert instead of a blank page.

⸻

### Why I Built It

For me, this Shortcut strikes the right balance between utility and presentation. It’s not 
just dumping JSON—it’s validating freshness, parsing results for multiple beaches, and 
presenting them in a way that’s useful at a glance.

Now, instead of digging through government websites or spreadsheets, I just run the Shortcut 
and instantly see whether it’s safe to swim. It’s become part of my summer routine, and I love 
how it turns raw open data into something practical and personal.

{{< shortcutcard
     url="https://www.icloud.com/shortcuts/f646350961ee461a8db0ef5190cb1a76"
     name="Toronto Beaches Water Quality (Public)"
     icon="https://cvws.icloud-content.com/B/AZoyR5NACBXbWkM7PwYbHvgO13rj/${f}?o=AhqFATuONoZs8D5vPGDWSCNTh3sfroWF-OiOjizCTGRc8px5RsOgi4uu97GtT6jD6A&v=1&x=3&a=CAogVUZxqGXJikIAtRTBFMV_6UGtPMcI2v9JS7hfl8zdlBASexDHjcWflTMYx-qgoZUzIgEAUgQO13rjajCLSGnbR1D38AcG0rf_HlC7CijI4m5N_FnbCu7NUTjvbRW3iHVVoWAM5gWtBuRYbQRyMJlvIsoCJhv58lmYPjH6TUKSKMgldOoGVFMBkZmHgwdvXfL3m9g-QpTvy1mDSCSO2A&e=1758053545&fl=&r=5f4b8c10-01ce-4e3f-bb9a-73c414c72fa4-1&k=_&ckc=com.apple.shortcuts&ckz=_defaultZone&p=33&s=JCNfIU2ftOy8o-u9v3vI05l6RvY"
>}}

### Apps & Tools I Used to Create this Shortcut

{{< approw >}}
  {{< appcard 
    name="Inspect Browser"
    url="https://apps.apple.com/ca/app/inspect-browser/id1203594958?uo=4"
    icon="https://is1-ssl.mzstatic.com/image/thumb/Purple211/v4/a9/71/c6/a971c683-ee6e-46d3-b3ee-75c8d2be2484/AppIcon-0-0-1x_U007epad-0-10-0-85-220.png/512x512bb.png"
  >}}

  {{< appcard 
    name="Jayson"
    url="https://apps.apple.com/ca/app/jayson/id1447750768?uo=4"
    icon="https://is1-ssl.mzstatic.com/image/thumb/Purple125/v4/78/3d/2e/783d2e1c-0191-32aa-3a7a-2a578ec6cfdf/AppIcon-0-1x_U007emarketing-0-7-0-sRGB-85-220.png/512x512bb.png"
  >}}
{{< /approw >}}

