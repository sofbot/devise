from django.conf.urls import url

from .views import UserEventView, InvitationView

urlpatterns = [
    url(r'^(?P<user_id>[0-9]+)$', UserEventView.as_view()),
    url(r'^$', UserEventView.as_view())
    # url(r'^(?P<userevent_id>[0-9]+)/invitations$', InvitationView.as_view()),
]
