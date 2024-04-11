#!/bin/bash

# Navigate to the frontend directory
cd frontend_react_ts

# Install frontend dependencies
npm install

# Build the frontend for production
npm run build

# Copy the built frontend files to the Laravel public directory
cp -r build/* ../backend_laravel_breeze/public/

# Navigate back to the root directory
cd ..

echo "Deployment completed successfully."
