from django.db import models
from django.utils import timezone
import datetime
from django.contrib.auth.models import User

class Event(models.Model):
    source = models.CharField(max_length=100)
    custom_id = models.CharField(max_length=100, unique=True)
    image_url = models.CharField(max_length=200)
    url = models.CharField(max_length=200)
    title = models.CharField(max_length=100)
    summary = models.CharField(max_length=300)
    description = models.TextField()
    start_time = models.DateTimeField()
    end_time = models.DateTimeField()
    created_at = models.DateTimeField(auto_now_add=True, editable=False)

    def __str__(self):
        return self.title

    def happened(self):
        return self.start_time <= timezone.now()

    def dict(self):
        field_pairs = [
            ['custom_id', 'customId'],
            ['image_url', 'imageUrl'],
            ['url'],
            ['title'],
            ['summary'],
            ['description'],
            ['start_time', 'startTime'],
            ['end_time', 'endTime']]
        obj = {}
        for field_pair in field_pairs:
            if len(field_pair) == 1:
                field_pair = field_pair*2
            original_field, new_field = field_pair
            obj[new_field] = str(getattr(self, original_field))
        return obj
