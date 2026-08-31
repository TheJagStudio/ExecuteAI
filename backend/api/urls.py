from django.urls import include, path
from rest_framework.routers import DefaultRouter

from . import views

router = DefaultRouter()
router.register("tasks", views.TaskViewSet)
router.register("meetings", views.MeetingViewSet)
router.register("events", views.EventViewSet)
router.register("integrations", views.IntegrationViewSet)
router.register("contacts", views.ContactViewSet)

urlpatterns = [
    path("health/", views.health),
    path("dashboard/", views.dashboard),
    path("analytics/", views.analytics),
    path("profile/", views.profile),
    path("", include(router.urls)),
]
