from django.contrib import admin
from django.urls import path, include

urlpatterns = [
    path('admin/', admin.site.urls),
    path('api/v1/', include('userAuthentication.urls')),  # Existing app
    path('api/v2/', include('locationdetails.urls')), 
     path('api/v3/', include('orders.urls')),# New app with api/v2 prefix
    # path('api/payment/', include('payment')),           # Placeholder for other apps
]
