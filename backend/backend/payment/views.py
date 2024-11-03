from django.shortcuts import render

# Create your views here.
# views.py
import paypalrestsdk
from django.conf import settings

# Configure PayPal SDK
paypalrestsdk.configure({
    "mode": "sandbox",  # "sandbox" or "live"
    "client_id": "YOUR_CLIENT_ID",
    "client_secret": "YOUR_CLIENT_SECRET"
})
# views.py
from django.shortcuts import redirect, render
import paypalrestsdk

def create_payment(request):
    payment = paypalrestsdk.Payment({
        "intent": "sale",
        "payer": {
            "payment_method": "paypal"},
        "redirect_urls": {
            "return_url": "http://localhost:8000/payment/success",
            "cancel_url": "http://localhost:8000/payment/cancel"},
        "transactions": [{
            "item_list": {
                "items": [{
                    "name": "Item Name",
                    "sku": "item",
                    "price": "10.00",
                    "currency": "USD",
                    "quantity": 1}]},
            "amount": {
                "total": "10.00",
                "currency": "USD"},
            "description": "This is a test payment."}]})

    if payment.create():
        for link in payment.links:
            if link.rel == "approval_url":
                return redirect(link.href)  # Redirect user to PayPal for approval
    else:
        print(payment.error)  # Log the error for troubleshooting
    return render(request, "payment_error.html")
# views.py
def payment_success(request):
    payment_id = request.GET.get("paymentId")
    payer_id = request.GET.get("PayerID")

    payment = paypalrestsdk.Payment.find(payment_id)
    if payment.execute({"payer_id": payer_id}):  # Execute payment
        return render(request, "payment_success.html")
    else:
        print(payment.error)  # Log any error for troubleshooting
        return render(request, "payment_error.html")

def payment_cancel(request):
    return render(request, "payment_cancel.html")
