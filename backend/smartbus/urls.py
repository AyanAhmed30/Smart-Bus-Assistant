# smartbus/urls.py
from django.contrib import admin
from django.urls import path, include

urlpatterns = [
    path('admin/', admin.site.urls),

    path('api/users/', include('users.urls')),
    path('api/buses/', include('buses.urls')),
    path('api/', include('routes.urls')),
    path('api/', include('schedules.urls')),
    path('api/', include('fares.urls')),
    path('api/', include('complaints.urls')),
    path('api/notifications/', include('notifications.urls')),






]
