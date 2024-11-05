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
    print("request data is ", request.data)
    token = request.data.get('token')
    itemName = request.data.get('itemName')
    price = request.data.get('price')
    imageUrl = request.data.get('imageUrl')

    # Address details
    address_data = request.data.get('address', {})
    print("address data is ",address_data)
    
    if not address_data:  # Check if address_data is empty
        return Response({"error": "Address data is required."}, status=status.HTTP_400_BAD_REQUEST)

    # Extracting address details safely
    city = address_data.get('city')
    state = address_data.get('state')
    street = address_data.get('street')
    houseNumber = address_data.get('houseNumber')
    famousLocation = address_data.get('famousLocation')
    pinCode = address_data.get('pinCode')

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
        city=city,
        state=state,
        street=street,
        houseNumber=houseNumber,
        famousLocation=famousLocation,
        pinCode=pinCode
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
            "price": float(order.price),  # Convert Decimal to float for JSON response
        },
        status=status.HTTP_201_CREATED
    )





from django.http import JsonResponse
from django.views.decorators.csrf import csrf_exempt
from rest_framework.decorators import api_view
from rest_framework.response import Response
from rest_framework import status
import jwt
from django.conf import settings
from .models import Order
from locationdetails.models import DeliveryAddress


@csrf_exempt
@api_view(['POST'])
def fetch_orders(request):
    # Extract the token from the request body
    token = request.data.get('token')
    print("token is ",token)
    if not token:
        return Response({"error": "Token is required"}, status=status.HTTP_400_BAD_REQUEST)

    try:
        # Decode the token to get user information (Adjust as per your JWT setup)
        payload = jwt.decode(token, settings.SECRET_KEY, algorithms=["HS256"])
        user_id = payload.get("user_id")
        print("user id is ",user_id)

        # Fetch orders for the user
        orders = Order.objects.filter(user_id=user_id)  # Assuming Order has a foreign key `user`
        order_data = [
            {
                "order_id": order.id,
                "product": order.itemName,
                "price": float(order.price),  # Ensure price is serialized as float
                "image": order.imageUrl,
                "date_ordered": order.createdAt,
                "address": {
                    "street": order.address.street,
                    "house_number": order.address.houseNumber,
                    "city": order.address.city,
                    "state": order.address.state,
                    "pincode": order.address.pinCode,
                    "famous_location": order.address.famousLocation
                } if order.address else None,
            }
            for order in orders
        ]

        if not order_data:
            return JsonResponse({"orders": [], "message": "No orders found."}, safe=False)

        return JsonResponse({"orders": order_data}, safe=False)

    except jwt.ExpiredSignatureError:
        return Response({"error": "Token has expired"}, status=status.HTTP_401_UNAUTHORIZED)
    except jwt.InvalidTokenError:
        return Response({"error": "Invalid token"}, status=status.HTTP_401_UNAUTHORIZED)
    except Exception as e:
        return Response({"error": str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)
