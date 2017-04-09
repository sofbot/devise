from django.conf.urls import url

from .views import EventView

urlpatterns = [
    url(r'^(?P<user_id>[0-9]+)/(?P<offset>[0-9]+)$', EventView.as_view()),
    url(r'^(?P<user_id>[0-9]+)/$', EventView.as_view())
]
