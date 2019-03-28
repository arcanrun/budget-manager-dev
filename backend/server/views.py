from django.shortcuts import render
from .models import Vkuser
from django.http import JsonResponse
from django.contrib.auth.models import User, Group


import json


def add_budget(request):
    req = json.loads(str(request.body, encoding='utf-8'))
    print('[add_budget:RECIVED]-->', req)
    response = {'RESPONSE': 'ERROR'}

    vk_id = req['vk_id']
    budget = req['budget']
    response['RESPONSE'] = budget

    return JsonResponse(response)


def add_payday(request):
    req = json.loads(str(request.body, encoding='utf-8'))
    print('[add_payday:RECIVED]-->', req)
    response = {'RESPONSE': 'ERROR'}

    vk_id = req['vk_id']
    payday = req['payday']
    response['RESPONSE'] = payday

    return JsonResponse(response)
