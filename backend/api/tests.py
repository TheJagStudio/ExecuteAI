from django.test import TestCase
from django.urls import reverse

from api.models import Task
from django.core.management import call_command


class ApiTests(TestCase):
    @classmethod
    def setUpTestData(cls):
        call_command("seed_demo")

    def test_health(self):
        response = self.client.get("/api/health/")
        self.assertEqual(response.status_code, 200)
        self.assertEqual(response.json()["backend"], "django")

    def test_dashboard_and_tasks(self):
        dash = self.client.get("/api/dashboard/")
        self.assertEqual(dash.status_code, 200)
        self.assertGreater(dash.json()["stats"]["active_commitments"], 0)

        tasks = self.client.get("/api/tasks/")
        self.assertEqual(tasks.status_code, 200)
        self.assertGreater(len(tasks.json()), 0)

        created = self.client.post(
            "/api/tasks/",
            {"title": "Ship API wiring", "source": "Slack", "source_kind": "slack", "status": "Not Started"},
            content_type="application/json",
        )
        self.assertEqual(created.status_code, 201)
        task_id = created.json()["id"]
        patched = self.client.patch(
            f"/api/tasks/{task_id}/",
            {"status": "Completed"},
            content_type="application/json",
        )
        self.assertEqual(patched.status_code, 200)
        self.assertEqual(Task.objects.get(pk=task_id).status, "Completed")

    def test_meetings_detail(self):
        listing = self.client.get("/api/meetings/")
        self.assertEqual(listing.status_code, 200)
        meeting_id = listing.json()[0]["id"]
        detail = self.client.get(f"/api/meetings/{meeting_id}/")
        self.assertEqual(detail.status_code, 200)
        self.assertIn("transcript", detail.json())

    def test_profile_and_integration_toggle(self):
        profile = self.client.get("/api/profile/")
        self.assertEqual(profile.status_code, 200)
        saved = self.client.patch(
            "/api/profile/",
            {"first_name": "Jordan"},
            content_type="application/json",
        )
        self.assertEqual(saved.json()["first_name"], "Jordan")

        integrations = self.client.get("/api/integrations/")
        item = integrations.json()[0]
        toggled = self.client.post(f"/api/integrations/{item['id']}/toggle/")
        self.assertEqual(toggled.status_code, 200)
        self.assertNotEqual(toggled.json()["connected"], item["connected"])
