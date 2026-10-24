import os
from datetime import datetime, timedelta, timezone

import jwt


def register_and_login(client):
    email = "security-" + os.urandom(8).hex() + "@example.com"
    password = "SecurePass123"

    registration = client.post(
        "/api/auth/register",
        json={"email": email, "password": password},
    )
    assert registration.status_code == 201

    login = client.post(
        "/api/auth/login",
        json={"email": email, "password": password},
    )
    assert login.status_code == 200

    return login.json()["access_token"]


def test_protected_route_rejects_missing_token(client):
    response = client.get("/api/vehicles")
    assert response.status_code == 401


def test_protected_route_accepts_valid_token(client):
    token = register_and_login(client)

    response = client.get(
        "/api/vehicles",
        headers={"Authorization": f"Bearer {token}"},
    )

    assert response.status_code == 200


def test_protected_route_rejects_malformed_token(client):
    response = client.get(
        "/api/vehicles",
        headers={"Authorization": "Bearer invalid.token.value"},
    )

    assert response.status_code == 401


def test_protected_route_rejects_tampered_token(client):
    token = register_and_login(client)
    tampered_token = token[:-1] + ("a" if token[-1] != "a" else "b")

    response = client.get(
        "/api/vehicles",
        headers={"Authorization": f"Bearer {tampered_token}"},
    )

    assert response.status_code == 401


def test_protected_route_rejects_expired_token(client):
    register_and_login(client)
    secret = os.getenv("JWT_SECRET")
    expired_payload = {
        "sub": "1",
        "role": "user",
        "exp": datetime.now(timezone.utc) - timedelta(minutes=1),
    }
    expired_token = jwt.encode(expired_payload, secret, algorithm="HS256")

    response = client.get(
        "/api/vehicles",
        headers={"Authorization": f"Bearer {expired_token}"},
    )

    assert response.status_code == 401


def test_protected_route_rejects_invalid_subject(client):
    secret = os.getenv("JWT_SECRET")
    token = jwt.encode(
        {
            "sub": "not-a-user-id",
            "role": "user",
            "exp": datetime.now(timezone.utc) + timedelta(minutes=5),
        },
        secret,
        algorithm="HS256",
    )

    response = client.get(
        "/api/vehicles",
        headers={"Authorization": f"Bearer {token}"},
    )

    assert response.status_code == 401