from channels.generic.websocket import AsyncWebsocketConsumer
import json
from .models import User
from channels.db import database_sync_to_async
class ChatConsumer(AsyncWebsocketConsumer):
    async def connect(self):
        print("this is ",self.scope)
        user_id = self.scope['user_id']
        
        user = await self.get_users()
        print("connected user: ", user.username)
        
        self.room_name = f"user-{user.id}"
        print("this is user room ", self.room_name) 
        await self.channel_layer.group_add(self.room_name,self.channel_name)
        
        print("k admin ho?", user.is_admin)
        if user.is_admin:
            await self.channel_layer.group_add("chat_admin",self.channel_name)
            
    
        await self.accept()
    
    async def receive(self,text_data=None):
        data = json.loads(text_data)
        print(data)
        user = await self.get_users()
        send_message = {
            "message":data.get('message'),
            "sender_id": self.scope["user_id"],
            "user": user.username
        }
        # jsonwala = json.dumps(send_message)
        
        print("this is message", data)
        
        await self.channel_layer.group_send("chat_admin",{
            "type":"chat_message",
            "message":send_message,
        })
    
    async def chat_message(self,event):
        print("this is event",event)
        message = event['message']
        sending = {
            "message":message
        }
        jsontype = json.dumps(sending)
        await self.send(text_data=jsontype)
        # message = event['message']
        # user = event["user"]
        # sendinguta = {
        #     "message":message,
        # }
        # abareal = json.dumps(sendinguta)
        # await self.send(text_data=abareal)
        
        
        
        
    
    @database_sync_to_async
    def get_admin_users(self):
        return list(User.objects.filter(is_admin=True))
    
    @database_sync_to_async
    def get_users(self):
        id = self.scope['user_id']
        user = User.objects.get(pk=id)
        return user