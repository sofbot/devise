import json
from django.http import HttpResponse
from django.views import View
from django.forms import ModelForm
from .models import Event
# import pdb

from django.utils import timezone
# only for the sample event below


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
        # sample_event = {'source': 'postman', 'custom_id': 'postman1', 'image_url': '1.jpg', 'url': 'google.com', 'title': 'my title', 'summary': 'my summary', 'description': 'my description', 'start_time': timezone.now(), 'end_time': timezone.now()}
        # print(sample_event)
        print(request.POST)
        # print(request.POST['source'])
        # pdb.set_trace()
        # form = EventForm(sample_event)
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
