from django.shortcuts import render
from django.views.generic import TemplateView


class SpaView(TemplateView):
    template_name = "index.html"
