from django.shortcuts import render

# Create your views here.
# order/views.py
from rest_framework import status
from rest_framework.decorators import api_view
from rest_framework.response import Response
from rest_framework_simplejwt.tokens import UntypedToken
from rest_framework_simplejwt.exceptions import InvalidToken
from django.contrib.auth.models import User
from django.conf import settings
from .models import Order
from locationdetails.models import DeliveryAddress
import jwt

@api_view(['POST'])
def accept_order(request):
    # Extract token and order details from request data
    token = request.data.get('token')
    itemName = request.data.get('itemName')
    price = request.data.get('price')
    imageUrl = request.data.get('imageUrl')

    # Address details
    address_data = {
        "city": request.data.get('city'),
        "state": request.data.get('state'),
        "street": request.data.get('street'),
        "houseNumber": request.data.get('houseNumber'),
        "famousLocation": request.data.get('famousLocation'),
        "pinCode": request.data.get('pinCode')
    }

    if not token:
        return Response({"error": "Token is required."}, status=status.HTTP_400_BAD_REQUEST)

    # Decode and validate the token
    try:
        UntypedToken(token)
        payload = jwt.decode(token, settings.SECRET_KEY, algorithms=["HS256"])
        user_id = payload.get("user_id")
        user = User.objects.get(id=user_id)
    except (InvalidToken, jwt.ExpiredSignatureError, User.DoesNotExist):
        return Response({"error": "Invalid or expired token."}, status=status.HTTP_401_UNAUTHORIZED)

    # Check if the address already exists for this user
    address, created = DeliveryAddress.objects.get_or_create(
        user=user,
        city=address_data["city"],
        state=address_data["state"],
        street=address_data["street"],
        houseNumber=address_data["houseNumber"],
        famousLocation=address_data["famousLocation"],
        pinCode=address_data["pinCode"]
    )

    # Create the order instance
    order = Order.objects.create(
        user=user,
        itemName=itemName,
        price=price,
        imageUrl=imageUrl,
        address=address
    )

    return Response(
        {
            "message": "Order placed successfully!",
            "order_id": order.id,
            "item_name": order.itemName,
            "price": float(order.price),  # convert Decimal to float for JSON response
        },
        status=status.HTTP_201_CREATED
    )
