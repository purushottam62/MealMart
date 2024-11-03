from django.http import JsonResponse
from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import IsAuthenticated
import requests
import json
from .models import DeliveryAddress
from rest_framework_simplejwt.authentication import JWTAuthentication
from django.contrib.auth.models import User
from rest_framework_simplejwt.tokens import UntypedToken,TokenError
@api_view(['POST'])
def fetch_address(request):
    print(request)
    print(request.body)
    """Fetch city and state based on the provided pincode."""
    try:
        data = json.loads(request.body)
        pincode = data.get('pinCode')

        # Validate the pincode
        if not pincode:
            return JsonResponse({'error': 'Pincode is required'}, status=400)

        # Use a pincode API to fetch city/state based on the provided pincode.
        response = requests.get(f"https://api.postalpincode.in/pincode/{pincode}")
        address_info = response.json()

        if address_info[0]['Status'] == 'Success':
           
            city = address_info[0]['PostOffice'][0]['District']
            state = address_info[0]['PostOffice'][0]['State']
            return JsonResponse({'city': city, 'state': state})
        else:
            return JsonResponse({'error': 'Invalid pincode'}, status=400)
    except (KeyError, IndexError, json.JSONDecodeError):
        return JsonResponse({'error': 'Error processing request'}, status=400)
    except requests.RequestException:
        return JsonResponse({'error': 'Failed to fetch data from pincode API'}, status=500)





@api_view(['POST'])
def save_address(request):
    """Save the delivery address for the authenticated user."""
    try:
        # Load JSON data from request body
        data = json.loads(request.body)
        
        # Extract token from the body
        token = data.get('token')
        if not token:
            return JsonResponse({'error': 'Token is required'}, status=400)

        # Verify the token and get user from token
        try:
            validated_token = UntypedToken(token)  # Validate token
            print("validated token as")
            user_id = validated_token['user_id']  # Extract user ID from token
        except TokenError as e:
            return JsonResponse({'error': 'Invalid or expired token', 'details': str(e)}, status=401)

        # Get user instance
        user = User.objects.get(id=user_id)
        print("got user as ",user)
        print("user printed successfully")

        # Save address details to the DeliveryAddress model
        address = DeliveryAddress.objects.create(
            user=user,
            street=data['street'],
            houseNumber=data['houseNumber'],
            famousLocation=data['famousLocation'],
            pinCode=data['pinCode'],
            city=data['city'],
            state=data['state'],
        )
        print(address)
        return JsonResponse({'message': 'Address saved successfully'}, status=201)

    except json.JSONDecodeError:
        return JsonResponse({'error': 'Invalid JSON data'}, status=400)
    except User.DoesNotExist:
        return JsonResponse({'error': 'User not found'}, status=404)
    except Exception as e:
        return JsonResponse({'error': str(e)}, status=500)
    
    

@api_view(['POST'])
def list_user_addresses(request):
    """Fetch all saved addresses for the authenticated user based on the token provided in the request body."""
    try:
        # Load JSON data from request body
        data = json.loads(request.body)
        token = data.get('token')
        print("token is ",token)
        
        if not token:
            return JsonResponse({'error': 'Token is required'}, status=400)

        # Verify the token and get user ID from the token
        try:
            validated_token = UntypedToken(token)
            user_id = validated_token['user_id']
        except TokenError as e:
            return JsonResponse({'error': 'Invalid or expired token', 'details': str(e)}, status=401)

        # Get user instance
        user = User.objects.get(id=user_id)

        # Fetch all addresses associated with this user
        addresses = DeliveryAddress.objects.filter(user=user)
        data = [
            {
                'street': address.street,
                'houseNumber': address.houseNumber,
                'famousLocation': address.famousLocation,
                'pincode': address.pinCode,
                'city': address.city,
                'state': address.state,
            }
            for address in addresses
        ]
        return JsonResponse(data, safe=False, status=200)

    except User.DoesNotExist:
        return JsonResponse({'error': 'User not found'}, status=404)
    except json.JSONDecodeError:
        return JsonResponse({'error': 'Invalid JSON data'}, status=400)
    except Exception as e:
        return JsonResponse({'error': str(e)}, status=500)

