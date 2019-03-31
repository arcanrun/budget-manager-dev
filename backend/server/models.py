from django.db import models


class Vkuser(models.Model):
    id_vk = models.TextField(max_length=50)
    budget = models.TextField(max_length=100)
    pay_day = models.TextField(max_length=100)
    max_for_today_common = models.TextField(max_length=1000)
    max_for_today_fun = models.TextField(max_length=1000)

    def __str__(self):
        return '%s :: %s' % (self.id_vk, self.budget)
