from django.contrib import admin
from . import models
# Register your models here.
class Postadmin(admin.ModelAdmin):
    list_display = ('name','password','c_time')
admin.site.register(models.User,Postadmin)