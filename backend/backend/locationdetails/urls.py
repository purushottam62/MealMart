from django.urls import path
from . import views

urlpatterns = [
    path('fetch-address/', views.fetch_address, name='fetch_address'),
    path('save-address/', views.save_address, name='save_address'),
     path('addresses/', views.list_user_addresses, name='list_user_addresses'),
]
