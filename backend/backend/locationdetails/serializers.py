# serializers.py
from rest_framework import serializers
from .models import Address

class AddressSerializer(serializers.ModelSerializer):
    class Meta:
        model = Address
        fields = ['id', 'street_number', 'house_name', 'famous_location', 'pincode', 'city', 'state']
