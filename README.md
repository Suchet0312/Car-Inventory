# Car Dealership Inventory System

A full-stack Car Dealership Inventory System built for the Incubyte TDD Kata.
The backend is a RESTful API built with **FastAPI** (Python) backed by **SQLite**,
secured via **JWT authentication**, and developed strictly following
Test-Driven Development (TDD) — every feature has a test commit before its
implementation commit.

---

## Table of Contents

- [Tech Stack](#tech-stack)
- [Project Structure](#project-structure)
- [Setup and Running Locally](#setup-and-running-locally)
- [API Reference](#api-reference)
- [Running Tests](#running-tests)
- [My AI Usage](#my-ai-usage)

---

## Tech Stack

| Layer     | Technology                              |
|-----------|-----------------------------------------|
| Backend   | Python 3.11+, FastAPI, Uvicorn          |
| Database  | SQLite (via SQLAlchemy ORM)             |
| Auth      | JWT (PyJWT, HS256), Argon2 (pwdlib)    |
| Testing   | pytest, httpx, FastAPI TestClient       |
| Frontend  | React, Vite, Tailwind CSS               |

---

## Project Structure

```
Car-Inventory/
├── Backend/
│   ├── app/
│   │   ├── __init__.py
│   │   ├── database.py     # SQLAlchemy engine, session, Base
│   │   ├── models.py       # User and Vehicle ORM models
│   │   ├── schemas.py      # Pydantic request/response schemas
│   │   ├── security.py     # JWT validation dependency
│   │   ├── main.py         # FastAPI app and all route handlers
│   │   └── init_db.py      # One-shot table creation script
│   └── tests/
│       ├── conftest.py     # pytest fixtures (isolated SQLite per test)
│       ├── test_database.py
│       ├── test_schemas.py
│       ├── test_health.py
│       ├── test_auth.py
│       ├── test_security.py
│       └── test_vehicles.py
├── requirements.txt
├── .gitignore
├── README.md
└── PROMPTS.md
```

---

## Setup and Running Locally

### Prerequisites

- Python 3.11+
- Git

### Backend

```bash
# 1. Clone
git clone https://github.com/Suchet0312/Car-Inventory.git
cd Car-Inventory

# 2. Create and activate virtual environment
python -m venv venv

# Windows PowerShell
venv\Scripts\activate

# macOS / Linux
source venv/bin/activate

# 3. Install dependencies
pip install -r requirements.txt

# 4. Set the JWT secret
# Windows PowerShell
$env:JWT_SECRET = "change-me-in-production"

# macOS / Linux
export JWT_SECRET="change-me-in-production"

# 5. Initialise the database (creates Backend/dealership.db)
cd Backend
python -m app.init_db

# 6. Start the dev server
uvicorn app.main:app --reload
```

API available at http://localhost:8000
Interactive docs at http://localhost:8000/docs

---

## API Reference

### Authentication

| Method | Endpoint             | Auth | Description                     |
|--------|----------------------|------|---------------------------------|
| POST   | /api/auth/register   | No   | Register a new user             |
| POST   | /api/auth/login      | No   | Login — returns JWT bearer token|

### Vehicles

| Method | Endpoint                         | Auth | Admin | Description                      |
|--------|----------------------------------|------|-------|----------------------------------|
| GET    | /api/vehicles                    | Yes  | No    | List all vehicles                |
| POST   | /api/vehicles                    | Yes  | No    | Create a vehicle                 |
| GET    | /api/vehicles/search             | Yes  | No    | Search by make/model/category/price |
| PUT    | /api/vehicles/{id}               | Yes  | No    | Partial update                   |
| DELETE | /api/vehicles/{id}               | Yes  | Yes   | Delete a vehicle                 |
| POST   | /api/vehicles/{id}/purchase      | Yes  | No    | Purchase (decreases stock)       |
| POST   | /api/vehicles/{id}/restock       | Yes  | Yes   | Restock (increases stock)        |

### Health

| Method | Endpoint    | Description       |
|--------|-------------|-------------------|
| GET    | /api/health | Liveness check    |

---

## Running Tests

```bash
# From repo root with venv active and JWT_SECRET set
cd Backend
python -m pytest tests/ -v
```

All 31 tests pass. Coverage:

- User registration (success, duplicate, invalid email, short password)
- Login (valid, wrong password, nonexistent email)
- JWT security (missing, malformed, tampered, expired, invalid subject)
- Vehicle CRUD (create, list, search, update, delete)
- Inventory management (purchase, oversell prevention, zero-stock guard)
- Role-based access control (admin-only delete and restock)
- Concurrent purchase safety (atomic SQL prevents race condition)
- Database configuration (file-based SQLite)

---

## My AI Usage

### Tools Used

- **Claude (Anthropic)** — Primary AI pair-programming assistant
- **ChatGPT (OpenAI)** — Supplementary debugging and research

### How I Used AI

| Task | AI Contribution |
|------|----------------|
| Project scaffolding | Claude generated the initial FastAPI folder structure and model definitions; I reviewed and adapted every file. |
| TDD workflow | Used AI to brainstorm test case names and edge cases *before* writing implementation. |
| JWT authentication | Claude explained the PyJWT encode/decode flow; I implemented and validated against tests. |
| Concurrent purchase safety | Discussed the race condition with Claude; AI suggested the atomic UPDATE WHERE quantity >= requested pattern which I implemented and verified with the concurrent test. |
| Test isolation bug | Claude identified the module-level TestClient issue causing 409 on re-runs and guided the fix to pytest fixtures. |
| Commit message format | AI assisted drafting descriptive commit bodies following Conventional Commits style required by the SRS. |

### Reflection

AI significantly sped up boilerplate generation and helped surface edge cases (e.g., concurrency, JWT expiry, user enumeration via error messages). Every AI suggestion was reviewed, tested, and often modified. The TDD cycle remained developer-led — AI never wrote tests that were blindly accepted. The most valuable use was as a fast reference for library APIs and as a sounding board for design decisions.