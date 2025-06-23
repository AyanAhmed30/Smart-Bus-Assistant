from django.db import models

class Bus(models.Model):
    OCCUPANCY_CHOICES = [
        ('Empty', 'Empty'),
        ('Medium', 'Medium'),
        ('Full', 'Full'),
    ]

    bus_number = models.CharField(max_length=50)
    plate_number = models.CharField(max_length=50)
    capacity = models.IntegerField()
    current_occupancy = models.CharField(max_length=10, choices=OCCUPANCY_CHOICES, default='Empty')
    is_active = models.BooleanField(default=True)

    def __str__(self):
        return f"{self.bus_number} ({self.plate_number})" 
