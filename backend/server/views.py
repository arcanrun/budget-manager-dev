from django.shortcuts import render
from .models import Vkuser
from django.http import JsonResponse
from django.contrib.auth.models import User, Group
from .models import Vkuser


import json

# costsPattern = json.dumps({"value": "",
#                            "maxToday":
#                            {
#                                "value": "",
#                                "temp": "",
#                            },
#                            "budget": "",
#                            "daysToPayday": ""
#                            })

costsPattern = json.dumps({
    "maxToday": "",
    "temp": ""
})


def make_calculations(field_common, filed_fun, file_invest, daysToPayday, budget):

    commonObject = json.loads(field_common)
    funObject = json.loads(filed_fun)
    investObject = json.loads(file_invest)

    commonObject["maxToday"] = round((
        float(budget) * 0.5) / int(daysToPayday), 2)
    funObject["maxToday"] = round((
        float(budget) * 0.3) / int(daysToPayday), 2)
    investObject["maxToday"] = round((
        float(budget) * 0.2) / int(daysToPayday), 2)

    commonObject["temp"] = commonObject["maxToday"]
    funObject["temp"] = funObject["maxToday"]
    investObject["temp"] = investObject["maxToday"]

    commonObjectJSON = json.dumps(commonObject)
    funObjectJSON = json.dumps(funObject)
    investObjectJSON = json.dumps(investObject)
    return [commonObjectJSON, funObjectJSON, investObjectJSON]




def add_budget(request):
    req = json.loads(str(request.body, encoding='utf-8'))

    response = {'RESPONSE': 'ERROR', 'PAYLOAD': {}}

    vk_id = str(req['vk_id'])
    budget = float(req['budget'])
    operation = str(req['operation'])

    all_users = Vkuser.objects.all()

    if operation == 'add':
        print('[add_budget:RECIVED]-->', req)
        for field in all_users:
            if (vk_id == field.id_vk):
                Vkuser.objects.filter(id_vk=vk_id).update(
                    budget=budget)

                response['PAYLOAD']['common'] = json.loads(field.common)
                response['PAYLOAD']['fun'] = json.loads(field.fun)
                response['PAYLOAD']['invest'] = json.loads(field.invest)
                response['PAYLOAD']['budget'] = field.budget
                response['PAYLOAD']['pay_day'] = field.pay_day
                response['PAYLOAD']['days_to_payday'] = field.days_to_payday

                response['RESPONSE'] = 'NEW_BUDGET_ADDED'
                response['PAYLOAD']['budget'] = budget
                print('[add_budget:RESPONSE]-->', response)
                return JsonResponse(response)

    if operation == 'change':
        print('[change_budget:RECIVED]-->', req)
        daysToPayday = req['daysToPayday']
        for field in all_users:
            if (vk_id == field.id_vk):

                resArr = make_calculations(
                    field.common, field.fun, field.invest, field.days_to_payday, budget)
                Vkuser.objects.filter(id_vk=vk_id).update(
                    budget=budget, common=resArr[0], fun=resArr[1], invest=resArr[2])
                break
        updated_all_users = Vkuser.objects.all()
        for field in updated_all_users:
            if (vk_id == field.id_vk):
                response['PAYLOAD']['common'] = json.loads(field.common)
                response['PAYLOAD']['fun'] = json.loads(field.fun)
                response['PAYLOAD']['invest'] = json.loads(field.invest)
                response['PAYLOAD']['budget'] = field.budget
                response['PAYLOAD']['pay_day'] = field.pay_day
                response['PAYLOAD']['days_to_payday'] = field.days_to_payday
                response['RESPONSE'] = 'SUCCES_FETCHED'
                response['TEST'] = resArr
                print('[change_budget:RESPONSE]-->', response)

                return JsonResponse(response)

        user = Vkuser(id_vk=vk_id,
                      budget=budget)
        user.save()

        response['RESPONSE'] = 'ADDED_SUCCESS'
        response['PAYLOAD'] = budget
        print('[add_budget:RESPONSE]-->', response)

        return JsonResponse(response)
    # elif operation == '+':
    #     for field in all_users:
    #         if (vk_id == field.id_vk):
    #             operation = float(field.budget) + float(budget)
    #             Vkuser.objects.filter(id_vk=vk_id).update(
    #                 budget=operation)

    #             response['RESPONSE'] = 'PLUS_SUCCESS'
    #             response['PAYLOAD'] = float(operation)
    #             print('[add_budget:RESPONSE]-->', response)

    #             return JsonResponse(response)

    #     return JsonResponse({'RESPONSE': '+ ERROR'})
    # elif operation == '-':
    #     for field in all_users:
    #         if (vk_id == field.id_vk):
    #             operation = float(field.budget) - float(budget)
    #             Vkuser.objects.filter(id_vk=vk_id).update(
    #                 budget=operation)

    #             response['RESPONSE'] = 'MINUS_SUCCESS'
    #             response['PAYLOAD'] = float(operation)
    #             print('[add_budget:RESPONSE]-->', response)

    #             return JsonResponse(response)
    #     return JsonResponse({'RESPONSE': '-'})
    # else:
    #     return JsonResponse({'RESPONSE': 'UNKNOWN OPERATION'})


