"""
URL configuration for core project.
"""

from django.contrib import admin
from django.urls import include, path, re_path

from api.views import SpaView

urlpatterns = [
    path("admin/", admin.site.urls),
    path("api/", include("api.urls")),
    re_path(r"^(?!static/|admin/|api/).*$", SpaView.as_view(), name="spa-catchall"),
]
