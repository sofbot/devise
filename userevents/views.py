import json
import datetime
from django.http import HttpResponse
from django.views import View
from django.forms import ModelForm
from .models import UserEvent, Invitation
# import pdb

from django.utils import timezone
# only for the sample event below

class UserEventForm(ModelForm):
    class Meta:
        model = UserEvent
        fields = '__all__'

class UserEventView(View):
    def get(self, request, user_id=None):
        if user_id is None:
            data = json.dumps({'errors': 'Invalid credentials'})
        else:
            now = datetime.datetime.now().time()
            today = datetime.date.today()
            user_events = UserEvent.objects.filter(
                user_id=user_id,
                event__end_time__gte=now,
                event__start_date=today,
                liked=True
                ).order_by('event__start_date', 'event__start_time').select_related('event')
            events = [u_event.event for u_event in user_events]
            data = json.dumps([event.dict() for event in events])
        return HttpResponse(data, content_type='application/json')

    def post(self, request):
        body_unicode = request.body.decode('utf-8')
        data = json.loads(body_unicode)
        print('normal post')
        print(request.POST)
        # print('body')
        # print(request.body)
        # print('decoded body')
        # print(body_unicode)
        print('body to json')
        print(data)
        form = UserEventForm(data)
        status = 200
        if data['user_id'] == '0':
            print("ignoring DEMO USER")
            data = json.dumps({'not_saved': data})
        elif form.is_valid():
            try:
                new_userevent = form.save()
                print ("UserEvent was saved")
                data = json.dumps(new_userevent.dict())
                print ("UserEvent data was stored as json")
            except:
            # i.e. Add error message from e to form
                print("Form save FAILED")
                status = 400
                data = json.dumps({'errors': form.errors})
            pass
        else:
            print("Form was INVALID")
            status = 400
            data = json.dumps({'errors': form.errors})
        return HttpResponse(data, content_type='application/json', status=status)

class InvitationForm(ModelForm):
    class Meta:
        model = Invitation
        fields = '__all__'

class InvitationView(View):
    def get(self, request, userevent_id):
        userevent = UserEvent.objects.get(id=userevent_id)
        invitations = userevent.invitation_set.order_by('create_date')[:10]
        data = json.dumps([invitation.dict() for invitation in invitations])
        return HttpResponse(data, content_type='application/json')

    def post(self, request, userevent_id):
        invitation_data = request.POST.copy()
        invitation_data['userevent'] = userevent_id
        form = InvitationForm(invitation_data)
        data = {}
        status = 200
        if form.is_valid():
            try:
                new_invitation = form.save()
                data = json.dumps(new_invitation.dict())
            except:
            # i.e. Add error message from e to form
                data = json.dumps({'errors': form.errors})
                status = 200
            pass
        else:
            data = json.dumps({'errors': form.errors})
            status = 200
        return HttpResponse(data, content_type='application/json', status=status)
