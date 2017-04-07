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
    seen_at = models.DateTimeField()
    seconds_viewed = models.IntegerField(default=-1)
    create_date = models.DateField(auto_now_add=True)
    create_time = models.TimeField(auto_now_add=True)

    def __str__(self):
        return self.event.title + ' ' + self.user.email

    def dict(self):
        field_pairs = [
            ['id'],
            ['user_id', 'userId'],
            ['event_id', 'eventId'],
            ['seconds_viewed', 'secondsViewed'],
            ['seen_at', 'seenAt'],
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
    userevent = models.ForeignKey(UserEvent, on_delete=models.CASCADE)
    create_date = models.DateField(auto_now_add=True)
    create_time = models.TimeField(auto_now_add=True)

    def __str__(self):
        return str(self.userevent) + ' ' + self.user.email

    def dict(self):
        return {'userEmail': self.user.email}
