from datetime import timedelta

from django.core.management.base import BaseCommand
from django.utils import timezone

from api.models import CalendarEvent, Contact, Integration, Meeting, Profile, Task, TranscriptLine


class Command(BaseCommand):
    help = "Load demo contacts, meetings, tasks, and integrations into SQLite."

    def handle(self, *args, **options):
        if Contact.objects.exists() and Task.objects.exists():
            self.stdout.write("Demo data already present.")
            return

        now = timezone.now()
        today = now.date()

        sarah = Contact.objects.create(
            name="Sarah Chen",
            email="sarah@company.com",
            role="Project Manager",
            initials="SC",
            color="bg-violet-100 text-violet-600",
            avatar_seed="Sarah",
        )
        john = Contact.objects.create(
            name="John Doe",
            email="john@company.com",
            role="Sales Lead",
            initials="JD",
            color="bg-emerald-100 text-emerald-600",
            avatar_seed="John",
        )
        alice = Contact.objects.create(
            name="Alice Wong",
            email="alice@company.com",
            role="Lead Engineer",
            initials="AW",
            color="bg-orange-100 text-orange-600",
            avatar_seed="Alice",
        )
        mike = Contact.objects.create(
            name="Mike Ross",
            email="mike@company.com",
            role="Product Designer",
            initials="MK",
            color="bg-pink-100 text-pink-600",
            avatar_seed="Mike",
        )
        alex = Contact.objects.create(
            name="Alex Morgan",
            email="alex@company.com",
            role="Engineering Manager",
            initials="AM",
            color="bg-blue-100 text-blue-600",
            avatar_seed="Alex",
        )
        marcus = Contact.objects.create(
            name="Marcus Johnson",
            email="marcus@company.com",
            role="Backend Lead",
            initials="MJ",
            color="bg-amber-100 text-amber-600",
            avatar_seed="Marcus",
        )

        Profile.objects.update_or_create(
            pk=1,
            defaults={
                "first_name": "Sarah",
                "last_name": "Chen",
                "email": "sarah@company.com",
                "role": "Project Manager",
            },
        )

        q3 = Meeting.objects.create(
            title="Q3 Product Roadmap Sync",
            category="Product",
            status="completed",
            summary="The team discussed the Q3 product roadmap with a focus on the new mobile app launch. Sarah raised concerns about the timeline for the authentication service. Marcus committed to finalizing the API specs by Friday.",
            thumbnail="https://images.unsplash.com/photo-1522202176988-66273c2fd55f?auto=format&fit=crop&q=80&w=800",
            started_at=now - timedelta(hours=3),
            duration_seconds=2520,
        )
        q3.attendees.set([sarah, alex, marcus])

        weekly = Meeting.objects.create(
            title="Weekly Product Sync",
            category="Product",
            status="live",
            summary="Live weekly check-in covering sprint progress and blockers.",
            thumbnail="https://images.unsplash.com/photo-1573164713988-8665fc963095?auto=format&fit=crop&q=80&w=800",
            started_at=now - timedelta(minutes=42),
            duration_seconds=2535,
        )
        weekly.attendees.set([sarah, john, alice])

        sales = Meeting.objects.create(
            title="Partnership Kickoff with Acme",
            category="Sales",
            status="upcoming",
            summary="Upcoming kickoff to align on contract timeline and next steps.",
            thumbnail="https://images.unsplash.com/photo-1556761175-4b46a572b786?auto=format&fit=crop&q=80&w=800",
            started_at=now + timedelta(days=1, hours=2),
            duration_seconds=1800,
        )
        sales.attendees.set([sarah, john])

        lines = [
            ("12:42", "Alex Morgan", "Alright, let's get started. The main goal for today is to finalize the feature set for the Q3 release. Does everyone have the latest specs?", False),
            ("12:45", "Sarah Chen", "Yes, I've reviewed them. I'm a bit concerned about the authentication service timeline. It seems tight given the current backend resources.", False),
            ("12:48", "Marcus Johnson", "I understand the concern. I will schedule a sync with the backend team tomorrow to see if we can expedite the auth module.", True),
            ("12:50", "Alex Morgan", "That sounds good. Let's make sure we have that sorted before the sprint planning on Monday.", False),
            ("12:52", "Sarah Chen", "Okay. I'll update the documentation to reflect the new API endpoints by end of day today, so the frontend team isn't blocked.", True),
            ("12:55", "Alex Morgan", "Perfect. Moving on to the design review...", False),
        ]
        TranscriptLine.objects.bulk_create(
            [
                TranscriptLine(meeting=q3, time=t, speaker=s, text=txt, is_action=a, order=i)
                for i, (t, s, txt, a) in enumerate(lines)
            ]
        )

        tasks = [
            Task(
                title="Review & Approve Q3 Budget Proposal",
                excerpt='Extracted from: "The budget needs final approval by EOD..."',
                source="Zoom Sync",
                source_kind="zoom",
                assignee=sarah,
                deadline="Today",
                deadline_date=today,
                status="Draft Ready",
                priority="high",
                meeting=weekly,
                confidence=98,
                action_label="Review Draft",
                badge="URGENT",
            ),
            Task(
                title="Send Partnership Contract to Jane",
                excerpt='Extracted from: "I\'ll send over the contract draft..."',
                source="Outlook",
                source_kind="outlook",
                assignee=john,
                deadline="Tomorrow",
                deadline_date=today + timedelta(days=1),
                status="Pending Review",
                priority="high",
                meeting=sales,
                confidence=92,
                action_label="Send Email",
                badge="DRAFT GENERATED",
            ),
            Task(
                title="Schedule Follow-up: Tech Review",
                excerpt='Extracted from: "Let\'s grab a slot next week for..."',
                source="Slack",
                source_kind="slack",
                assignee=alice,
                deadline=(today + timedelta(days=3)).strftime("%b %d, %Y"),
                deadline_date=today + timedelta(days=3),
                status="Not Started",
                priority="medium",
                confidence=55,
                action_label="Review Details",
                badge="NEEDS INPUT",
            ),
            Task(
                title="Update Jira Ticket #4022",
                excerpt='Extracted from: "Can someone update the ticket status..."',
                source="Zoom Sync",
                source_kind="zoom",
                assignee=mike,
                deadline=(today + timedelta(days=4)).strftime("%b %d, %Y"),
                deadline_date=today + timedelta(days=4),
                status="Completed",
                priority="low",
                confidence=95,
                action_label="Execute",
                badge="READY",
            ),
            Task(
                title="Prepare Slides for Q4 Kickoff",
                excerpt='Extracted from: "We need the slide deck ready by Friday..."',
                source="Outlook",
                source_kind="outlook",
                assignee=sarah,
                deadline="Tomorrow",
                deadline_date=today + timedelta(days=1),
                status="In Progress",
                priority="medium",
                confidence=88,
                action_label="Draft Email",
                badge="IN PROGRESS",
            ),
            Task(
                title="Schedule a sync with the backend team regarding auth module.",
                excerpt="Commitment from Q3 Product Roadmap Sync",
                source="Zoom Sync",
                source_kind="zoom",
                assignee=marcus,
                deadline="Tomorrow",
                deadline_date=today + timedelta(days=1),
                status="Not Started",
                priority="high",
                meeting=q3,
                speaker="Marcus Johnson",
                speaker_seed="Marcus",
                time="12:48",
                confidence=91,
                action_label="Add Task",
            ),
            Task(
                title="Update documentation to reflect new API endpoints.",
                excerpt="Commitment from Q3 Product Roadmap Sync",
                source="Zoom Sync",
                source_kind="zoom",
                assignee=sarah,
                deadline="Today",
                deadline_date=today,
                status="Not Started",
                priority="high",
                meeting=q3,
                speaker="Sarah Chen",
                speaker_seed="Sarah",
                time="12:52",
                confidence=94,
                action_label="Add Task",
            ),
            Task(
                title="Send sprint report to stakeholders.",
                excerpt="Commitment from Q3 Product Roadmap Sync",
                source="Zoom Sync",
                source_kind="zoom",
                assignee=alex,
                deadline="Today",
                deadline_date=today,
                status="Completed",
                priority="medium",
                meeting=q3,
                speaker="Alex Morgan",
                speaker_seed="Alex",
                time="13:05",
                confidence=90,
                badge="Asana",
            ),
        ]
        Task.objects.bulk_create(tasks)

        event_titles = {
            3: ["Send Q4 Report"],
            5: ["Review Budget", "Team Sync"],
            8: ["Finalize Slide Deck"],
            11: ["Client Call Prep"],
            12: ["Submit Expenses"],
            15: ["Approve Designs"],
            17: ["Share Proposal", "Sync with Devs"],
            22: ["Project Kickoff Notes"],
            25: ["Update JIRA"],
        }
        month_start = today.replace(day=1)
        for day_num, titles in event_titles.items():
            try:
                date = month_start.replace(day=min(day_num, 28))
            except ValueError:
                continue
            for title in titles:
                CalendarEvent.objects.create(title=title, date=date, notes=f"Scheduled from extracted commitment: {title}")

        Integration.objects.bulk_create(
            [
                Integration(
                    slug="zoom",
                    name="Zoom",
                    category="Meetings",
                    description="Extract tasks from meeting transcripts and recordings.",
                    connected=True,
                    last_sync="12m ago",
                    icon="video",
                ),
                Integration(
                    slug="gmail",
                    name="Gmail",
                    category="Email",
                    description="Monitor email threads for commitments and deadlines.",
                    connected=True,
                    last_sync="2h ago",
                    icon="mail",
                ),
                Integration(
                    slug="slack",
                    name="Slack",
                    category="Messaging",
                    description="Sync action items from channels and direct messages.",
                    connected=True,
                    last_sync="Just now",
                    icon="message",
                ),
                Integration(
                    slug="teams",
                    name="Microsoft Teams",
                    category="Meetings",
                    description="Analyze Teams calls and chat history for tasks.",
                    connected=False,
                    last_sync="Never",
                    icon="message",
                ),
                Integration(
                    slug="outlook",
                    name="Outlook",
                    category="Email",
                    description="Parse Outlook mail for follow-ups.",
                    connected=False,
                    last_sync="Never",
                    icon="mail",
                    catalog=True,
                ),
                Integration(
                    slug="gcal",
                    name="Google Calendar",
                    category="Calendar",
                    description="Push extracted deadlines onto your calendar.",
                    connected=False,
                    last_sync="Never",
                    icon="globe",
                    catalog=True,
                ),
                Integration(
                    slug="jira",
                    name="Jira",
                    category="Tasks",
                    description="Create tickets from commitments automatically.",
                    connected=False,
                    last_sync="Never",
                    icon="zap",
                    catalog=True,
                ),
                Integration(
                    slug="notion",
                    name="Notion",
                    category="Docs",
                    description="Sync meeting notes and tasks to Notion.",
                    connected=False,
                    last_sync="Never",
                    icon="zap",
                    catalog=True,
                ),
                Integration(
                    slug="asana",
                    name="Asana",
                    category="Tasks",
                    description="Push extracted tasks into Asana projects.",
                    connected=False,
                    last_sync="Never",
                    icon="check",
                    catalog=True,
                ),
                Integration(
                    slug="linear",
                    name="Linear",
                    category="Tasks",
                    description="Open Linear issues from meeting action items.",
                    connected=False,
                    last_sync="Never",
                    icon="zap",
                    catalog=True,
                ),
            ]
        )
        self.stdout.write(self.style.SUCCESS("Seeded SQLite demo data."))
