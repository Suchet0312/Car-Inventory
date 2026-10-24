# 🚀 Quick Start Guide

## Automated Startup (Recommended)

### Option 1: Using PowerShell Scripts

**Terminal 1 - Backend:**
```powershell
.\start-backend.ps1
```

**Terminal 2 - Frontend:**
```powershell
.\start-frontend.ps1
```

The scripts will:
- ✅ Create virtual environment (if needed)
- ✅ Install dependencies
- ✅ Initialize database
- ✅ Seed test data
- ✅ Start servers

---

## Manual Startup

### Prerequisites
1. Python 3.11+ installed
2. Node.js 18+ installed

### Backend (Terminal 1)

```powershell
# Create and activate virtual environment (first time only)
python -m venv venv
.\venv\Scripts\Activate.ps1

# Install dependencies (first time only)
pip install -r requirements.txt

# Set JWT secret (required every time)
$env:JWT_SECRET = "super-secret-development-key-change-in-production"

# Initialize database (first time only)
cd Backend
python -m app.init_db

# Seed test data (first time only)
python seed_data.py

# Start backend server
uvicorn app.main:app --reload
```

**Backend runs at:** http://127.0.0.1:8000

### Frontend (Terminal 2)

```powershell
cd Frontend

# Install dependencies (first time only)
npm install

# Start frontend dev server
npm run dev
```

**Frontend runs at:** http://localhost:5173

---

## Test Accounts

After seeding the database, you can login with:

### Admin Account
- **Email:** admin@example.com
- **Password:** admin123
- **Can:** Add, edit, delete, restock vehicles

### Regular User Account
- **Email:** user@example.com
- **Password:** user123
- **Can:** Browse and purchase vehicles

---

## Sample Data Included

The seed script creates 9 sample vehicles:
- Toyota Camry (Sedan) - $25,000 - 5 in stock
- Honda Civic (Sedan) - $22,000 - 3 in stock
- Ford F-150 (Truck) - $35,000 - 7 in stock
- Tesla Model 3 (Electric) - $42,000 - 2 in stock
- Chevrolet Tahoe (SUV) - $52,000 - 4 in stock
- BMW X5 (SUV) - $65,000 - 1 in stock
- Mercedes-Benz C-Class (Luxury Sedan) - $55,000 - 3 in stock
- Jeep Wrangler (SUV) - $38,000 - 6 in stock
- Mazda CX-5 (SUV) - $28,000 - **OUT OF STOCK** (for testing)

---

## Troubleshooting

### Backend Issues

**"ModuleNotFoundError"**
- Make sure virtual environment is activated: `.\venv\Scripts\Activate.ps1`
- Reinstall dependencies: `pip install -r requirements.txt`

**"JWT_SECRET environment variable is required"**
- Run: `$env:JWT_SECRET = "super-secret-development-key-change-in-production"`

**"Database locked"**
- Close any database browser tools
- Restart the backend server

### Frontend Issues

**"npm command not found"**
- Install Node.js from https://nodejs.org/

**"Failed to fetch"**
- Make sure backend is running on port 8000
- Check for CORS errors in browser console

**Port already in use**
- Kill the process using port 5173: `Stop-Process -Id (Get-NetTCPConnection -LocalPort 5173).OwningProcess -Force`

---

## Features to Test

### As Regular User (user@example.com)
1. ✅ Browse all vehicles
2. ✅ Search/filter by make, model, category, price
3. ✅ Purchase vehicles (decreases quantity)
4. ✅ See "Out of Stock" badge
5. ✅ Purchase button disabled when quantity = 0

### As Admin (admin@example.com)
1. ✅ All regular user features PLUS:
2. ✅ Add new vehicles
3. ✅ Edit vehicle details
4. ✅ Delete vehicles
5. ✅ Restock inventory
6. ✅ See "Admin" badge in navbar

---

## Running Tests

```powershell
# Activate virtual environment
.\venv\Scripts\Activate.ps1

# Set JWT secret
$env:JWT_SECRET = "test-secret"

# Run backend tests
cd Backend
python -m pytest tests/ -v
```

All 31 tests should pass ✅

---

## API Documentation

Once the backend is running, visit:
**http://127.0.0.1:8000/docs**

Interactive Swagger UI with all endpoints and schemas.

---

## Next Steps

1. **Register your own account** or use the test accounts
2. **Test the purchase flow** as a regular user
3. **Test the admin features** with the admin account
4. **Run the test suite** to verify everything works
5. **Read the code** to understand the architecture

Happy testing! 🎉
