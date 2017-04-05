import json # needed to texport json to api routes
import re # needed to look for ad divs
import datetime # needed for settng the day on the event
from django.http import HttpResponse
from django.views import View
from django.forms import ModelForm
from .models import Event
# import pdb

from bs4 import BeautifulSoup # needed for scraping
import urllib.request # needed for scraping
from django.core.files import File # DEBUGGING, file save

def get_page(url):
    byte_string = urllib.request.urlopen(url).read()
    content = str(byte_string,'utf-8')


    with open('events/page.txt', 'w') as f:
        myfile = File(f)
        myfile.write(content)
    myfile.closed

    # f = open('page.txt', 'w')
    # f.write(content)
    # f.close()
    return BeautifulSoup(content, 'html.parser')


def event_summary_to_Event(div, start_date):
    table_tr = div.find("tr")
    event = {
        'start_date': start_date,
        'end_date': start_date,
        'image_url': '',
        }
    if table_tr == None:
        # we are in a div event
        pass
    else:
        # we are in a table event
        atag = table_tr.contents[1].a
        time_str = table_tr.contents[0].get_text()
        print(time_str)
        date_str = start_date.strftime('%b %d %Y ')
        print(date_str)
        full_date = date_str+time_str
        print(full_date)
        used_time = datetime.datetime.strptime(full_date, '%b %d %Y %I:%M %p')
        event['start_time'] = used_time.time()
        event['title'] = atag['title']
        event['url'] = atag['href']
        event['summary'] = table_tr.contents[2].get_text()
    return event

def pull(request):
    date = datetime.date.today()
    url = "http://sf" + ".f" + "un" + "che" + "ap." + "com/today/"
    page = get_page(url)
    holder_top_events = page.find("div", class_="post")
    event_divs = holder_top_events.find_all("div", class_="tanbox left")

    ad_finder = lambda div: div.find("div", id=re.compile("-ad-"))
    event_divs = [div for div in event_divs if ad_finder(div) == None]

    event_objs = [event_summary_to_Event(div, date) for div in event_divs]
    for event_obj in event_objs:
        print(event_obj)
        print(" ")

    return HttpResponse(event_divs)

class EventForm(ModelForm):
    class Meta:
        model = Event
        fields = '__all__'

class EventView(View):
    def get(self, request):
        events = Event.objects.order_by('start_time')[:10]
        data = json.dumps([event.dict() for event in events])
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
            pass
        else:
            data = json.dumps({'errors': form.errors})
        return HttpResponse(data, content_type='application/json')
