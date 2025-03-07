# ContentKosh App Commands & Information

## Build & Run Commands

### Running the App
```bash
# Start both client and server together
npm run dev

# Start the server only
npm run server

# Start the client only
npm run client
```

### Server URL
The server runs at: http://localhost:5001

### Client URL
The client runs at: http://localhost:3000

## Code Patterns

### Backend
- Using ES Modules (import/export) syntax
- MongoDB with Mongoose for data modeling
- Express.js for API routes
- JWT for authentication

### Frontend
- Using React with Vite
- Styled-components for styling
- Redux for state management
- Axios for API requests

## Troubleshooting

### Common Issues
1. Map error in components - Fixed by adding default theme and null checks
2. Import path issues - Fixed by ensuring correct paths with .jsx extension
3. ES Module conflicts - Fixed by converting all server files to ES Modules

## API Structure

### Authentication Endpoints
- POST /api/auth/register
- POST /api/auth/login
- GET /api/auth/me

### Content Endpoints  
- GET /api/content
- POST /api/content
- GET /api/content/:id
- PUT /api/content/:id
- DELETE /api/content/:id

### User Endpoints
- GET /api/users
- GET /api/users/:id
- PUT /api/users/:id
- DELETE /api/users/:id

### Service Endpoints
- GET /api/services
- POST /api/services
- GET /api/services/:id
- PUT /api/services/:id
- DELETE /api/services/:id

## Database Models

### User Model
- name
- email
- password
- role (admin/user)
- createdAt

### Content Model
- title
- description
- content
- author
- createdAt
- updatedAt

### Service Model
- title
- description
- price
- features[]
- createdAt