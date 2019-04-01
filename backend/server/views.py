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

    if operation == 'change':
        for field in all_users:
            if (vk_id == field.id_vk):
                Vkuser.objects.filter(id_vk=vk_id).update(
                    budget=budget)

                commonObject = json.loads(field.common)
                funObject = json.loads(field.fun)
                investObject = json.loads(field.invest)

                commonObject["daysToPayday"] = daysToPayday
                funObject["daysToPayday"] = daysToPayday
                investObject["daysToPayday"] = daysToPayday

                commonObject['value'] = float(budget) * 0.5
                funObject['value'] = float(budget) * 0.3
                investObject['value'] = float(budget) * 0.2

                commonObject["maxToday"]["value"] = round((
                    float(budget) * 0.5) / int(daysToPayday), 2)
                funObject["maxToday"]["value"] = round((
                    float(budget) * 0.3) / int(daysToPayday), 2)
                investObject["maxToday"]["value"] = round((
                    float(budget) * 0.2) / int(daysToPayday), 2)

                commonObject["maxToday"]["temp"] = commonObject["maxToday"]["value"]
                funObject["maxToday"]["temp"] = funObject["maxToday"]["value"]
                investObject["maxToday"]["temp"] = investObject["maxToday"]["value"]

                commonObject['budget'] = budget
                funObject['budget'] = budget
                investObject['budget'] = budget

                commonObjectJSON = json.dumps(commonObject)
                funObjectJSON = json.dumps(funObject)
                investObjectJSON = json.dumps(investObject)

                Vkuser.objects.filter(id_vk=vk_id).update(
                    common=commonObjectJSON, fun=funObjectJSON, invest=investObjectJSON)

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
            return JsonResponse(response)

    user = Vkuser(id_vk=vk_id,
                  pay_day=pay_day, common=costsPattern, fun=costsPattern, invest=costsPattern)
    user.save()

    response['RESPONSE'] = 'ADDED_SUCCESS'
    response['PAYLOAD'] = pay_day

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


# make operation


def temp_today_cost(request):
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
                    newBudget = float(field.budget) - float(budget)
                    maxCommonObject['maxToday']['temp'] = round(
                        maxCommonObject['maxToday']['temp'] - float(money), 2)
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
    daysToPayday = int(req['daysToPayday'])
    budget = req['budget']

    all_users = Vkuser.objects.all()
    for field in all_users:
        if (vk_id == field.id_vk):

            commonObject = json.loads(field.common)
            funObject = json.loads(field.common)
            investObject = json.loads(field.common)

            if (commonObject["daysToPayday"] != daysToPayday):
                commonObject["daysToPayday"] = daysToPayday
                funObject["daysToPayday"] = daysToPayday
                investObject["daysToPayday"] = daysToPayday

                commonObject['maxToday']["value"] = round((
                    float(budget) * 0.5) / int(daysToPayday), 2)
                commonObject['maxToday']["temp"] = commonObject['maxToday']["value"]
                commonObject['budget'] = budget
                commonObjectJSON = json.dumps(commonObject)

                funObject['maxToday']["value"] = round((
                    float(budget) * 0.3) / int(daysToPayday), 2)
                funObject['maxToday']["temp"] = funObject['maxToday']["value"]
                funObject['budget'] = budget
                funObjectJSON = json.dumps(funObject)

                investObject['maxToday']["value"] = round((
                    float(budget) * 0.3) / int(daysToPayday), 2)
                investObject['maxToday']["temp"] = investObject['maxToday']["value"]
                investObject['budget'] = budget
                investObjectJSON = json.dumps(investObject)

                Vkuser.objects.filter(id_vk=vk_id).update(
                    common=commonObjectJSON, fun=funObjectJSON, invest=investObjectJSON)

            response['PAYLOAD']['common'] = json.loads(field.common)
            response['PAYLOAD']['fun'] = json.loads(field.fun)
            response['PAYLOAD']['invest'] = json.loads(field.invest)
            response['RESPONSE'] = 'SUCCES_FETCHED'
            return JsonResponse(response)
            break

    return JsonResponse(response)
