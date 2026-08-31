from django.contrib import admin

from .models import CalendarEvent, Contact, Integration, Meeting, Profile, Task, TranscriptLine

admin.site.register(Contact)
admin.site.register(Meeting)
admin.site.register(TranscriptLine)
admin.site.register(Task)
admin.site.register(CalendarEvent)
admin.site.register(Integration)
admin.site.register(Profile)
