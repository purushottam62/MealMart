from django.urls import path
from .views import RegisterApi, LoginApi, ProfileApi

urlpatterns = [
    path('register/', RegisterApi.as_view(), name='register'),
    path('login/', LoginApi.as_view(), name='login'),
    path('profile/', ProfileApi.as_view(), name='profile'),
]
