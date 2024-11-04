from django.db import models
from django.contrib.auth.models import User
from locationdetails.models import DeliveryAddress

class Order(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    itemName = models.CharField(max_length=255)
    price = models.DecimalField(max_digits=10, decimal_places=2)
    imageUrl = models.URLField(max_length=1000)  # Increased length to 1000
    createdAt = models.DateTimeField(auto_now_add=True)
    address = models.ForeignKey(DeliveryAddress, on_delete=models.CASCADE)  # New field for 
 
    def __str__(self):
        return f"{self.itemName} - {self.price} by {self.user.username}"
