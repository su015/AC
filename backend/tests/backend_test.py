"""Backend tests for Indian Refrigeration API."""
import os
import pytest
import requests

BASE_URL = os.environ.get("REACT_APP_BACKEND_URL", "").rstrip("/") or "https://chill-service-hub-1.preview.emergentagent.com"


@pytest.fixture
def client():
    s = requests.Session()
    s.headers.update({"Content-Type": "application/json"})
    return s


# ---------- Health ----------
def test_health(client):
    r = client.get(f"{BASE_URL}/api/health", timeout=15)
    assert r.status_code == 200
    data = r.json()
    assert data.get("status") == "healthy"
    assert "ts" in data


def test_root(client):
    r = client.get(f"{BASE_URL}/api/", timeout=15)
    assert r.status_code == 200
    assert r.json().get("status") == "ok"


# ---------- Bookings ----------
def test_create_booking_and_list(client):
    payload = {
        "name": "TEST_User",
        "phone": "9876543210",
        "email": "test@example.com",
        "service": "install",
        "message": "Test booking message"
    }
    r = client.post(f"{BASE_URL}/api/bookings", json=payload, timeout=15)
    assert r.status_code == 200, r.text
    b = r.json()
    assert b["name"] == payload["name"]
    assert b["phone"] == payload["phone"]
    assert b["email"] == payload["email"]
    assert b["service"] == payload["service"]
    assert b["message"] == payload["message"]
    assert "id" in b and isinstance(b["id"], str) and len(b["id"]) > 0
    assert "created_at" in b

    # Verify persistence via GET list
    r2 = client.get(f"{BASE_URL}/api/bookings", timeout=15)
    assert r2.status_code == 200
    arr = r2.json()
    assert isinstance(arr, list)
    # No MongoDB _id in any record
    for item in arr:
        assert "_id" not in item
    ids = [item["id"] for item in arr]
    assert b["id"] in ids


def test_create_booking_minimal(client):
    payload = {"name": "TEST_Min", "phone": "1234567"}
    r = client.post(f"{BASE_URL}/api/bookings", json=payload, timeout=15)
    assert r.status_code == 200
    b = r.json()
    assert b["name"] == "TEST_Min"
    assert b["message"] == ""


def test_create_booking_validation_error(client):
    # Short name → pydantic 422
    r = client.post(f"{BASE_URL}/api/bookings", json={"name": "x", "phone": "123"}, timeout=15)
    assert r.status_code == 422


# ---------- Enquiries ----------
def test_create_enquiry_and_list(client):
    payload = {
        "name": "TEST_EnqUser",
        "phone": "9999999999",
        "product_id": "split",
        "product_name": "Split AC",
        "message": "Need quote"
    }
    r = client.post(f"{BASE_URL}/api/enquiries", json=payload, timeout=15)
    assert r.status_code == 200, r.text
    e = r.json()
    assert e["name"] == payload["name"]
    assert e["product_id"] == "split"
    assert e["product_name"] == "Split AC"
    assert "id" in e
    assert "created_at" in e

    r2 = client.get(f"{BASE_URL}/api/enquiries", timeout=15)
    assert r2.status_code == 200
    arr = r2.json()
    assert isinstance(arr, list)
    for item in arr:
        assert "_id" not in item
    ids = [item["id"] for item in arr]
    assert e["id"] in ids
