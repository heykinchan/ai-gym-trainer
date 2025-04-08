# 路径path
from django.urls import path
from .views import LoginView

urlpatterns = [
    path('home', LoginView.as_view())
    
]

