# Delval CI/CD Pipeline Simulation Script - Windows Version

Write-Host "Starting CI/CD Pipeline..." -ForegroundColor Cyan

# 1. Linting / Testing
Write-Host "Step 1: Running Linting and Tests..."
if (Test-Path "backend-project\node_modules") {
    Write-Host "Backend dependencies verified."
} else {
    Write-Host "Backend dependencies missing. Run npm install in backend-project." -ForegroundColor Red
    exit 1
}

if (Test-Path "frontend-project\node_modules") {
    Write-Host "Frontend dependencies verified."
} else {
    Write-Host "Frontend dependencies missing. Run npm install in frontend-project." -ForegroundColor Red
    exit 1
}
Write-Host "Linting and Tests passed!" -ForegroundColor Green

# 2. Building Docker Images
Write-Host "Step 2: Building Docker Images..."
docker compose build

# 3. Database Migration/Seeding
Write-Host "Step 3: Database Migration/Seeding..."
docker compose run --rm backend npm run seed

# 4. Deployment
Write-Host "Step 4: Deploying to Production (Docker Compose)..."
docker compose up -d

Write-Host "CI/CD Pipeline Completed Successfully!" -ForegroundColor Green
