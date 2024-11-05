from django.shortcuts import render

# Create your views here.
import jwt
from django.conf import settings
from django.shortcuts import get_object_or_404
from django.http import JsonResponse
from rest_framework.decorators import api_view
from rest_framework.response import Response
from rest_framework import status
from .models import Cart, CartItem

@api_view(['POST'])
def add_to_cart(request):
    # Get the token from the request body
    token = request.data.get("token")
    if not token:
        return Response({"error": "Token is required"}, status=status.HTTP_400_BAD_REQUEST)

    try:
        # Decode the token to get the user_id
        payload = jwt.decode(token, settings.SECRET_KEY, algorithms=["HS256"])
        user_id = payload.get("user_id")

        if not user_id:
            return Response({"error": "Invalid token"}, status=status.HTTP_401_UNAUTHORIZED)

        # Get or create the cart for the user
        cart, created = Cart.objects.get_or_create(user_id=user_id)

        # Extract item details from the request
        item_name = request.data.get("item_name")
        item_price = request.data.get("item_price")
        item_image = request.data.get("item_image")
        quantity = request.data.get("quantity", 1)

        if not all([item_name, item_price, item_image]):
            return Response({"error": "All item details are required"}, status=status.HTTP_400_BAD_REQUEST)

        # Check if the item already exists in the cart
        cart_item, item_created = CartItem.objects.get_or_create(
            cart=cart,
            item_name=item_name,
            defaults={"item_price": item_price, "item_image": item_image, "quantity": quantity},
        )

        # If the item exists, update its quantity
        if not item_created:
            cart_item.quantity += quantity
            cart_item.save()

        return JsonResponse({"message": "Item added to cart successfully"}, status=status.HTTP_200_OK)

    except jwt.ExpiredSignatureError:
        return Response({"error": "Token has expired"}, status=status.HTTP_401_UNAUTHORIZED)
    except jwt.InvalidTokenError:
        return Response({"error": "Invalid token"}, status=status.HTTP_401_UNAUTHORIZED)
    except Exception as e:
        return Response({"error": str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)


# In views.py in your `cart` app
import jwt
from django.http import JsonResponse
from django.views.decorators.csrf import csrf_exempt
from django.conf import settings
from .models import Cart, CartItem
from django.contrib.auth.models import User
import json

@csrf_exempt
def get_cart(request):
    if request.method == "POST":
        data = json.loads(request.body)
        token = data.get("token")

        try:
            # Decode the token to get the user ID
            decoded_token = jwt.decode(token, settings.SECRET_KEY, algorithms=["HS256"])
            user_id = decoded_token.get("user_id")
            user = User.objects.get(id=user_id)

            # Get or create the cart for the user
            cart, created = Cart.objects.get_or_create(user=user)

            # Get the cart items
            cart_items = CartItem.objects.filter(cart=cart)
            items = [
                {
                    "id": item.id,
                    "name": item.item_name,
                    "price": float(item.item_price),
                    "image": item.item_image,
                    "quantity": item.quantity,
                    "total_price": float(item.total_price()),
                }
                for item in cart_items
            ]

            return JsonResponse({"items": items}, status=200)

        except jwt.ExpiredSignatureError:
            return JsonResponse({"error": "Token has expired"}, status=401)
        except jwt.InvalidTokenError:
            return JsonResponse({"error": "Invalid token"}, status=401)
        except User.DoesNotExist:
            return JsonResponse({"error": "User not found"}, status=404)

