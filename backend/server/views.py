from django.shortcuts import render
from .models import Vkuser
from django.http import JsonResponse
from django.contrib.auth.models import User, Group
from .models import Vkuser


import json

costsPattern = json.dumps({"value": "",
                           "maxToday":
                           {
                               "value": "",
                               "temp": "",
                           },
                           "budget": "",
                           "daysToPayday": ""
                           })


def add_budget(request):
    req = json.loads(str(request.body, encoding='utf-8'))
    print('[add_budget:RECIVED]-->', req)
    response = {'RESPONSE': 'ERROR', 'PAYLOAD': ''}

    vk_id = str(req['vk_id'])
    budget = str(req['budget'])
    operation = str(req['operation'])
    daysToPayday = req['daysToPayday']
    all_users = Vkuser.objects.all()

    if operation == 'add':
        for field in all_users:
            if (vk_id == str(field.id_vk)):
                Vkuser.objects.filter(id_vk=vk_id).update(
                    budget=budget)

                response['RESPONSE'] = 'UPDATED_SUCCESS'
                response['PAYLOAD'] = budget
                print('[add_budget:RESPONSE]-->', response)
                return JsonResponse(response)

        user = Vkuser(id_vk=vk_id, budget=budget,
                      common=costsPattern, fun=costsPattern, invest=costsPattern)
        user.save()

        response['RESPONSE'] = 'ADDED_SUCCESS'
        response['PAYLOAD'] = budget
        print('[add_budget:RESPONSE]-->', response)

        return JsonResponse(response)

    if operation == 'change':
        maxCommonObject = 'EMPTY'
        for field in all_users:
            if (vk_id == field.id_vk):
                Vkuser.objects.filter(id_vk=vk_id).update(
                    budget=budget)

                maxCommonObject = json.loads(field.common)
                maxCommonObject["daysToPayday"] = daysToPayday
                maxCommonObject["maxToday"]["value"] = round((
                    float(budget) * 0.5) / int(daysToPayday), 2)
                maxCommonObject["maxToday"]["temp"] = maxCommonObject["maxToday"]["value"]
                maxCommonObject['budget'] = budget
                maxCommonObjectJSON = json.dumps(maxCommonObject)
                Vkuser.objects.filter(id_vk=vk_id).update(
                    common=maxCommonObjectJSON)

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
    elif operation == '+':
        for field in all_users:
            if (vk_id == field.id_vk):
                operation = float(field.budget) + float(budget)
                Vkuser.objects.filter(id_vk=vk_id).update(
                    budget=operation)

                response['RESPONSE'] = 'PLUS_SUCCESS'
                response['PAYLOAD'] = float(operation)
                print('[add_budget:RESPONSE]-->', response)

                return JsonResponse(response)

        return JsonResponse({'RESPONSE': '+ ERROR'})
    elif operation == '-':
        for field in all_users:
            if (vk_id == field.id_vk):
                operation = float(field.budget) - float(budget)
                Vkuser.objects.filter(id_vk=vk_id).update(
                    budget=operation)

                response['RESPONSE'] = 'MINUS_SUCCESS'
                response['PAYLOAD'] = float(operation)
                print('[add_budget:RESPONSE]-->', response)

                return JsonResponse(response)
        return JsonResponse({'RESPONSE': '-'})
    else:
        return JsonResponse({'RESPONSE': 'UNKNOWN OPERATION'})


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
    print('[add_budget:RECIVED]-->', req)
    response = {'RESPONSE': 'ERROR', 'PAYLOAD': ''}

    vk_id = str(req['vk_id'])
    pay_day = str(req['payday'])

    all_users = Vkuser.objects.all()

    for field in all_users:
        if (vk_id == field.id_vk):
            Vkuser.objects.filter(id_vk=vk_id).update(
                pay_day=pay_day)

            response['RESPONSE'] = 'UPDATED_SUCCESS'
            response['PAYLOAD'] = pay_day
            print('[add_budget:RESPONSE]-->', response)
            return JsonResponse(response)

    user = Vkuser(id_vk=vk_id,
                  pay_day=pay_day, common=costsPattern, fun=costsPattern, invest=costsPattern)
    user.save()

    response['RESPONSE'] = 'ADDED_SUCCESS'
    response['PAYLOAD'] = pay_day
    print('[add_budget:RESPONSE]-->', response)

    return JsonResponse(response)


