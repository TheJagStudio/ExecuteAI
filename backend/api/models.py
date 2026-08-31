from django.db import models


class Contact(models.Model):
    name = models.CharField(max_length=120)
    email = models.EmailField(blank=True)
    role = models.CharField(max_length=120, blank=True)
    initials = models.CharField(max_length=8, blank=True)
    color = models.CharField(max_length=80, default="bg-violet-100 text-violet-600")
    avatar_seed = models.CharField(max_length=80, blank=True)

    def save(self, *args, **kwargs):
        if not self.initials and self.name:
            parts = [p for p in self.name.split() if p]
            self.initials = "".join(p[0] for p in parts[:2]).upper()
        if not self.avatar_seed:
            self.avatar_seed = self.name.split()[0] if self.name else "User"
        super().save(*args, **kwargs)

    def __str__(self):
        return self.name


class Meeting(models.Model):
    STATUS_CHOICES = [
        ("upcoming", "Upcoming"),
        ("live", "Live"),
        ("completed", "Completed"),
    ]
    title = models.CharField(max_length=255)
    category = models.CharField(max_length=80, default="Product")
    status = models.CharField(max_length=40, choices=STATUS_CHOICES, default="completed")
    summary = models.TextField(blank=True)
    thumbnail = models.URLField(blank=True)
    started_at = models.DateTimeField(null=True, blank=True)
    duration_seconds = models.PositiveIntegerField(default=0)
    attendees = models.ManyToManyField(Contact, blank=True, related_name="meetings")

    def __str__(self):
        return self.title


class TranscriptLine(models.Model):
    meeting = models.ForeignKey(Meeting, related_name="transcript", on_delete=models.CASCADE)
    time = models.CharField(max_length=16)
    speaker = models.CharField(max_length=120)
    text = models.TextField()
    is_action = models.BooleanField(default=False)
    order = models.PositiveIntegerField(default=0)

    class Meta:
        ordering = ["order", "id"]


class Task(models.Model):
    PRIORITY_CHOICES = [("high", "High"), ("medium", "Medium"), ("low", "Low")]
    title = models.CharField(max_length=255)
    excerpt = models.TextField(blank=True)
    source = models.CharField(max_length=80, default="Zoom Sync")
    source_kind = models.CharField(max_length=40, default="zoom")
    assignee = models.ForeignKey(Contact, null=True, blank=True, on_delete=models.SET_NULL)
    deadline = models.CharField(max_length=80, blank=True)
    deadline_date = models.DateField(null=True, blank=True)
    status = models.CharField(max_length=40, default="Not Started")
    priority = models.CharField(max_length=20, choices=PRIORITY_CHOICES, default="medium")
    meeting = models.ForeignKey(
        Meeting, null=True, blank=True, related_name="commitments", on_delete=models.SET_NULL
    )
    speaker = models.CharField(max_length=120, blank=True)
    speaker_seed = models.CharField(max_length=80, blank=True)
    time = models.CharField(max_length=16, blank=True)
    confidence = models.PositiveIntegerField(default=90)
    action_label = models.CharField(max_length=80, blank=True)
    badge = models.CharField(max_length=80, blank=True)
    created_at = models.DateTimeField(auto_now_add=True)

    class Meta:
        ordering = ["-created_at"]

    def __str__(self):
        return self.title


class CalendarEvent(models.Model):
    title = models.CharField(max_length=255)
    date = models.DateField()
    notes = models.TextField(blank=True)
    task = models.ForeignKey(Task, null=True, blank=True, on_delete=models.SET_NULL)

    class Meta:
        ordering = ["date", "id"]


class Integration(models.Model):
    slug = models.SlugField(unique=True)
    name = models.CharField(max_length=80)
    category = models.CharField(max_length=80, default="Meetings")
    description = models.TextField(blank=True)
    connected = models.BooleanField(default=False)
    last_sync = models.CharField(max_length=80, blank=True)
    icon = models.CharField(max_length=40, default="zap")
    catalog = models.BooleanField(default=False)

    def __str__(self):
        return self.name


class Profile(models.Model):
    first_name = models.CharField(max_length=80, default="Sarah")
    last_name = models.CharField(max_length=80, default="Chen")
    email = models.EmailField(default="sarah@company.com")
    role = models.CharField(max_length=120, default="Project Manager")
    auto_extract = models.BooleanField(default=True)
    sensitivity = models.PositiveIntegerField(default=75)
    language = models.CharField(max_length=40, default="English (US)")
    timezone = models.CharField(max_length=80, default="Pacific Time (PT) - UTC-8")
    notify_email = models.BooleanField(default=True)
    notify_push = models.BooleanField(default=True)
    notify_slack = models.BooleanField(default=True)

    @property
    def full_name(self):
        return f"{self.first_name} {self.last_name}".strip()
