from django.db import models
from django.utils import timezone
import datetime
from django.contrib.auth.models import User
from events.models import Event


# Create your models here.
class UserEvent(models.Model):
    # user = models.ForeignKey(User, on_delete=models.CASCADE)
    user_id = models.IntegerField(default=-1)
    event = models.ForeignKey(Event, on_delete=models.CASCADE)
    liked = models.BooleanField()
    seconds_viewed = models.IntegerField(default=-1)
    seen_date = models.DateField(auto_now_add=True)
    seen_time = models.TimeField(auto_now_add=True)

    class Meta:
        unique_together = ('user_id', 'event', 'liked')

    def __str__(self):
        arr = []
        return "{0} event: {1} user: {2} liked: {3} at: {4}".format(
        self.id,
        self.event.title,
        self.user_id,
        self.liked,
        self.seen_time)

    def dict(self):
        field_pairs = [
            ['user_id', 'userId'],
            ['event_id', 'eventId'],
            ['seconds_viewed', 'secondsViewed'],
            ['seen_date', 'seenDate'],
            ['seen_time', 'seenTime'],
            ['liked']]
        obj = {}
        for field_pair in field_pairs:
            if len(field_pair) == 1:
                field_pair = field_pair*2
            original_field, new_field = field_pair
            obj[new_field] = str(getattr(self, original_field))
        return obj

class Invitation(models.Model):
    email = models.EmailField()
    userevent = models.ForeignKey(UserEvent, on_delete=models.CASCADE)
    create_date = models.DateField(auto_now_add=True)
    create_time = models.TimeField(auto_now_add=True)

    def __str__(self):
        return str(self.userevent) + ' ' + self.email

    def dict(self):
        return {'userEmail': self.user.email}
