from django.contrib.auth.models import AbstractUser, BaseUserManager
from django.db import models

class UserManager(BaseUserManager):
    def create_user(self, username, email, role='patient', password=None, department=None, staff_id=None):
        email = self.normalize_email(email)
        user = self.model(username=username, email=email, role=role)
        
        if role == 'doctor':
            user.is_doctor = True
            user.department = department
            user.staff_id = staff_id
        elif role == 'patient':
            user.is_patient = True
        elif role == 'admin':
            user.is_admin = True

        user.set_password(password)
        user.save(using=self._db)
        return user

    def create_superuser(self, email, username, password):
        user = self.create_user(username=username, email=email, password=password, role='admin')
        user.is_admin = True
        user.is_staff = True
        user.is_superuser = True 
        user.save(using=self._db)
        return user

class User(AbstractUser):
    is_doctor = models.BooleanField(default=False)
    is_patient = models.BooleanField(default=False)
    is_admin = models.BooleanField(default=False)
    email = models.EmailField(unique=True, blank=False)
    department = models.CharField(max_length=100, blank=True)
    username = models.CharField(max_length=40, unique=True, blank=False)
    role = models.CharField(max_length=30)
    staff_id = models.CharField(max_length=20, blank=True,unique=False)

    USERNAME_FIELD = 'email'
    REQUIRED_FIELDS = ['username']
    
    objects = UserManager()

    def __str__(self):
        return self.email  # Return email for better identification

class Department(models.Model):
    name = models.CharField(max_length=200,blank=False)
    
    def __str__(self):
        return f"{self.name}"

class Doctor(models.Model):
    user = models.OneToOneField(User, on_delete=models.CASCADE, related_name='doctor_profile')
    department = models.ForeignKey(Department, on_delete=models.CASCADE)
    profile_img = models.ImageField(upload_to='doctor_profile/', null=True, blank=True)

    def __str__(self):
        return f"{self.user.username} - {self.department.name}"


class Appointment(models.Model):
    name = models.CharField(max_length=100)
    contact_number = models.CharField(max_length=10)
    address = models.CharField(max_length=100)
    appointment_date = models.DateField() 
    department = models.ForeignKey(Department, on_delete=models.CASCADE)
    doctor = models.ForeignKey(Doctor, on_delete=models.CASCADE)
    reason_for_appointment = models.CharField(max_length=800)

    def __str__(self):
        return f"Appointment for {self.name} on {self.appointment_date}"


