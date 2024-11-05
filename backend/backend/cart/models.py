from django.db import models

# Create your models here.
from django.db import models
from django.contrib.auth.models import User

class Cart(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    def __str__(self):
        return f"Cart of {self.user.username} - {self.created_at.strftime('%Y-%m-%d')}"

class CartItem(models.Model):
    cart = models.ForeignKey(Cart, related_name="items", on_delete=models.CASCADE)
    item_name = models.CharField(max_length=255)
    item_price = models.DecimalField(max_digits=10, decimal_places=2)
    item_image = models.URLField(max_length=1000)  # Link to the image URL
    quantity = models.PositiveIntegerField(default=1)

    def __str__(self):
        return f"{self.item_name} - ₹{self.item_price} x {self.quantity}"

    def total_price(self):
        return self.item_price * self.quantity
