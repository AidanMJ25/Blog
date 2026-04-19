(function () {
  var input = document.querySelector("[data-search-input]");
  var status = document.querySelector("[data-search-status]");
  var list = document.querySelector("[data-search-list]");

  if (!input || !status || !list) {
    return;
  }

  var indexPromise = null;
  var params = new URLSearchParams(window.location.search);
  var initialQuery = params.get("q") || "";

  input.value = initialQuery;

  function normalize(value) {
    return String(value || "")
      .normalize("NFKD")
      .replace(/[\u0300-\u036f]/g, "")
      .toLowerCase();
  }

  function getIndex() {
    if (!indexPromise) {
      indexPromise = fetch("/index.json")
        .then(function (response) {
          if (!response.ok) {
            throw new Error("Search index failed to load.");
          }
          return response.json();
        })
        .then(function (items) {
          return items.map(function (item) {
            var tags = item.tags || [];
            return {
              item: item,
              title: normalize(item.title),
              summary: normalize(item.summary),
              content: normalize(item.content),
              tags: normalize(tags.join(" ")),
              haystack: normalize([
                item.title,
                item.section,
                item.summary,
                item.content,
                tags.join(" ")
              ].join(" "))
            };
          });
        });
    }

    return indexPromise;
  }

  function scoreResult(entry, query, terms) {
    if (!terms.every(function (term) { return entry.haystack.indexOf(term) !== -1; })) {
      return 0;
    }

    var score = 1;

    if (entry.title.indexOf(query) !== -1) {
      score += 60;
    }

    if (entry.tags.indexOf(query) !== -1) {
      score += 35;
    }

    if (entry.summary.indexOf(query) !== -1) {
      score += 20;
    }

    terms.forEach(function (term) {
      if (entry.title.indexOf(term) !== -1) {
        score += 12;
      }
      if (entry.tags.indexOf(term) !== -1) {
        score += 8;
      }
      if (entry.summary.indexOf(term) !== -1) {
        score += 5;
      }
      if (entry.content.indexOf(term) !== -1) {
        score += 2;
      }
    });

    return score;
  }

  function createResult(result) {
    var item = result.item;
    var article = document.createElement("article");
    var section = document.createElement("p");
    var title = document.createElement("h2");
    var link = document.createElement("a");
    var summary = document.createElement("p");
    var meta = document.createElement("div");

    article.className = "story-card story-card--compact search-result";
    section.className = "story-card__section";
    title.className = "story-card__title";
    summary.className = "story-card__summary";
    meta.className = "story-card__meta";

    section.textContent = item.section || "Page";
    link.href = item.url;
    link.textContent = item.title;
    title.appendChild(link);
    summary.textContent = item.summary || "";

    if (item.date) {
      var date = document.createElement("span");
      date.textContent = item.date;
      meta.appendChild(date);
    }

    if (item.tags && item.tags.length) {
      var tags = document.createElement("span");
      tags.textContent = item.tags.join(", ");
      meta.appendChild(tags);
    }

    article.appendChild(section);
    article.appendChild(title);

    if (summary.textContent) {
      article.appendChild(summary);
    }

    if (meta.childNodes.length) {
      article.appendChild(meta);
    }

    return article;
  }

  function render(results, query) {
    list.replaceChildren();

    if (!query) {
      status.textContent = "Type a search term to search the site.";
      return;
    }

    if (!results.length) {
      status.textContent = "No results found for \"" + query + "\".";
      return;
    }

    status.textContent = results.length + " result" + (results.length === 1 ? "" : "s") + " for \"" + query + "\".";
    results.slice(0, 30).forEach(function (result) {
      list.appendChild(createResult(result));
    });
  }

  function runSearch(query) {
    var cleanQuery = normalize(query).trim();
    var terms = cleanQuery.split(/\s+/).filter(Boolean);

    if (!cleanQuery) {
      render([], "");
      return;
    }

    status.textContent = "Searching...";

    getIndex()
      .then(function (entries) {
        var results = entries
          .map(function (entry) {
            return {
              item: entry.item,
              score: scoreResult(entry, cleanQuery, terms)
            };
          })
          .filter(function (result) {
            return result.score > 0;
          })
          .sort(function (a, b) {
            return b.score - a.score;
          });

        render(results, query.trim());
      })
      .catch(function () {
        status.textContent = "Search is unavailable right now.";
      });
  }

  input.form.addEventListener("submit", function (event) {
    event.preventDefault();
    var query = input.value.trim();
    var nextUrl = query ? "?q=" + encodeURIComponent(query) : window.location.pathname;
    window.history.replaceState(null, "", nextUrl);
    runSearch(query);
  });

  if (initialQuery) {
    runSearch(initialQuery);
  }
}());
