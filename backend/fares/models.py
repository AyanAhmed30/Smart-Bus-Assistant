from django.db import models
from routes.models import Route

class Fare(models.Model):
    route = models.ForeignKey(Route, on_delete=models.CASCADE)
    fare_amount = models.FloatField()

    def __str__(self):
        return f"Fare for {self.route.name} = Rs. {self.fare_amount}"

