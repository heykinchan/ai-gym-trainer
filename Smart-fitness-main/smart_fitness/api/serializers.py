# 翻译python代码到jason

from rest_framework import serializers
from .models import Login

# class RoomSerializer(serializers.ModelSerializer):
#     class Meta:
#         model =Room
#         fields = ('id', 'code', 'host', 'guset_can_pause', 'votes_to_skip', 'created_at1')

class LoginSerializer(serializers.ModelSerializer):
    class Meta:
        model = Login
        fields = ('id', 'username', 'password', 'created_at2')