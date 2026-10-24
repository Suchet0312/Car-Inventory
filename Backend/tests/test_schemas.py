import pytest
from pydantic import ValidationError

from app.schemas import UserRegister


def test_valid_registration_data_is_accepted():
    user = UserRegister(
        email="alex@example.com",
        password="SecurePass123",
    )

    assert user.email == "alex@example.com"
    assert user.password == "SecurePass123"


def test_invalid_email_is_rejected():
    with pytest.raises(ValidationError):
        UserRegister(
            email="not-an-email",
            password="SecurePass123",
        )


def test_short_password_is_rejected():
    with pytest.raises(ValidationError):
        UserRegister(
            email="alex@example.com",
            password="short",
        )