# def get_budget(request):
#     req = json.loads(str(request.body, encoding='utf-8'))
#     print('[add_budget:RECIVED]-->', req)
#     response = {'RESPONSE': 'ERROR', 'PAYLOAD': ''}

#     vk_id = req['vk_id']

#     all_users = Vkuser.objects.all()

#     for field in all_users:
#         if (vk_id == field.id_vk):
#             response['RESPONSE'] = True
#             response['PAYLOAD'] = field.budget
#             print('[add_budget:RESPONSE]-->', response)
#             return JsonResponse(response)

#     response['RESPONSE'] = False
#     response['PAYLOAD'] = 'undefined'
#     print('[add_budget:RESPONSE]-->', response)
#     return JsonResponse(response)


def add_payday(request):
    req = json.loads(str(request.body, encoding='utf-8'))
    print('[add_payday:RECIVED]-->', req)
    response = {'RESPONSE': 'ERROR', 'PAYLOAD': {}}

    vk_id = str(req['vk_id'])
    pay_day = str(req['payday'])
    days_to_payday = int(req['days_to_payday'])

    all_users = Vkuser.objects.all()

    for field in all_users:
        if (vk_id == field.id_vk):

            budget = field.budget

            resArr = make_calculations(
                field.common, field.fun, field.invest, days_to_payday, budget)

            Vkuser.objects.filter(id_vk=vk_id).update(
                pay_day=pay_day, days_to_payday=days_to_payday, common=resArr[0], fun=resArr[1], invest=resArr[2])
            break
    updated_all_users = Vkuser.objects.all()
    for field in updated_all_users:
        if (vk_id == field.id_vk):
            response['PAYLOAD']['common'] = json.loads(field.common)
            response['PAYLOAD']['fun'] = json.loads(field.fun)
            response['PAYLOAD']['invest'] = json.loads(field.invest)
            response['PAYLOAD']['budget'] = field.budget
            response['PAYLOAD']['pay_day'] = field.pay_day
            response['PAYLOAD']['days_to_payday'] = field.days_to_payday
            response['RESPONSE'] = 'SUCCES_FETCHED'
            response['TEST'] = resArr
            print('[add_payday:RESPONSE]-->', response)

            return JsonResponse(response)

    user = Vkuser(id_vk=vk_id,
                  pay_day=pay_day, common=resArr[0], fun=resArr[1], invest=resArr[2])
    user.save()

    response['RESPONSE'] = 'ADDED_SUCCESS'
    response['PAYLOAD'] = pay_day

    return JsonResponse(response)


# def get_payday(request):
#     req = json.loads(str(request.body, encoding='utf-8'))
#     print('[add_budget:RECIVED]-->', req)
#     response = {'RESPONSE': 'ERROR', 'PAYLOAD': ''}

#     vk_id = req['vk_id']

#     all_users = Vkuser.objects.all()

#     for field in all_users:
#         if (vk_id == field.id_vk):
#             response['RESPONSE'] = True
#             response['PAYLOAD'] = field.pay_day
#             print('[add_budget:RESPONSE]-->', response)
#             return JsonResponse(response)

#     response['RESPONSE'] = False
#     response['PAYLOAD'] = 'undefined'
#     print('[add_budget:RESPONSE]-->', response)
#     return JsonResponse(response)


# make operation


# def temp_today_cost(request):
#     req = json.loads(str(request.body, encoding='utf-8'))
#     print('[add_budget:RECIVED]-->', req)
#     response = {'RESPONSE': 'ERROR', 'PAYLOAD': ''}
#     vk_id = str(req['vk_id'])
#     money = req['money']
#     typeCost = req['type']
#     operation = req['operation']
#     budget = req['budget']
#     maxCommonObject = 'EMPTY'
#     all_users = Vkuser.objects.all()

#     if typeCost == 'common':
#         for field in all_users:
#             if (vk_id == field.id_vk):
#                 maxCommonObject = json.loads(field.common)
#                 if (operation == '-'):
#                     newBudget = float(field.budget) - float(budget)
#                     maxCommonObject['maxToday']['temp'] = round(
#                         maxCommonObject['maxToday']['temp'] - float(money), 2)
#                     maxCommonObjectJSON = json.dumps(maxCommonObject)
#                     Vkuser.objects.filter(id_vk=vk_id).update(
#                         common=maxCommonObjectJSON)
#                 if (operation == '+'):
#                     maxCommonObject['maxToday']["temp"] = round(maxCommonObject['maxToday']["temp"] +
#                                                                 float(money), 2)
#                     maxCommonObjectJSON = json.dumps(maxCommonObject)
#                     Vkuser.objects.filter(id_vk=vk_id).update(
#                         common=maxCommonObjectJSON)

