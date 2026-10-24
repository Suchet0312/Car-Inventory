# Start Frontend Server Script
Write-Host "🚀 Starting Car Dealership Frontend..." -ForegroundColor Cyan

# Navigate to Frontend directory
cd Frontend

# Check if node_modules exists
if (-not (Test-Path "node_modules")) {
    Write-Host "📦 Installing dependencies..." -ForegroundColor Yellow
    npm install
} else {
    Write-Host "✅ Dependencies already installed" -ForegroundColor Green
}

# Start development server
Write-Host "`n✅ Starting Vite dev server..." -ForegroundColor Green
Write-Host "🌐 Frontend will be available at: http://localhost:5173" -ForegroundColor Cyan
Write-Host "`n🛑 Press CTRL+C to stop the server`n" -ForegroundColor Yellow

npm run dev
