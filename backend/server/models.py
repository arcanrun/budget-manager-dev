from django.db import models


class Vkuser(models.Model):
    id_vk = models.TextField(max_length=50)
    budget = models.TextField(max_length=100)
    pay_day = models.TextField(max_length=100)

    def __str__(self):
        return '%s :: %s' % (self.id_vk, self.budget)
