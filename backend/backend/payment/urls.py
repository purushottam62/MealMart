# urls.py
from django.urls import path
from . import views

urlpatterns = [
    path("create-payment/", views.create_payment, name="create_payment"),
    path("payment/success", views.payment_success, name="payment_success"),
    path("payment/cancel", views.payment_cancel, name="payment_cancel"),
]
