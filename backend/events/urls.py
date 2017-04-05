from django.conf.urls import url

from .views import EventView, pull

urlpatterns = [
    url(r'^pull$', pull),
    url(r'^$', EventView.as_view()),
]
