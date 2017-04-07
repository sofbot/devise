import json # needed to texport json to api routes
import re # needed to look for ad divs
import datetime # needed for settng the day on the event
from django.http import HttpResponse
from django.views import View
from django.forms import ModelForm
from .models import Event, EventQuery
import pdb
from django.utils import timezone

from bs4 import BeautifulSoup # needed for scraping
import bs4
import urllib.request # needed for scraping
# from django.core.files import File # DEBUGGING, file save


class EventForm(ModelForm):
    class Meta:
        model = Event
        fields = '__all__'

def get_page(url):
    byte_string = urllib.request.urlopen(url).read()
    content = str(byte_string,'utf-8')
    return BeautifulSoup(content, 'html.parser')


def detail_event(event):
    if 'image_url' not in event:
        page = get_page(event['url'])
        event_div = page.find("div", class_="post")
        image_url = event_div.find("img")['src']
        if image_url:
            event['image_url'] = image_url

        # needed
        # [DONE] image
        # categories
        # address
        # end time
        # description (optional)

    return event

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

    # time_cost_loc structure
    # 0 = date and time text node
    # 1 = A span with "Cost:" in it"
    # 2 = a tag with class "tt" and "Free" and div with more text
    # 3 = text node with "|"
    # 4 = span with location in it

    # time_cost_loc structure
    # 0 = date and time text node
    # 1 = A span with "Cost: Free" in it"
    # 2 = text node with "|"
    # 3 = span with location in it

    loc = time_cost_loc.find_all("span")[-1].contents[0].strip()
    if loc not in locations and "Cost" not in loc:
        locations.append(loc)

    cost_tag = time_cost_loc.find("a", class_="tt")
    if cost_tag is None:
        cost_tag = time_cost_loc.contents[1]

    date_time = time_cost_loc.contents[0].strip()[0:-2]
    if "All Day" in date_time:
        full_date = date_str + " 12:01 am"
        time = datetime.datetime.strptime(full_date, '%b %d %Y %I:%M %p')
        event['start_time'] = time.time()
        full_date = date_str + " 11:59 pm"
        time = datetime.datetime.strptime(full_date, '%b %d %Y %I:%M %p')
        event['end_time'] = time.time()
    else:
        start_time = date_time.split("  ")[-1].strip()
        full_date = date_str + start_time
        time = datetime.datetime.strptime(full_date, '%b %d %Y %I:%M %p')
        event['start_time'] = time.time()
    img_tag = div.find("img")
    if img_tag:
        event["image_url"] = img_tag['src']
    event['free'] = "FREE" in cost_tag.contents[0]
    event['location'] = ", ".join(locations)
    summary = div.contents[-1]
    if div.contents[-2].name == "p":
        summary = div.contents[-2].contents[0]
    event['summary'] = summary
    return event

def table_event(div, event, date_str, table_tr):
    atag = table_tr.contents[1].a
    time_str = table_tr.contents[0].contents[0].strip()
    if "All Day" in time_str:
        full_date = date_str + " 12:01 am"
        time = datetime.datetime.strptime(full_date, '%b %d %Y %I:%M %p')
        event['start_time'] = time.time()
        full_date = date_str + " 11:59 pm"
        time = datetime.datetime.strptime(full_date, '%b %d %Y %I:%M %p')
        event['end_time'] = time.time()
    else:
        full_date = date_str + " " + time_str
        time = datetime.datetime.strptime(full_date, '%b %d %Y %I:%M %p')
        event['start_time'] = time.time()
    title, location = list(map(str.strip, atag['title'].split("|")))
    event['title'] = title
    event['url'] = atag['href']
    event['custom_id'] += event['url'].split("/")[-2]
    event['location'] = location
    event['summary'] = table_tr.contents[-1].get_text().strip()
    event['free'] = "FREE" in event['summary']
    return event

def event_summary_to_Event(div, start_date, source):
    table_tr = div.find("tr")
    event = {
        'source': source,
        'custom_id': source + "_",
        'start_date': start_date,
        'end_date': start_date,
        'description': '',
        'address': ''
        }
    date_str = start_date.strftime('%b %d %Y ')
    if table_tr == None:
        # we are in a div event
        event = div_event(div, event, date_str)
    else:
        # we are in a table event
        event = table_event(div, event, date_str, table_tr)
    return event


def get_event_dicts_sffc(date):
    source = "sffc"
    url = "http://sf" + ".f" + "un" + "che" + "ap." + "com/today/"
    page = get_page(url)
    holder_top_events = page.find("div", class_="post")
    event_divs = holder_top_events.find_all("div", class_="tanbox left")

    ad_finder = lambda div: div.find("div", id=re.compile("-ad-"))
    event_divs = [div for div in event_divs if ad_finder(div) == None]
    event_dicts = [event_summary_to_Event(div, date, source) for div in event_divs]
    return event_dicts

class EventView(View):
    def make_data_new_events(self, event_dicts, date):
        events = []
        success = True
        for event_dict in event_dicts:
            try:
                # check to see if we already have the event in the db
                found_event = Event.objects.get(custom_id=event_dict['custom_id'])
                events.append(found_event)
            except:
                event_dict = detail_event(event_dict)
                form = EventForm(event_dict)
                try:
                    new_event = form.save()
                    events.append(new_event)
                except:
                    print("ERROR in making event")
                    event_dict = Event(**event_dict).dict()
                    data = {'errors': form.errors, 'event':event_dict}
                    success = False
                    break

        if success:
            data = [event.dict() for event in events]
            new_query = EventQuery(source='sffc', date=date)
            new_query.save()
        return data


    def get(self, request):
        date = datetime.date.today()
        today = datetime.date.today()
        source = "sffc"
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
            data = self.make_data_new_events(event_dicts, date)
        else:
            print("USED DB EVENTS")
            events = Event.objects.filter(start_date__contains=date)
            data = [event.dict() for event in events]

        data = json.dumps(data)
        return HttpResponse(data, content_type='application/json')

    def post(self, request):
        print(request.POST)
        # pdb.set_trace()
        form = EventForm(request.POST)
        data = {}
        if form.is_valid():
            try:
                new_event = form.save()
                data = json.dumps(new_event.dict())
            except:
            # i.e. Add error message from e to form
                data = json.dumps({'errors': form.errors})
        else:
            data = json.dumps({'errors': form.errors})
        return HttpResponse(data, content_type='application/json')
