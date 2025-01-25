#\!/bin/bash

# Exit on any error
set -e

# Display the application logo
echo "================================="
echo "   ContentKosh Application      "
echo "================================="

# Check if MongoDB is installed and available
if \! command -v mongod &> /dev/null; then
    echo "MongoDB is not installed. Please install MongoDB first."
    exit 1
fi

# Check if required directories exist
if [ \! -d "/tmp/data/db" ]; then
    echo "Creating MongoDB data directory..."
    mkdir -p /tmp/data/db
fi

# Check if npm is installed and available
if \! command -v npm &> /dev/null; then
    echo "npm is not installed. Please install Node.js and npm first."
    exit 1
fi

# Function to handle cleanup
cleanup() {
    echo "Stopping MongoDB and other processes..."
    kill $MONGO_PID 2>/dev/null || true
    kill $SERVER_PID 2>/dev/null || true
    kill $CLIENT_PID 2>/dev/null || true
    exit 0
}

# Catch interrupt signal
trap cleanup SIGINT

# Start MongoDB in the background
echo "Starting MongoDB..."
mongod --dbpath /tmp/data/db &
MONGO_PID=$\!
sleep 3

echo "Installing dependencies..."
npm install 

# Change to the client directory and install dependencies
echo "Installing client dependencies..."
(cd client && npm install)

# Seed the database
echo "Seeding the database..."
npm run seed

# Start the server in the background
echo "Starting the server..."
npm run server &
SERVER_PID=$\!
sleep 2

# Start the client in the background
echo "Starting the client..."
npm run client &
CLIENT_PID=$\!

echo ""
echo "================================="
echo "  Application is now running:   "
echo "  - Main site: http://localhost:3000"
echo "  - Admin login: http://localhost:3000/admin/login"
echo "  - API: http://localhost:5001/api"
echo ""
echo "  Admin login credentials:"
echo "  - Email: admin@contentkosh.com"
echo "  - Password: Admin@123"
echo ""
echo "  User login credentials:"
echo "  - Email: user@example.com"
echo "  - Password: User@123"
echo "================================="
echo ""
echo "Press Ctrl+C to stop all services"

# Wait for user to press Ctrl+C
wait
