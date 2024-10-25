from rest_framework import viewsets, status
from .models import User, Doctor, Appointment  # Import your models
from .serializers import UserSerializer, DoctorSerializer, AppointmentSerializer  # Import serializers
from django.http import HttpResponse
from rest_framework.response import Response
from rest_framework.decorators import api_view
from django.contrib.auth import authenticate
from django.contrib.auth.hashers import check_password
from django.contrib.auth import get_user_model
import logging
from rest_framework import generics
from rest_framework.permissions import IsAuthenticated

def home(request):
    return HttpResponse("<h1>Welcome to the Mental Health Finder App</h1>")

# ViewSet for User model
class UserViewSet(viewsets.ModelViewSet):
    queryset = User.objects.all()
    serializer_class = UserSerializer

# ViewSet for Doctor model
class DoctorViewSet(viewsets.ModelViewSet):
    queryset = Doctor.objects.all()
    serializer_class = DoctorSerializer

# ViewSet for Appointment model
class AppointmentViewSet(viewsets.ModelViewSet):
    queryset = Appointment.objects.all()
    serializer_class = AppointmentSerializer


from django.contrib.auth.hashers import check_password

@api_view(['POST'])
def login_view(request):
    email = request.data.get('email')
    password = request.data.get('password')

    if not email or not password:
        return Response({"error": "Please provide both email and password."}, status=status.HTTP_400_BAD_REQUEST)

    # Try to get the user from User model
    try:
        user = User.objects.get(email=email)
        if check_password(password, user.password):
            return Response({'message': 'Login successful', 'role': 'user'}, status=status.HTTP_200_OK)
    except User.DoesNotExist:
        pass  # If user does not exist, check Doctor model

    # Try to get the user from Doctor model
    try:
        doctor = Doctor.objects.get(email=email)
        if check_password(password, doctor.password):
            return Response({'message': 'Login successful', 'role': 'doctor'}, status=status.HTTP_200_OK)
    except Doctor.DoesNotExist:
        pass  # If doctor does not exist, fall through to the final error response

    # If both checks fail
    return Response({"error": "Invalid credentials"}, status=status.HTTP_400_BAD_REQUEST)
