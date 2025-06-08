from django.contrib import admin
from api.models import User,Doctor,Department,Appointment
# Register your models here.

admin.site.register(User)
admin.site.register(Doctor)
admin.site.register(Department)
admin.site.register(Appointment)