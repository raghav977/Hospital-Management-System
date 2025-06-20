"""
ASGI config for backend project.

It exposes the ASGI callable as a module-level variable named ``application``.

For more information on this file, see
https://docs.djangoproject.com/en/4.2/howto/deployment/asgi/
"""

import os

from django.core.asgi import get_asgi_application
from api.routing import websocket_urlpatterns
from channels.routing import ProtocolTypeRouter, URLRouter
from api.middleware import JWTAUTHMIDDLEWARE


os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'backend.settings')

django_asgi_app = get_asgi_application()
application = ProtocolTypeRouter({
    'http':django_asgi_app,
    'websocket':JWTAUTHMIDDLEWARE(URLRouter(websocket_urlpatterns))
})
