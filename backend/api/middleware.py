from urllib.parse import parse_qs
from django.contrib.auth.models import AnonymousUser
from rest_framework_simplejwt.tokens import AccessToken
from django.contrib.auth import get_user_model
from urllib.parse import parse_qs
import jwt
from django.conf import settings
User = get_user_model()

class JWTAUTHMIDDLEWARE:
    def __init__(self,app):
        self.app = app
        print("this is app",app)
    
    async def __call__(self,scope,receive,send):
        print("this is cope",scope.get('query_string')) 
        print("This is receive", receive)
        stringwala = scope.get('query_string',b'').decode()
        # print("this is stringwla", stringwala)
        parsed = parse_qs(stringwala)
        print("this is parsed",parsed)
        
        token = parsed.get('token',[None])[0]
        
        if token:
            print("this is token",token)
            try:
                payload = jwt.decode(token,settings.SECRET_KEY,algorithms=["HS256"])
                user_id = payload.get('user_id')
                print("this is user id", user_id)
                scope["user_id"] = user_id
                return await self.app(scope,receive,send)
            except Exception as e:
                print(e)   
        else:
            print("this is not")