from rest_framework import serializers
from api.models import User,Department

class RegisterPatientSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ['username', 'email', 'password']
        extra_kwargs = {
            'password': {'write_only': True}
        }

    def create(self, validated_data):
        print("this is here?")
        
        email = validated_data.get('email')
        username = validated_data.get('username')
        password = validated_data.get('password')
        
        # Check if a user with the provided email already exists
        check_user = User.objects.filter(email=email).first()
        print("Checked user:", check_user)
        
        if check_user is not None:
            raise serializers.ValidationError("This email is already in use.")
        
        # Create the user if the email is unique
        user = User.objects.create_user(username=username,email=email,password=password)
        return user

class DepartmentSerializer(serializers.ModelSerializer):
    class Meta:
        model = Department
        fields = ['name']