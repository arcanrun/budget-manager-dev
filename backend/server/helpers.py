from django.contrib.auth.models import User, Group
from .models import Vkuser, History

import json

costsPattern = json.dumps({
    "maxToday": "",
    "temp": ""
})


def get_updated_data(vk_id):
    response = {'RESPONSE': 'ERROR', 'PAYLOAD': {}}
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

    return response


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


def history_saver(id_vk, date, operation, value, type_costs):
    history = History(id_vk=id_vk, date=date,
                      operation=operation, value=value, type_costs=type_costs)
    history.save()
    print('[history]:SUCCESS')
