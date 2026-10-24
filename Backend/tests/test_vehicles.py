from concurrent.futures import ThreadPoolExecutor
from uuid import uuid4

from app.main import create_access_token
from app.models import User


def create_user_and_token(client, db_session, role="user"):
    email = f"{uuid4().hex}@example.com"
    password = "SecurePass123"

    response = client.post(
        "/api/auth/register",
        json={"email": email, "password": password},
    )
    assert response.status_code == 201

    user = db_session.query(User).filter(User.email == email).first()
    assert user is not None

    if role == "admin":
        user.role = "admin"
        db_session.commit()
        db_session.refresh(user)

    token = create_access_token(user)
    return {"Authorization": f"Bearer {token}"}


def create_vehicle(client, headers, **overrides):
    data = {
        "make": "Toyota",
        "model": "Corolla",
        "category": "Sedan",
        "price": 25000,
        "quantity": 5,
    }
    data.update(overrides)

    return client.post("/api/vehicles", json=data, headers=headers)


def test_list_vehicles_requires_authentication(client):
    response = client.get("/api/vehicles")
    assert response.status_code == 401


def test_authenticated_user_can_create_and_list_vehicle(client, db_session):
    headers = create_user_and_token(client, db_session)
    created = create_vehicle(client, headers)

    assert created.status_code == 201
    assert created.json()["make"] == "Toyota"
    assert created.json()["quantity"] == 5

    response = client.get("/api/vehicles", headers=headers)
    assert response.status_code == 200
    assert any(v["id"] == created.json()["id"] for v in response.json())


def test_vehicle_creation_rejects_negative_quantity(client, db_session):
    headers = create_user_and_token(client, db_session)

    response = create_vehicle(client, headers, quantity=-1)

    assert response.status_code == 422


def test_search_vehicles_by_make_and_price_range(client, db_session):
    headers = create_user_and_token(client, db_session)
    created = create_vehicle(
        client,
        headers,
        make="Honda",
        model="Civic",
        price=22000,
        quantity=3,
    )
    assert created.status_code == 201

    response = client.get(
        "/api/vehicles/search",
        params={"make": "hon", "min_price": 20000, "max_price": 23000},
        headers=headers,
    )

    assert response.status_code == 200
    assert any(v["id"] == created.json()["id"] for v in response.json())


def test_search_rejects_invalid_price_range(client, db_session):
    headers = create_user_and_token(client, db_session)

    response = client.get(
        "/api/vehicles/search",
        params={"min_price": 30000, "max_price": 20000},
        headers=headers,
    )

    assert response.status_code == 400


def test_authenticated_user_can_update_vehicle(client, db_session):
    headers = create_user_and_token(client, db_session)
    created = create_vehicle(client, headers)

    response = client.put(
        f"/api/vehicles/{created.json()['id']}",
        json={"price": 24000},
        headers=headers,
    )

    assert response.status_code == 200
    assert response.json()["price"] == 24000


def test_update_nonexistent_vehicle_returns_404(client, db_session):
    headers = create_user_and_token(client, db_session)

    response = client.put(
        "/api/vehicles/999999999",
        json={"price": 30000},
        headers=headers,
    )

    assert response.status_code == 404


def test_purchase_decreases_quantity_and_prevents_overselling(
    client, db_session
):
    headers = create_user_and_token(client, db_session)
    created = create_vehicle(client, headers, quantity=2)
    vehicle_id = created.json()["id"]

    purchase = client.post(
        f"/api/vehicles/{vehicle_id}/purchase",
        json={"quantity": 1},
        headers=headers,
    )

    assert purchase.status_code == 200
    assert purchase.json()["quantity_remaining"] == 1

    oversell = client.post(
        f"/api/vehicles/{vehicle_id}/purchase",
        json={"quantity": 2},
        headers=headers,
    )

    assert oversell.status_code == 409


def test_purchase_rejects_vehicle_with_zero_stock(client, db_session):
    headers = create_user_and_token(client, db_session)
    created = create_vehicle(client, headers, quantity=0)

    response = client.post(
        f"/api/vehicles/{created.json()['id']}/purchase",
        json={"quantity": 1},
        headers=headers,
    )

    assert response.status_code == 409


def test_only_admin_can_delete_vehicle(client, db_session):
    user_headers = create_user_and_token(client, db_session)
    created = create_vehicle(client, user_headers)
    vehicle_id = created.json()["id"]

    forbidden = client.delete(
        f"/api/vehicles/{vehicle_id}",
        headers=user_headers,
    )
    assert forbidden.status_code == 403

    admin_headers = create_user_and_token(
        client, db_session, role="admin"
    )
    deleted = client.delete(
        f"/api/vehicles/{vehicle_id}",
        headers=admin_headers,
    )
    assert deleted.status_code == 200


def test_only_admin_can_restock_vehicle(client, db_session):
    user_headers = create_user_and_token(client, db_session)
    created = create_vehicle(client, user_headers, quantity=2)
    vehicle_id = created.json()["id"]

    forbidden = client.post(
        f"/api/vehicles/{vehicle_id}/restock",
        json={"quantity": 3},
        headers=user_headers,
    )
    assert forbidden.status_code == 403

    admin_headers = create_user_and_token(
        client, db_session, role="admin"
    )
    response = client.post(
        f"/api/vehicles/{vehicle_id}/restock",
        json={"quantity": 3},
        headers=admin_headers,
    )

    assert response.status_code == 200
    assert response.json()["quantity"] == 5


def test_concurrent_purchases_cannot_oversell_last_vehicle(
    client, db_session
):
    headers = create_user_and_token(client, db_session)
    created = create_vehicle(client, headers, quantity=1)
    vehicle_id = created.json()["id"]

    def attempt_purchase():
        from fastapi.testclient import TestClient
        from app.main import app

        with TestClient(app) as thread_client:
            return thread_client.post(
                f"/api/vehicles/{vehicle_id}/purchase",
                json={"quantity": 1},
                headers=headers,
            ).status_code

    with ThreadPoolExecutor(max_workers=2) as executor:
        statuses = list(executor.map(lambda _: attempt_purchase(), range(2)))

    assert statuses.count(200) == 1
    assert statuses.count(409) == 1

    remaining = client.get("/api/vehicles", headers=headers)
    vehicle = next(v for v in remaining.json() if v["id"] == vehicle_id)
    assert vehicle["quantity"] == 0