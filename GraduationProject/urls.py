"""GraduationProject URL Configuration

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
from django.conf.urls import url ,include
from Login import views
from FileCharge import views as FileViews
urlpatterns = [
    path('admin/', admin.site.urls),
    url(r'^$', views.index),
    url(r'^index/', views.index),
    url(r'^Login/', views.login),
    url(r'^logout/', views.logout),
    url(r'^Register/', views.register),
    url(r'^captcha', include('captcha.urls')),
    url(r'^index2/', FileViews.showpg1),
    url(r'^index33/', FileViews.ajax),
    url(r'^index333/', FileViews.ajax2),
    url(r'^index334/', FileViews.ajax3),
    url(r'^index335/', FileViews.ajax4),
    url(r'^index336/', FileViews.ajax5),
    url(r'^index337/', FileViews.ajax6),
    url(r'^index338/', FileViews.ajax7),
    url(r'^index340/',views.sendMessage,name="send_msg"),
    url(r'^index341/',views.Get_newMessage,name='get_new_msg'),
    url(r'index342/',FileViews.ajax8),
    url(r'^index343/',views.Getfriends,name="GetFriends"),
    url(r'^index344/',views.FindUser,name="FindUser"),
    url(r'^index345/',views.AddFriends,name="AddFriends"),
    url(r'^markdown/', include('mdeditor.urls')),
    url(r'^markdownT/',FileViews.showpg1)

]
