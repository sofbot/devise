from django.db import models
import datetime
from django.contrib.auth.models import User


class EventQuery(models.Model):
    source = models.CharField(max_length=100)
    date = models.DateField()
    create_date = models.DateField(auto_now_add=True)
    create_time = models.TimeField(auto_now_add=True)

    def __str__(self):
        return "Queried {0} on {1} at {2} on {3}".format(
            self.source,
            self.create_date,
            self.create_time,
            self.date)


class Event(models.Model):
    source = models.CharField(max_length=100)
    custom_id = models.CharField(max_length=100, unique=True, primary_key=True)
    image_url = models.CharField(max_length=200, null=True, blank=True)
    url = models.CharField(max_length=200)
    title = models.CharField(max_length=100)
    location = models.CharField(max_length=100)
    address = models.CharField(max_length=100, blank=True)
    summary = models.CharField(max_length=1000)
    free = models.BooleanField()
    description = models.TextField(null=True, blank=True)
    start_date = models.DateField()
    start_time = models.TimeField()
    end_date = models.DateField()
    end_time = models.TimeField(null=True, blank=True)
    create_date = models.DateField(auto_now_add=True)
    create_time = models.TimeField(auto_now_add=True)

    def __str__(self):
        fields = [
            'title',
            'custom_id',
            'image_url',
            'url',
            'summary',
            'source',
            'description',
            'location',
            'address',
            'free',
            'start_time',
            'start_date',
            'end_time',
            'end_date']
        fields = [field+": "+ str(getattr(self, field)) for field in fields]
        return "\n".join(fields)

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
            ['location'],
            ['address'],
            ['free'],
            ['start_time', 'startTime'],
            ['start_date', 'startDate'],
            ['end_time', 'endTime'],
            ['end_date', 'endDate']]
        obj = {}
        for field_pair in field_pairs:
            if len(field_pair) == 1:
                field_pair = field_pair*2
            original_field, new_field = field_pair
            obj[new_field] = str(getattr(self, original_field))
        return obj
