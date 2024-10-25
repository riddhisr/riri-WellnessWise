#mental_health_finder_backend/urls.py

from django.contrib import admin
from django.urls import path, include
from django.conf import settings
from django.conf.urls.static import static
from api import views  # Assuming you have your app named 'api'
from api.views import home  # Import the home view

urlpatterns = [
    path('admin/', admin.site.urls),
    path('api/', include('api.urls')),  # Include your app URLs here
    path('', views.home, name='home'),  # Assuming you have a 'home' view in your app
    path('api/login/', views.login_view),  # Login endpoint
]

# Serving media files during development
if settings.DEBUG:
    urlpatterns += static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)
