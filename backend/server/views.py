from django.shortcuts import render
from .models import Vkuser
from django.http import JsonResponse
from django.contrib.auth.models import User, Group
from .models import Vkuser


import json


def add_budget(request):
    req = json.loads(str(request.body, encoding='utf-8'))
    print('[add_budget:RECIVED]-->', req)
    response = {'RESPONSE': 'ERROR', 'PAYLOAD': ''}

    vk_id = str(req['vk_id'])
    budget = str(req['budget'])

    all_users = Vkuser.objects.all()

    for field in all_users:
        if (vk_id == field.id_vk):
            Vkuser.objects.filter(id_vk=vk_id).update(
                budget=budget)

            response['RESPONSE'] = 'UPDATED_SUCCESS'
            response['PAYLOAD'] = budget
            print('[add_budget:RESPONSE]-->', response)
            return JsonResponse(response)

    user = Vkuser(id_vk=vk_id,
                  budget=budget)
    user.save()

    response['RESPONSE'] = 'ADDED_SUCCESS'
    response['PAYLOAD'] = budget
    print('[add_budget:RESPONSE]-->', response)

    return JsonResponse(response)


def get_budget(request):
    req = json.loads(str(request.body, encoding='utf-8'))
    print('[add_budget:RECIVED]-->', req)
    response = {'RESPONSE': 'ERROR', 'PAYLOAD': ''}

    vk_id = req['vk_id']

    all_users = Vkuser.objects.all()

    for field in all_users:
        if (vk_id == field.id_vk):
            response['RESPONSE'] = True
            response['PAYLOAD'] = field.budget
            print('[add_budget:RESPONSE]-->', response)
            return JsonResponse(response)

    response['RESPONSE'] = False
    response['PAYLOAD'] = 'undefined'
    print('[add_budget:RESPONSE]-->', response)
    return JsonResponse(response)


def add_payday(request):
    req = json.loads(str(request.body, encoding='utf-8'))
    print('[add_payday:RECIVED]-->', req)
    response = {'RESPONSE': 'ERROR'}

    vk_id = req['vk_id']
    payday = req['payday']
    response['RESPONSE'] = payday

    return JsonResponse(response)
