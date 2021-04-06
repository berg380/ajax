from django.contrib.auth import authenticate, login, logout
from django.db import IntegrityError
from django.http import HttpResponse, HttpResponseRedirect
from django.shortcuts import render
from django.urls import reverse

from .models import User

from django.http import JsonResponse
import json
from django import forms

class PostForm(forms.Form):
    text = forms.CharField(label="Message")
    #name = forms.CharField(label="Name")

def index(request):

    return render(request, "ajax/index.html",{"form":PostForm()})

# FETCH GET STRING
def getdata(request):
    print("get data ajax received")
    return HttpResponse('Hello, world! Returned get data.')

# FETCH GET JSON
def getjson(request):
    print("get json ajax received")
    return JsonResponse({'item':'Hello, world! Returned get json.'})

# FETCH POST JSON 
def postjson(request):
    if request.is_ajax():
        print("post json ajax received")
        if request.user.is_authenticated:
            print("post json ajax received - user authenticated")
            if request.method == 'POST':
                print( (json.loads(request.body))['post_data'] ) 
            return JsonResponse({'item':'Hello, world! Returned post json.'})
        else:
            return JsonResponse({'item':'Authentication Failed'})
    
#TETCH POST FORM
def postform(request):
    if request.is_ajax():
        print("post form ajax received")
        if request.user.is_authenticated:
            print("post form ajax received - user authenticated")
            if request.method == "POST":
                print(request.POST.get("text"))
                return HttpResponse(PostForm())
    return JsonResponse({'item':'EMPTY RETURN'})

    




















# ----------------- LOGIN METHOS --------------------


def login_view(request):
    if request.method == "POST":

        # Attempt to sign user in
        username = request.POST["username"]
        password = request.POST["password"]
        user = authenticate(request, username=username, password=password)

        # Check if authentication successful
        if user is not None:
            login(request, user)
            return HttpResponseRedirect(reverse("index"))
        else:
            return render(request, "ajax/login.html", {
                "message": "Invalid username and/or password."
            })
    else:
        return render(request, "ajax/login.html")


def logout_view(request):
    logout(request)
    return HttpResponseRedirect(reverse("index"))


def register(request):
    if request.method == "POST":
        username = request.POST["username"]
        email = request.POST["email"]

        # Ensure password matches confirmation
        password = request.POST["password"]
        confirmation = request.POST["confirmation"]
        if password != confirmation:
            return render(request, "ajax/register.html", {
                "message": "Passwords must match."
            })

        # Attempt to create new user
        try:
            user = User.objects.create_user(username, email, password)
            user.save()
        except IntegrityError:
            return render(request, "ajax/register.html", {
                "message": "Username already taken."
            })
        login(request, user)
        return HttpResponseRedirect(reverse("index"))
    else:
        return render(request, "ajax/register.html")
