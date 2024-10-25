from rest_framework import serializers
from django.contrib.auth.hashers import check_password
from .models import User, Doctor, Appointment

class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = '__all__'

class DoctorSerializer(serializers.ModelSerializer):
    class Meta:
        model = Doctor
        fields = '__all__'

class AppointmentSerializer(serializers.ModelSerializer):
    class Meta:
        model = Appointment
        fields = '__all__'

class LoginSerializer(serializers.Serializer):
    email = serializers.EmailField()
    password = serializers.CharField(write_only=True)

    def validate(self, data):
        email = data.get('email')
        password = data.get('password')

        # Check in User model
        user = User.objects.filter(email=email).first()
        if user and check_password(password, user.password):
            return {'email': user.email, 'role': 'user'}

        # Check in Doctor model
        doctor = Doctor.objects.filter(email=email).first()
        if doctor and check_password(password, doctor.password):
            return {'email': doctor.email, 'role': 'doctor'}

        # If neither user nor doctor match, raise an error
        raise serializers.ValidationError('Values dont match')
