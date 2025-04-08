from django.db import models
import string
import random

# Create your models here. 写python code，一些抽象，逻辑的层面，与数据库相关

# def generate_unique_code():
#     length = 6

#     while True:
#         code = ''.join(random.choices(string.ascii_uppercase, k=length))
#         if Room.objects.filter(code=code).count() == 0:
#             break

#     return code


# class Room(models.Model):
#     code = models.CharField(max_length=8, default="", unique=True)
#     host = models.CharField(max_length=50, unique=True)
#     guset_can_pause = models.BooleanField(null=False, default=False)
#     votes_to_skip = models.IntegerField(null=False, default=1)
#     created_at1 = models.DateTimeField(auto_now_add=True)

class Login(models.Model):
    username = models.CharField(max_length=8, default="", unique=True)
    password = models.CharField(max_length=16, unique=False)
    created_at2 = models.DateTimeField(auto_now_add=True)