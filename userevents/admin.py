from django.contrib import admin

# Register your models here.
from .models import UserEvent, Invitation
admin.site.register(UserEvent)
admin.site.register(Invitation)
