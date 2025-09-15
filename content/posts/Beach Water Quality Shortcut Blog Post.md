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
	•	SAFE → green
	•	UNSAFE → red
	•	Anything else → black

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