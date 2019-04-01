"""backend URL Configuration

The `urlpatterns` list routes URLs to views. For more information please see:
    https://docs.djangoproject.com/en/2.1/topics/http/urls/
Examples:
Function views
    1. Add an import:  from my_app import views
    2. Add a URL to urlpatterns:  path('', views.home, name='home')
Class-based views
    1. Add an import:  from other_app.views import Home
    2. Add a URL to urlpatterns:  path('', Home.as_view(), name='home')
Including another URLconf
    1. Import the include() function: from django.urls import include, path
    2. Add a URL to urlpatterns:  path('blog/', include('blog.urls'))
"""
from django.contrib import admin
from django.urls import path
from server import views


urlpatterns = [
    path('admin/', admin.site.urls),
    path('add-budget/', views.add_budget),
    path('add-payday/', views.add_payday),
    path('get-budget/', views.get_budget),
    path('get-payday/', views.get_payday),
    path('get-costs-all/', views.get_costs_all),
    path('max-cost-to-day/', views.max_cost_to_day),
    path('max-cost-to-day-calc/', views.max_cost_to_day_calc),
]
