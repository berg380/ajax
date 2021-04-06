
from django.urls import path

from . import views

urlpatterns = [
    path("", views.index, name="index"),
    path("login", views.login_view, name="login"),
    path("logout", views.logout_view, name="logout"),
    path("register", views.register, name="register"),
    path("getdata", views.getdata, name="getdata"),
    path("getjson", views.getjson, name="getjson"),
    path("postjson", views.postjson, name="postjson"),
    path("postform", views.postform, name="postform")
]
