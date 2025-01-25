# ContentKosh

A full-stack content management application built with the MERN stack (MongoDB, Express.js, React, Node.js).

## Features

- User Authentication & Authorization
- Content Management
- Blog System
- Service Management
- Admin Dashboard
- Responsive Design
- Email Notifications
- File Upload with Cloudinary
- SEO Optimization

## Prerequisites

- Node.js (v14 or higher)
- MongoDB
- npm or yarn
- Cloudinary account
- Gmail account (for email notifications)

## Installation

1. Clone the repository:
```bash
git clone https://github.com/yourusername/contentkosh.git
cd contentkosh
```

2. Install dependencies:
```bash
npm install
```

3. Create a .env file in the root directory and add your environment variables:
```env
# Server Configuration
PORT=5000
NODE_ENV=development

# MongoDB Configuration
MONGODB_URI=mongodb://localhost:27017/contentkosh

# JWT Configuration
JWT_SECRET=your_jwt_secret_key
JWT_EXPIRES_IN=7d

# Cloudinary Configuration
CLOUDINARY_CLOUD_NAME=your_cloud_name
CLOUDINARY_API_KEY=your_api_key
CLOUDINARY_API_SECRET=your_api_secret

# Email Configuration
EMAIL_SERVICE=gmail
EMAIL_USER=your_email@gmail.com
EMAIL_PASS=your_app_specific_password
ADMIN_EMAIL=admin@contentkosh.com

# Client Configuration
CLIENT_URL=http://localhost:3000

# Google OAuth Configuration
GOOGLE_CLIENT_ID=your_google_client_id
GOOGLE_CLIENT_SECRET=your_google_client_secret
GOOGLE_CALLBACK_URL=http://localhost:5000/api/auth/google/callback

# Rate Limiting
RATE_LIMIT_WINDOW_MS=900000
RATE_LIMIT_MAX_REQUESTS=100
```

4. Start the development server:
```bash
npm run dev
```

## Project Structure

```
contentkosh/
├── client/               # Frontend React application
│   ├── public/          # Static files
│   └── src/             # Source files
│       ├── components/  # React components
│       ├── pages/       # Page components
│       ├── hooks/       # Custom hooks
│       ├── utils/       # Utility functions
│       ├── services/    # API services
│       ├── store/       # Redux store
│       └── styles/      # Global styles
├── server/              # Backend Node.js/Express application
│   ├── config/         # Configuration files
│   ├── controllers/    # Route controllers
│   ├── models/         # Mongoose models
│   ├── routes/         # Express routes
│   ├── middleware/     # Custom middleware
│   ├── utils/          # Utility functions
│   └── services/       # Business logic
└── package.json        # Project dependencies and scripts
```

## Available Scripts

- `npm run dev`: Starts both frontend and backend in development mode
- `npm run client`: Starts only the frontend
- `npm run server`: Starts only the backend
- `npm run build`: Builds the frontend for production
- `npm run lint`: Runs ESLint
- `npm run format`: Formats code with Prettier

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## Acknowledgments

- [React](https://reactjs.org/)
- [Node.js](https://nodejs.org/)
- [Express](https://expressjs.com/)
- [MongoDB](https://www.mongodb.com/)
- [Material-UI](https://mui.com/)
- [Redux Toolkit](https://redux-toolkit.js.org/)
- [Cloudinary](https://cloudinary.com/)