def get_payday(request):
    req = json.loads(str(request.body, encoding='utf-8'))
    print('[add_budget:RECIVED]-->', req)
    response = {'RESPONSE': 'ERROR', 'PAYLOAD': ''}

    vk_id = req['vk_id']

    all_users = Vkuser.objects.all()

    for field in all_users:
        if (vk_id == field.id_vk):
            response['RESPONSE'] = True
            response['PAYLOAD'] = field.pay_day
            print('[add_budget:RESPONSE]-->', response)
            return JsonResponse(response)

    response['RESPONSE'] = False
    response['PAYLOAD'] = 'undefined'
    print('[add_budget:RESPONSE]-->', response)
    return JsonResponse(response)

# get all calc


def max_cost_to_day(request):
    req = json.loads(str(request.body, encoding='utf-8'))
    print('[add_budget:RECIVED]-->', req)
    response = {'RESPONSE': 'ERROR', 'PAYLOAD': ''}
    vk_id = str(req['vk_id'])
    budget = req['budget']
    typeCost = req['type']
    daysToPayday = int(req['daysToPayday'])
    maxCommonObject = 'EMPTY'
    all_users = Vkuser.objects.all()
    for field in all_users:
        if (vk_id == field.id_vk):
            maxCommonObject = json.loads(field.common)
            if (not maxCommonObject["daysToPayday"] == daysToPayday):
                maxCommonObject["daysToPayday"] = daysToPayday
                maxCommonObject['maxToday']["value"] = round((
                    float(budget) * 0.5) / int(daysToPayday), 2)
                maxCommonObject['maxToday']["temp"] = maxCommonObject['maxToday']["value"]
                maxCommonObject['budget'] = budget
                maxCommonObjectJSON = json.dumps(maxCommonObject)
                Vkuser.objects.filter(id_vk=vk_id).update(
                    common=maxCommonObjectJSON)
            # pay_day = field.pay_day
            # budget = float(field.budget)
            break

    # money=(budget*0.5) / (pay_day - today)

    print('====>', maxCommonObject)
    return JsonResponse(maxCommonObject)

# make operation


def max_cost_to_day_calc(request):
    req = json.loads(str(request.body, encoding='utf-8'))
    print('[add_budget:RECIVED]-->', req)
    response = {'RESPONSE': 'ERROR', 'PAYLOAD': ''}
    vk_id = str(req['vk_id'])
    money = req['money']
    typeCost = req['type']
    operation = req['operation']
    budget = req['budget']
    maxCommonObject = 'EMPTY'
    all_users = Vkuser.objects.all()

    if typeCost == 'common':
        for field in all_users:
            if (vk_id == field.id_vk):
                maxCommonObject = json.loads(field.common)
                if (operation == '-'):
                    maxCommonObject['maxToday']["temp"] = round(maxCommonObject['maxToday']["temp"] -
                                                                float(money), 2)
                    maxCommonObjectJSON = json.dumps(maxCommonObject)
                    Vkuser.objects.filter(id_vk=vk_id).update(
                        common=maxCommonObjectJSON)
                if (operation == '+'):
                    maxCommonObject['maxToday']["temp"] = round(maxCommonObject['maxToday']["temp"] +
                                                                float(money), 2)
                    maxCommonObjectJSON = json.dumps(maxCommonObject)
                    Vkuser.objects.filter(id_vk=vk_id).update(
                        common=maxCommonObjectJSON)

                break

        # money=(budget*0.5) / (pay_day - today)

        print('====>', maxCommonObject)
        return JsonResponse(maxCommonObject)
    elif typeCost == 'fun':
        maxCommonObject = 'EMPTY'
        return JsonResponse(maxCommonObject)


def get_costs_all(request):
    req = json.loads(str(request.body, encoding='utf-8'))
    print('[add_budget:RECIVED]-->', req)
    response = {'RESPONSE': 'ERROR', 'PAYLOAD': {
        'common:': '', 'fun': '', 'invest': ''}}
    vk_id = str(req['vk_id'])

    all_users = Vkuser.objects.all()
    for field in all_users:
        if (vk_id == field.id_vk):
            response['PAYLOAD']['common'] = json.loads(field.common)
            response['PAYLOAD']['fun'] = json.loads(field.fun)
            response['PAYLOAD']['invest'] = json.loads(field.invest)
            response['RESPONSE'] = 'SUCCES_FETCHED'
            return JsonResponse(response)
            break

    return JsonResponse(response)
