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
                new_userevent = form.save()
                data = json.dumps(new_userevent.dict())
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
    def get(self, request, userevent_id):
        userevent = UserEvent.objects.get(id=userevent_id)
        invitations = userevent.invitation_set.order_by('created_at')[:10]
        data = json.dumps([invitation.dict() for invitation in invitations])
        return HttpResponse(data, content_type='application/json')

    def post(self, request, userevent_id):
        invitation_data = request.POST.copy()
        invitation_data['userevent'] = userevent_id
        form = InvitationForm(invitation_data)
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
