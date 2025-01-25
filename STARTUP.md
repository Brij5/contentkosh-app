# ContentKosh Application - Startup Guide

This guide will help you run the ContentKosh application on your local machine.

## Prerequisites

- Node.js (v14 or newer)
- MongoDB (local installation or MongoDB Atlas account)
- npm or yarn package manager

## Setup Steps

### 1. Start MongoDB

If using a local MongoDB installation:

```bash
# Create a data directory if it doesn't exist
mkdir -p /tmp/data/db

# Start MongoDB
mongod --dbpath /tmp/data/db
```

If using MongoDB Atlas, make sure to update the `MONGODB_URI` in the `.env` file.

### 2. Install Dependencies

From the project root:

```bash
# Install server dependencies
npm install

# Install client dependencies
cd client && npm install && cd ..
```

### 3. Seed the Database

This creates an admin user and a test user:

```bash
npm run seed
```

User credentials after seeding:
- Admin: admin@contentkosh.com / Admin@123
- Regular user: user@example.com / User@123

### 4. Start the Application

Start the entire application (server and client) using:

```bash
npm run dev
```

Or start them separately:

```bash
# Terminal 1 - Start server
npm run server

# Terminal 2 - Start client
npm run client
```

## Accessing the Application

- Main application: http://localhost:3000
- Admin login: http://localhost:3000/admin/login
- API endpoint: http://localhost:5001/api

## Available Routes

### Public Routes
- `/` - Home page
- `/about` - About page
- `/services` - Services page
- `/contact` - Contact page

### Auth Routes
- `/auth/login` - User login
- `/auth/register` - User registration
- `/auth/forgot-password` - Forgot password flow
- `/admin/login` - Admin login

### Protected Routes
- `/dashboard` - User dashboard (requires auth)
- `/admin/dashboard` - Admin dashboard (requires admin auth)
- `/admin/users` - User management (requires admin auth)
- `/admin/content` - Content management (requires admin auth)
- `/admin/settings` - Application settings (requires admin auth)

## Environment Variables

Make sure both `.env` and `client/.env` files are configured correctly. The most critical variables are:

- `MONGODB_URI` - MongoDB connection string
- `JWT_SECRET` - Secret for signing JWT tokens
- `VITE_API_BASE_URL` - API base URL for client-side API calls