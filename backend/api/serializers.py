from rest_framework import serializers

from .models import (
    CalendarEvent,
    Contact,
    Integration,
    Meeting,
    Profile,
    Task,
    TranscriptLine,
)


class ContactSerializer(serializers.ModelSerializer):
    avatar = serializers.SerializerMethodField()

    class Meta:
        model = Contact
        fields = (
            "id",
            "name",
            "email",
            "role",
            "initials",
            "color",
            "avatar_seed",
            "avatar",
        )

    def get_avatar(self, obj):
        seed = obj.avatar_seed or obj.name
        return f"https://api.dicebear.com/7.x/avataaars/svg?seed={seed}"


class TranscriptLineSerializer(serializers.ModelSerializer):
    class Meta:
        model = TranscriptLine
        fields = ("id", "time", "speaker", "text", "is_action", "order")


class TaskSerializer(serializers.ModelSerializer):
    assignee = ContactSerializer(read_only=True)
    assignee_id = serializers.PrimaryKeyRelatedField(
        queryset=Contact.objects.all(), source="assignee", write_only=True, required=False, allow_null=True
    )
    meeting_title = serializers.CharField(source="meeting.title", read_only=True)

    class Meta:
        model = Task
        fields = (
            "id",
            "title",
            "excerpt",
            "source",
            "source_kind",
            "assignee",
            "assignee_id",
            "deadline",
            "deadline_date",
            "status",
            "priority",
            "meeting",
            "meeting_title",
            "speaker",
            "speaker_seed",
            "time",
            "confidence",
            "action_label",
            "badge",
            "created_at",
        )


class MeetingListSerializer(serializers.ModelSerializer):
    attendees = ContactSerializer(many=True, read_only=True)
    commitment_count = serializers.IntegerField(source="commitments.count", read_only=True)

    class Meta:
        model = Meeting
        fields = (
            "id",
            "title",
            "category",
            "status",
            "summary",
            "thumbnail",
            "started_at",
            "duration_seconds",
            "attendees",
            "commitment_count",
        )


class MeetingDetailSerializer(MeetingListSerializer):
    transcript = TranscriptLineSerializer(many=True, read_only=True)
    commitments = TaskSerializer(many=True, read_only=True)

    class Meta(MeetingListSerializer.Meta):
        fields = MeetingListSerializer.Meta.fields + ("transcript", "commitments")


class CalendarEventSerializer(serializers.ModelSerializer):
    class Meta:
        model = CalendarEvent
        fields = ("id", "title", "date", "notes", "task")


class IntegrationSerializer(serializers.ModelSerializer):
    class Meta:
        model = Integration
        fields = (
            "id",
            "slug",
            "name",
            "category",
            "description",
            "connected",
            "last_sync",
            "icon",
            "catalog",
        )


class ProfileSerializer(serializers.ModelSerializer):
    full_name = serializers.ReadOnlyField()

    class Meta:
        model = Profile
        fields = (
            "id",
            "first_name",
            "last_name",
            "full_name",
            "email",
            "role",
            "auto_extract",
            "sensitivity",
            "language",
            "timezone",
            "notify_email",
            "notify_push",
            "notify_slack",
        )
