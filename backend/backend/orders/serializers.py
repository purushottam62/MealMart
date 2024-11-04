# locationdetails/serializers.py
from rest_framework import serializers
from .models import DeliveryAddress

class DeliveryAddressSerializer(serializers.ModelSerializer):
    class Meta:
        model = DeliveryAddress
        fields = '__all__'


# order/serializers.py
from rest_framework import serializers
from .models import Order
from locationdetails.serializers import DeliveryAddressSerializer

class OrderSerializer(serializers.ModelSerializer):
    address = DeliveryAddressSerializer()  # Optional if you want to handle address nested

    class Meta:
        model = Order
        fields = '__all__'
