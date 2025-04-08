from django.shortcuts import render
from rest_framework import generics
from .serializers import LoginSerializer
from .models import Login

# Create your views here. 我们想展现在页面上的

# class RoomView(generics.CreateAPIView):
#     queryset = Room.objects.all()
#     serializer_class = RoomSerializer

class LoginView(generics.CreateAPIView):
    queryset = Login.objects.all()
    serializer_class = LoginSerializer