def test_register_creates_user_successfully(client):
    response = client.post(
        "/api/auth/register",
        json={
            "email": "alex@example.com",
            "password": "SecurePass123",
        },
    )

    assert response.status_code == 201
    data = response.json()
    assert data["email"] == "alex@example.com"
    assert "password" not in data
    assert "hashed_password" not in data
    assert "id" in data
    assert data["role"] == "user"


def test_register_rejects_duplicate_email(client):
    payload = {
        "email": "duplicate@example.com",
        "password": "SecurePass123",
    }

    first_response = client.post("/api/auth/register", json=payload)
    second_response = client.post("/api/auth/register", json=payload)

    assert first_response.status_code == 201
    assert second_response.status_code == 409
    assert second_response.json()["detail"] == "Email is already registered"


def test_register_rejects_invalid_email_format(client):
    response = client.post(
        "/api/auth/register",
        json={
            "email": "not-an-email",
            "password": "SecurePass123",
        },
    )
    assert response.status_code == 422


def test_register_rejects_short_password(client):
    response = client.post(
        "/api/auth/register",
        json={
            "email": "short_pw@example.com",
            "password": "short",
        },
    )
    assert response.status_code == 422