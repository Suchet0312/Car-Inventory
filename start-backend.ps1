# Start Backend Server Script
Write-Host "🚀 Starting Car Dealership Backend..." -ForegroundColor Cyan

# Check if virtual environment exists
if (-not (Test-Path "venv\Scripts\Activate.ps1")) {
    Write-Host "❌ Virtual environment not found. Creating..." -ForegroundColor Yellow
    python -m venv venv
}

# Activate virtual environment
Write-Host "📦 Activating virtual environment..." -ForegroundColor Green
& .\venv\Scripts\Activate.ps1

# Install dependencies if needed
Write-Host "📥 Checking dependencies..." -ForegroundColor Green
pip install -q -r Backend/requirements.txt

# Set JWT Secret
$env:JWT_SECRET = "super-secret-development-key-change-in-production"
Write-Host "🔑 JWT_SECRET configured" -ForegroundColor Green

# Initialize database if it doesn't exist
if (-not (Test-Path "Backend\dealership.db")) {
    Write-Host "🗄️  Initializing database..." -ForegroundColor Yellow
    cd Backend
    python -m app.init_db
    cd ..
}

# Seed database with test data
Write-Host "🌱 Seeding database with test data..." -ForegroundColor Yellow
cd Backend
python seed_data.py
cd ..

# Start server
Write-Host "`n✅ Starting Uvicorn server..." -ForegroundColor Green
Write-Host "📡 Backend will be available at: http://127.0.0.1:8000" -ForegroundColor Cyan
Write-Host "📚 API Docs available at: http://127.0.0.1:8000/docs" -ForegroundColor Cyan
Write-Host "`n🛑 Press CTRL+C to stop the server`n" -ForegroundColor Yellow

cd Backend
uvicorn app.main:app --reload
