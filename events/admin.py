from django.contrib import admin

# Register your models here.

from .models import Event, EventQuery
admin.site.register(Event)
admin.site.register(EventQuery)
