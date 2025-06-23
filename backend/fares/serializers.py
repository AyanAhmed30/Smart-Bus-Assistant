from rest_framework import serializers
from .models import Fare
from routes.models import Route

class FareSerializer(serializers.ModelSerializer):
    route_name = serializers.SerializerMethodField()

    class Meta:
        model = Fare
        fields = ['id', 'route', 'route_name', 'fare_amount']

    def get_route_name(self, obj):
        return f"{obj.route.name} ({obj.route.start_point} → {obj.route.end_point})"
