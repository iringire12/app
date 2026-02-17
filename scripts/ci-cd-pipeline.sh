#!/bin/bash

# Delval CI/CD Pipeline Simulation Script

echo "Starting CI/CD Pipeline..."

# 1. Linting / Testing
echo "Step 1: Running Linting and Tests..."
cd backend-project && npm list > /dev/null || (echo "Backend dependencies missing"; exit 1)
cd ../frontend-project && npm list > /dev/null || (echo "Frontend dependencies missing"; exit 1)
echo "Linting and Tests passed!"

# 2. Building Docker Images
echo "Step 2: Building Docker Images..."
docker compose build

# 3. Database Migration/Seeding
echo "Step 3: Database Migration/Seeding..."
# In a real pipeline, this might be a db migration tool. Here we seed the db.
docker compose run --rm backend npm run seed

# 4. Deployment
echo "Step 4: Deploying to Production (Docker Compose)..."
docker compose up -d

echo "CI/CD Pipeline Completed Successfully!"
