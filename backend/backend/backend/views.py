from django.http import HttpResponse
from django.shortcuts import render
def home(request):
    # return HttpResponse("Hello, world!,you are in Purushottam's world")
    return render(request,'index.html')
