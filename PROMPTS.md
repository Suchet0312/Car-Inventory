# PROMPTS.md — Raw AI Chat Logs

Raw, unedited prompts and AI responses used during development, as required by
the SRS AI Usage Policy.

---

## Session 1 — Project Scaffolding (Claude)

**Prompt:**
> I am building a Car Dealership Inventory System TDD Kata with FastAPI and SQLite.
> Give me the initial project structure with: models for User (email, hashed_password, role)
> and Vehicle (make, model, category, price, quantity), a database.py config module,
> Pydantic schemas, and a skeleton FastAPI app.

**Response summary:** Claude generated the initial models.py, database.py, schemas.py,
and a skeleton main.py. I reviewed every file, renamed fields to match the SRS spec,
and added index annotations to the ORM columns.

---

## Session 2 — JWT Authentication (ChatGPT)

**Prompt:**
> How do I implement JWT authentication with PyJWT in FastAPI? I need:
> POST /api/auth/register and POST /api/auth/login returning a bearer token,
> and a get_current_user dependency that validates the token on protected routes.

**Response summary:** ChatGPT provided the create_access_token function pattern and
the OAuth2PasswordBearer dependency. I adapted the sub claim to str(user.id) and
added the digit-validation guard in get_current_user.

---

## Session 3 — Concurrent Purchase Safety (Claude)

**Prompt:**
> My purchase endpoint reads vehicle quantity, checks stock, then decrements.
> How do I prevent a race condition where two concurrent requests both see
> quantity=1 and both succeed?

**Response:**
> Use an atomic SQL UPDATE with a WHERE clause that includes the stock check:
>
>     result = db.execute(
>         update(Vehicle)
>         .where(Vehicle.id == vehicle_id, Vehicle.quantity >= requested)
>         .values(quantity=Vehicle.quantity - requested)
>     )
>     if result.rowcount == 0:
>         # not found or insufficient stock
>
> This is atomic at the database level — SQLite's serialized write model ensures
> only one transaction wins the race.

I implemented this pattern and verified it with test_concurrent_purchases_cannot_oversell_last_vehicle.

---

## Session 4 — Test Isolation (Claude)

**Prompt:**
> My test_auth.py tests fail with 409 on the second run. They use a module-level
> TestClient and hardcoded emails. conftest.py has isolated fixtures. How do I fix it?

**Response:**
> The module-level TestClient(app) hits the real dealership.db. On re-runs, the
> hardcoded emails already exist. Fix: remove the module-level client, accept
> the 'client' pytest fixture as a parameter in each test, and use simple emails
> since each test now gets a fresh isolated SQLite database.

---

## Session 5 — Admin Role Guard (ChatGPT)

**Prompt:**
> In FastAPI, how do I create a dependency that checks role == "admin" and raises
> 403 Forbidden if not?

**Response summary:** ChatGPT provided the require_admin dependency wrapping
get_current_user. I integrated it into the delete and restock endpoints.

---

## Session 6 — Commit Message Format (Claude)

**Prompt:**
> The SRS requires TDD commit messages in Red-Green-Refactor format. What should
> test and implementation commit messages look like? The project uses Conventional
> Commits with a Co-authored-by trailer.

**Response summary:** Claude provided the commit message format template used
throughout this project: subject line, blank line, descriptive body narrating
the development journey, blank line, Co-authored-by trailer.