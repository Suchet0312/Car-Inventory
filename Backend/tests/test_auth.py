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


def test_login_with_valid_credentials_returns_access_token(client):
    email = "login_valid@example.com"
    password = "SecurePass123"

    reg = client.post(
        "/api/auth/register",
        json={"email": email, "password": password},
    )
    assert reg.status_code == 201

    login = client.post(
        "/api/auth/login",
        json={"email": email, "password": password},
    )

    assert login.status_code == 200
    data = login.json()
    assert data["token_type"] == "bearer"
    assert isinstance(data["access_token"], str)
    assert len(data["access_token"]) > 0


def test_login_with_wrong_password_is_rejected(client):
    email = "wrong_password@example.com"

    reg = client.post(
        "/api/auth/register",
        json={"email": email, "password": "CorrectPass123"},
    )
    assert reg.status_code == 201

    login = client.post(
        "/api/auth/login",
        json={"email": email, "password": "WrongPass123"},
    )

    assert login.status_code == 401
    assert "access_token" not in login.json()


def test_login_with_nonexistent_email_is_rejected(client):
    response = client.post(
        "/api/auth/login",
        json={
            "email": "ghost@example.com",
            "password": "AnyPass123",
        },
    )
    assert response.status_code == 401
    assert "access_token" not in response.json()