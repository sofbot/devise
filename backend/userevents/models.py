from django.db import models
from django.utils import timezone
import datetime
from django.contrib.auth.models import User
from events.models import Event


# Create your models here.
class UserEvent(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    event = models.ForeignKey(Event, on_delete=models.CASCADE)
    liked = models.BooleanField()
    seconds_viewed = models.IntegerField(default=-1)
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return self.event.title + ' ' + self.user.email

    def dict(self):
        field_pairs = [
            ['id'],
            ['user_id', 'userId'],
            ['event_id', 'eventId'],
            ['seconds_viewed', 'secondsViewed'],
            ['liked']]
        obj = {}
        for field_pair in field_pairs:
            if len(field_pair) == 1:
                field_pair = field_pair*2
            original_field, new_field = field_pair
            obj[new_field] = str(getattr(self, original_field))
        return obj


class Invitation(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    user_event = models.ForeignKey(UserEvent, on_delete=models.CASCADE)
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return str(self.user_event) + ' ' + self.user.email

    def dict(self):
        field_pairs = [
            ['user_event', 'userEventId'],
            ['user', 'userId']]
        obj = {}
        for field_pair in field_pairs:
            if len(field_pair) == 1:
                field_pair = field_pair*2
            original_field, new_field = field_pair
            obj[new_field] = str(getattr(self, original_field))
        return obj