#                 break

#         # money=(budget*0.5) / (pay_day - today)

#         print('====>', maxCommonObject)
#         return JsonResponse(maxCommonObject)
#     elif typeCost == 'fun':
#         maxCommonObject = 'EMPTY'
#         return JsonResponse(maxCommonObject)


def get_costs_all(request):
    req = json.loads(str(request.body, encoding='utf-8'))
    print('[get_costs_all:RECIVED]-->', req)
    response = {'RESPONSE': 'ERROR', 'PAYLOAD': {
    }}
    vk_id = str(req['vk_id'])

    all_users = Vkuser.objects.all()
    for field in all_users:
        if (vk_id == field.id_vk):

            commonObject = json.loads(field.common)
            funObject = json.loads(field.fun)
            investObject = json.loads(field.invest)

            response['PAYLOAD']['common'] = json.loads(field.common)
            response['PAYLOAD']['fun'] = json.loads(field.fun)
            response['PAYLOAD']['invest'] = json.loads(field.invest)
            response['PAYLOAD']['budget'] = field.budget
            response['PAYLOAD']['pay_day'] = field.pay_day
            response['PAYLOAD']['days_to_payday'] = field.days_to_payday
            response['RESPONSE'] = 'SUCCES_FETCHED'
            print('[get_costs_all:RESPONSE]-->', response)
            return JsonResponse(response)
            break

    return JsonResponse(response)


def log_in(request):
    req = json.loads(str(request.body, encoding='utf-8'))
    print('[log_in:RECIVED]-->', req)

    vk_id = str(req['vk_id'])
    response = {'RESPONSE': 'LOGIN_ERROR', 'PAYLOAD': vk_id
                }
    try:
        all_users = Vkuser.objects.all()
        for field in all_users:
            if (vk_id == field.id_vk):
                response['RESPONSE'] = 'ALREADY_HERE'
                return JsonResponse(response)
        user = Vkuser(id_vk=vk_id, common=costsPattern,
                      fun=costsPattern, invest=costsPattern)
        user.save()
        response['RESPONSE'] = 'LOGIN_SUCCESS'
        response['PAYLOAD'] = vk_id
        print('[log_in:RESPONSE]-->', response)

        return JsonResponse(response)
    except:
        print('[log_in:RESPONSE]-->', response)
        return JsonResponse(response)

# def get_costs_all(request):
#     req = json.loads(str(request.body, encoding='utf-8'))
#     print('[add_budget:RECIVED]-->', req)
#     response = {'RESPONSE': 'ERROR', 'PAYLOAD': {
#         'common:': '', 'fun': '', 'invest': ''}}
#     vk_id = str(req['vk_id'])
#     daysToPayday = int(req['daysToPayday'])
#     budget = req['budget']

#     all_users = Vkuser.objects.all()
#     for field in all_users:
#         if (vk_id == field.id_vk):

#             commonObject = json.loads(field.common)
#             funObject = json.loads(field.common)
#             investObject = json.loads(field.common)

#             if (commonObject["daysToPayday"] != daysToPayday):
#                 commonObject["daysToPayday"] = daysToPayday
#                 funObject["daysToPayday"] = daysToPayday
#                 investObject["daysToPayday"] = daysToPayday

#                 commonObject['maxToday']["value"] = round((
#                     float(budget) * 0.5) / int(daysToPayday), 2)
#                 commonObject['maxToday']["temp"] = commonObject['maxToday']["value"]
#                 commonObject['budget'] = budget
#                 commonObjectJSON = json.dumps(commonObject)

#                 funObject['maxToday']["value"] = round((
#                     float(budget) * 0.3) / int(daysToPayday), 2)
#                 funObject['maxToday']["temp"] = funObject['maxToday']["value"]
#                 funObject['budget'] = budget
#                 funObjectJSON = json.dumps(funObject)

#                 investObject['maxToday']["value"] = round((
#                     float(budget) * 0.3) / int(daysToPayday), 2)
#                 investObject['maxToday']["temp"] = investObject['maxToday']["value"]
#                 investObject['budget'] = budget
#                 investObjectJSON = json.dumps(investObject)

#                 Vkuser.objects.filter(id_vk=vk_id).update(
#                     common=commonObjectJSON, fun=funObjectJSON, invest=investObjectJSON)

#             response['PAYLOAD']['common'] = json.loads(field.common)
#             response['PAYLOAD']['fun'] = json.loads(field.fun)
#             response['PAYLOAD']['invest'] = json.loads(field.invest)
#             response['RESPONSE'] = 'SUCCES_FETCHED'
#             return JsonResponse(response)
#             break

#     return JsonResponse(response)
