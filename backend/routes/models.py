from django.db import models

class Route(models.Model):
    name = models.CharField(max_length=100)
    start_point = models.CharField(max_length=100)
    end_point = models.CharField(max_length=100)
    total_distance_km = models.FloatField()
    estimated_time_min = models.IntegerField()

    def __str__(self):
        return f"{self.name}: {self.start_point} to {self.end_point}"