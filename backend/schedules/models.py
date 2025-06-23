from django.db import models
from buses.models import Bus
from routes.models import Route

class Schedule(models.Model):
    bus = models.ForeignKey(Bus, on_delete=models.CASCADE)
    route = models.ForeignKey(Route, on_delete=models.CASCADE)
    departure_time = models.TimeField()
    weekdays = models.CharField(max_length=100)  # e.g., "Mon,Tue,Wed"

    def __str__(self):
        return f"{self.bus.bus_number} - {self.route.name} at {self.departure_time}"

