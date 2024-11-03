from django.contrib.gis.geoip2 import GeoIP2
from .models import Location

def update_user_location(user, ip_address):
    g = GeoIP2()
    try:
        location = g.city(ip_address)
        Location.objects.update_or_create(
            user=user,
            defaults={
                'city': location.get('city'),
                'region': location.get('region'),
                'country': location.get('country_name'),
                'postal_code': location.get('postal_code')
            }
        )
    except Exception as e:
        print(f"GeoIP2 error: {e}")
