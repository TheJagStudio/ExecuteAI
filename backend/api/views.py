from datetime import timedelta

from django.db.models import Avg, Count, Q
from django.utils import timezone
from django.views.generic import TemplateView
from rest_framework import viewsets
from rest_framework.decorators import action, api_view
from rest_framework.response import Response

from .models import CalendarEvent, Contact, Integration, Meeting, Profile, Task
from .serializers import (
    CalendarEventSerializer,
    ContactSerializer,
    IntegrationSerializer,
    MeetingDetailSerializer,
    MeetingListSerializer,
    ProfileSerializer,
    TaskSerializer,
)


class SpaView(TemplateView):
    template_name = "index.html"


class TaskViewSet(viewsets.ModelViewSet):
    queryset = Task.objects.select_related("assignee", "meeting").all()
    serializer_class = TaskSerializer

    def get_queryset(self):
        qs = super().get_queryset()
        params = self.request.query_params
        q = params.get("q")
        if q:
            qs = qs.filter(
                Q(title__icontains=q)
                | Q(excerpt__icontains=q)
                | Q(assignee__name__icontains=q)
            )
        for field in ("status", "source", "source_kind", "priority"):
            value = params.get(field)
            if value:
                qs = qs.filter(**{field: value})
        return qs


class MeetingViewSet(viewsets.ModelViewSet):
    queryset = Meeting.objects.prefetch_related("attendees", "transcript", "commitments").all()

    def get_serializer_class(self):
        if self.action == "retrieve":
            return MeetingDetailSerializer
        return MeetingListSerializer


class EventViewSet(viewsets.ModelViewSet):
    queryset = CalendarEvent.objects.all()
    serializer_class = CalendarEventSerializer

    def get_queryset(self):
        qs = super().get_queryset()
        year = self.request.query_params.get("year")
        month = self.request.query_params.get("month")
        if year and month:
            qs = qs.filter(date__year=int(year), date__month=int(month))
        return qs


class IntegrationViewSet(viewsets.ModelViewSet):
    queryset = Integration.objects.all()
    serializer_class = IntegrationSerializer

    @action(detail=True, methods=["post"])
    def toggle(self, request, pk=None):
        item = self.get_object()
        item.connected = not item.connected
        item.last_sync = "Just now" if item.connected else "Never"
        item.save(update_fields=["connected", "last_sync"])
        return Response(self.get_serializer(item).data)


class ContactViewSet(viewsets.ReadOnlyModelViewSet):
    queryset = Contact.objects.all()
    serializer_class = ContactSerializer


@api_view(["GET"])
def health(_request):
    return Response({"status": "ok", "backend": "django"})


@api_view(["GET"])
def dashboard(_request):
    tasks = Task.objects.select_related("assignee", "meeting")
    active = tasks.exclude(status__iexact="Completed")
    today = timezone.now().date()

    efficiency = []
    for i in range(6, -1, -1):
        day = timezone.now().date() - timedelta(days=i)
        day_tasks = tasks.filter(created_at__date=day)
        efficiency.append(
            {
                "name": day.strftime("%a"),
                "tasks": day_tasks.count(),
                "auto": day_tasks.filter(status__iexact="Completed").count(),
            }
        )

    completed = tasks.filter(status__iexact="Completed").count()
    edited = tasks.filter(status__icontains="Draft").count() + tasks.filter(status__icontains="Progress").count()
    manual = max(tasks.count() - completed - edited, 0)
    total = max(completed + edited + manual, 1)

    queue = TaskSerializer(active[:5], many=True).data
    urgent = tasks.filter(priority="high").exclude(status__iexact="Completed").first()

    return Response(
        {
            "stats": {
                "active_commitments": active.count(),
                "high_priority": tasks.filter(priority="high").exclude(status__iexact="Completed").count(),
                "upcoming_deadlines": tasks.filter(deadline_date__gte=today)
                .exclude(status__iexact="Completed")
                .count(),
                "due_today": tasks.filter(deadline_date=today).exclude(status__iexact="Completed").count(),
                "new_insights": tasks.filter(created_at__date=today).count()
                + Meeting.objects.filter(started_at__date=today).count(),
                "meetings_today": Meeting.objects.filter(started_at__date=today).count(),
                "accuracy": int(tasks.aggregate(avg=Avg("confidence"))["avg"] or 94),
            },
            "efficiency": efficiency,
            "auto_resolution": [
                {"name": "Done", "value": int(completed / total * 100), "color": "#6D28D9"},
                {"name": "Edited", "value": int(edited / total * 100), "color": "#FBBF24"},
                {"name": "Manual", "value": int(manual / total * 100), "color": "#E2E8F0"},
            ],
            "queue": queue,
            "urgent": TaskSerializer(urgent).data if urgent else None,
            "live_meeting": MeetingListSerializer(
                Meeting.objects.filter(status="live").first()
            ).data
            if Meeting.objects.filter(status="live").exists()
            else None,
        }
    )


@api_view(["GET"])
def analytics(_request):
    tasks = Task.objects.select_related("assignee")
    meetings = Meeting.objects.count() or 1
    completed = tasks.filter(status__iexact="Completed").count()
    total = tasks.count() or 1
    follow_through = round(completed / total * 100)

    velocity = []
    for i in range(6, -1, -1):
        start = timezone.now().date() - timedelta(days=(i + 1) * 7)
        end = timezone.now().date() - timedelta(days=i * 7)
        velocity.append(
            {
                "name": f"Week {7 - i}",
                "velocity": tasks.filter(created_at__date__gt=start, created_at__date__lte=end).count() * 8,
            }
        )

    sentiment = []
    for i in range(4, -1, -1):
        day = timezone.now().date() - timedelta(days=i)
        sentiment.append(
            {
                "name": day.strftime("%a"),
                "sentiment": min(95, 60 + tasks.filter(created_at__date=day).count() * 6),
            }
        )

    committers = []
    for row in (
        tasks.values("assignee__name", "assignee__role", "assignee__color")
        .annotate(count=Count("id"))
        .order_by("-count")[:4]
    ):
        if row["assignee__name"]:
            committers.append(
                {
                    "name": row["assignee__name"],
                    "role": row["assignee__role"] or "Teammate",
                    "count": row["count"],
                    "color": row["assignee__color"] or "bg-violet-100 text-violet-600",
                }
            )

    return Response(
        {
            "stats": {
                "follow_through": follow_through,
                "response_velocity": "2.4h",
                "commitment_density": round(total / meetings, 1),
            },
            "velocity": velocity,
            "sentiment": sentiment,
            "top_committers": committers,
        }
    )


@api_view(["GET", "PUT", "PATCH"])
def profile(request):
    obj, _ = Profile.objects.get_or_create(pk=1)
    if request.method == "GET":
        return Response(ProfileSerializer(obj).data)
    serializer = ProfileSerializer(obj, data=request.data, partial=True)
    serializer.is_valid(raise_exception=True)
    serializer.save()
    return Response(serializer.data)
