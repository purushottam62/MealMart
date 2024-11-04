# order/urls.py
from django.urls import path
from . import views

urlpatterns = [
    path('accept_order/', views.accept_order, name='accept_order'),
]
