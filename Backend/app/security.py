import os

import jwt
from fastapi import Depends, HTTPException, status
from fastapi.security import OAuth2PasswordBearer
from sqlalchemy.orm import Session

from app.database import get_db
from app.models import User

JWT_SECRET = os.getenv("JWT_SECRET")
JWT_ALGORITHM = "HS256"

if not JWT_SECRET:
    raise RuntimeError("JWT_SECRET environment variable is required")

oauth2_scheme = OAuth2PasswordBearer(tokenUrl="/api/auth/login")


def authentication_error(detail: str = "Invalid or expired authentication token"):
    return HTTPException(
        status_code=status.HTTP_401_UNAUTHORIZED,
        detail=detail,
        headers={"WWW-Authenticate": "Bearer"},
    )


def get_current_user(
    token: str = Depends(oauth2_scheme),
    db: Session = Depends(get_db),
) -> User:
    try:
        payload = jwt.decode(
            token,
            JWT_SECRET,
            algorithms=[JWT_ALGORITHM],
        )
        subject = payload.get("sub")

        if not isinstance(subject, str) or not subject.isdigit():
            raise authentication_error()

        user_id = int(subject)

    except (jwt.InvalidTokenError, TypeError, ValueError):
        raise authentication_error()

    user = db.query(User).filter(User.id == user_id).first()

    if user is None:
        raise authentication_error("User associated with token was not found")

    return user