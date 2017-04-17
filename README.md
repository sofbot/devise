# Devise

[Devise](https://sofbot.github.io/devise/) is an easy-to-use, mobile application for finding things to do. 

## The Problem

Devise was inspired by the challenge of finding fun, local events via mobile. Currently people must scavage the corners of the internet checking out various sites. If they're lucky perhaps half of these sites offer a mobile friendly experience. But more often than not, they're stuck zooming in on tiny text and scrolling through long lists of search results. And that's just one site. It leaves much to be desired from a mobile user's perspective.

## The Solution

Devise does the hard work -- scouring the corners the internet and bringing back events in an easily digestible form. All the user has to do is swipe right if they like an event, or swipe left if they don't. Think of it as the 'Tinder' of event apps. When the user is finished, they simply checkout their Timeline to see their plans for the day and head out the door.

## Technical Specs and APIs

Frontend: React-Native framework for Android

Backend: Python and Django

* Database: PostgreSQL
* Authentication: Facebook
* Event Data: BeautifulSoup data extraction
* Yarn: Node package manager
* Python Libraries: Django, Pscycopg2, Django-Extensions, Gunicorn, json

### Technical Highlights

Upon logging in, a set of events is fetched. Prior to exhausting the current set, new events are fetched. This prevents the user from waiting for more events to load. It is equivocal to the trending 'infinite scroll'.

```

// check length of fetchedEvents. fetch more if >= 5

    if (this.props.fetchedEvents.length <= 5) {
      this.props.fetchEvents(this.props.user.id, this.state.offset)
        .then(() => this.setState({ offset: this.state.offset + 10 }));
    }

```

Some event data is extracted from web pages using Beautiful soup. To do this in a robust way,
we used a combination of page structure and class tags.
```
def div_event(div, event, date_str):
    title_span = div.find(class_="title")
    atag = title_span.a
    title = atag['title']
    locations = []
    if "|" in title:
        title, loc = list(map(str.strip, atag['title'].split("|")))
        locations.append(loc)
    event['title'] = title
    event['url'] = atag['href']
    event['custom_id'] += event['url'].split("/")[-2]
    time_cost_loc = div.find("div", class_="meta")
    ...
    loc = time_cost_loc.find_all("span")[-1].contents[0].strip()
    if loc not in locations and "Cost" not in loc:
        locations.append(loc)
```

To minimize the number of visita to our upstream events sources, events are cached once a day using the below code.
This allows users to pull events directly from the devise database.

```
  queries = EventQuery.objects.filter(
      source=source,
      date__contains=date,
      create_date__contains=today
      )
  print("========================================================")
  print(queries)
  if len(queries) == 0:
      print("STORED NEW EVENTS")
      event_dicts = get_event_dicts_sffc(date)
      result = self.make_data_new_events(event_dicts, date)
      if result != True:
          return result
  else:
      print("USED DB EVENTS")
  events = Event.objects.filter(start_date=date, end_time__gte=now).order_by('start_time').exclude(custom_id__in=excluded_ids)[offset:offset+10]

```


## Future Goals

Features to come very soon:
* Add events to phone calendar
* Filter events by category or location
* See friends who also liked the same events
* Curate events based on your previous swiping history
* Add events beyond the current day
* IOS version

## Authors

- Sofie Chen - Software Engineer | [Github](http://github.com/sofbot) | [LinkedIn](https://www.linkedin.com/in/sofia-chen/)
- Fariba Massah - Software Engineer | [Github](http://github.com/fafafariba) | [LinkedIn](https://www.linkedin.com/in/fafafariba/)
- Justin Black - Software Engineer | [Github](http://github.com/spacether) | [LinkedIn](https://www.linkedin.com/in/justin-black-81343352/)
