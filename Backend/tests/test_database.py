from app.database import DATABASE_URL, engine


def test_database_uses_file_based_sqlite():
    assert DATABASE_URL.startswith("sqlite:///")
    assert ":memory:" not in DATABASE_URL


def test_database_engine_uses_sqlite():
    assert engine.dialect.name == "sqlite"