from django.conf.urls import url

from .views import EventView

urlpatterns = [
    url(r'^(?P<user_id>[0-9]+)$', EventView.as_view()),
    url(r'^$', EventView.as_view()),
]
