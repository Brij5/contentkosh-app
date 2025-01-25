# ContentKosh Application - Testing Guide

This guide outlines how to test all aspects of the ContentKosh application after setting it up.

## Prerequisites

Before testing, make sure you've:
1. Installed all dependencies (`npm install` and `cd client && npm install`)
2. Started MongoDB (`mongod --dbpath /tmp/data/db`)
3. Seeded the database (`npm run seed`)
4. Started the server (`npm run server`)
5. Started the client (`npm run client`)

Alternatively, use the `./run-app.sh` script to do all of the above automatically.

## 1. Public Pages Testing

### Home Page
- Visit http://localhost:3000
- Check that the hero section, services section and other components load correctly
- Verify responsive design by resizing the browser window

### About Page
- Visit http://localhost:3000/about
- Verify the team information and company description

### Services Page
- Visit http://localhost:3000/services
- Verify all service cards display correctly with descriptions and prices

### Contact Page
- Visit http://localhost:3000/contact
- Test the contact form functionality (when backend is running)

## 2. Authentication Testing

### Regular User Registration
- Visit http://localhost:3000/auth/register
- Create a new account with your email
- Verify validation errors work (try submitting with empty fields)
- Complete registration and check if you're redirected to the dashboard

### Regular User Login
- Visit http://localhost:3000/auth/login
- Login with the test user: user@example.com / User@123
- Verify you're redirected to the user dashboard

### Admin Login
- Visit http://localhost:3000/admin/login
- Login with admin credentials: admin@contentkosh.com / Admin@123
- Verify you're redirected to the admin dashboard

### Password Reset Flow
- Visit http://localhost:3000/auth/forgot-password
- Enter a registered email address
- If backend is running, check for password reset token responses

## 3. User Dashboard Testing

After logging in as a regular user:

- Check profile information display
- Test updating profile information
- Test password change functionality
- Try creating/uploading new content
- Verify content list and operations (edit, delete)

## 4. Admin Dashboard Testing

After logging in as an admin:

### Dashboard Overview
- Verify statistics and activity cards display correctly

### User Management
- Test the user list display
- Try user operations (view, edit, delete)
- Try creating a new user

### Content Management
- Test content list filtering
- Try content operations (approve, reject, edit, delete)
- Try creating new content

### Settings
- Test site settings modifications

## 5. Authentication & Authorization Testing

- Try accessing admin pages as a regular user (should redirect to unauthorized page)
- Try accessing user dashboard without logging in (should redirect to login page)
- Test token expiration handling (if implemented)

## 6. API Testing

Use a tool like Postman or curl to test the API endpoints:

### Authentication Endpoints
- POST /api/auth/register
- POST /api/auth/login
- POST /api/auth/forgot-password
- PATCH /api/auth/reset-password/:token

### User Endpoints
- GET /api/users (admin only)
- GET /api/users/:id (admin only)
- PUT /api/users/:id (admin only)
- DELETE /api/users/:id (admin only)
- GET /api/users/me (auth required)
- PUT /api/users/me (auth required)

### Content Endpoints
- GET /api/content
- GET /api/content/:id
- POST /api/content (auth required)
- PUT /api/content/:id (auth required)
- DELETE /api/content/:id (auth required)

## 7. Error Handling Testing

- Test form validation errors
- Test API error responses
- Test 404 handling for non-existent routes
- Test unauthorized access handling

## Common Test User Credentials

### Admin User
- Email: admin@contentkosh.com
- Password: Admin@123

### Regular User
- Email: user@example.com
- Password: User@123

## Notes on Testing States

When testing UI components, verify these states work correctly:
- Loading states
- Empty states (no data)
- Error states
- Success states
- Responsive design at different viewport sizes

If any issues are found during testing, please document them with:
1. The steps to reproduce
2. Expected behavior
3. Actual behavior
4. Screenshots if applicable
