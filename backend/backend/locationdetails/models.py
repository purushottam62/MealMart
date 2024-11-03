from django.db import models
from django.contrib.auth.models import User

class DeliveryAddress(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    street = models.CharField(max_length=100)
    houseNumber = models.CharField(max_length=100)
    famousLocation = models.CharField(max_length=100)
    pinCode = models.CharField(max_length=6)
    city = models.CharField(max_length=100)
    state = models.CharField(max_length=100)
    
    def __str__(self):
        return f"{self.houseNumber}, {self.street}"
