import json
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
    def get(self, request):
        events = UserEvent.objects.order_by('event__start_time')[:10]
        data = json.dumps([event.dict() for event in events])
        return HttpResponse(data, content_type='application/json')

    def post(self, request):
        print(request.POST)
        form = UserEventForm(request.POST)
        data = {}
        if form.is_valid():
            try:
                new_user_event = form.save()
                data = json.dumps(new_user_event.dict())
            except:
            # i.e. Add error message from e to form
                data = json.dumps({'errors': form.errors})
            pass
        else:
            data = json.dumps({'errors': form.errors})
        return HttpResponse(data, content_type='application/json')

class InvitationForm(ModelForm):
    class Meta:
        model = Invitation
        fields = '__all__'

class InvitationView(View):
    def get(self, request, user_event_id):
        print(user_event_id)
        user_event = UserEvent.objects.get(id=user_event_id)
        invitations = user_event.invitations.order_by('created_at')[:10]
        data = json.dumps([invitation.dict() for invitation in invitations])
        return HttpResponse(data, content_type='application/json')

    def post(self, request):
        print(request.POST)
        form = InvitationForm(request.POST)
        data = {}
        if form.is_valid():
            try:
                new_invitation = form.save()
                data = json.dumps(new_invitation.dict())
            except:
            # i.e. Add error message from e to form
                data = json.dumps({'errors': form.errors})
            pass
        else:
            data = json.dumps({'errors': form.errors})
        return HttpResponse(data, content_type='application/json')
