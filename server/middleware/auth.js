import jwt from 'jsonwebtoken';
import User from '../models/user.js';
import AppError from '../utils/AppError.js';
import catchAsync from '../utils/catchAsync.js';

/**
 * Protect routes - verifies JWT token and attaches user to request
 * @param {Object} req - Express request object
 * @param {Object} res - Express response object
 * @param {Function} next - Express next middleware function
 */
export const protect = catchAsync(async (req, res, next) => {
  let token;

  // Get token from Authorization header
  if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
    token = req.headers.authorization.split(' ')[1];
  } 
  // Or from cookies if using cookie-based auth
  else if (req.cookies?.token) {
    token = req.cookies.token;
  }

  // Check if token exists
  if (!token) {
    return next(new AppError('Not authorized to access this route', 401));
  }

  try {
    // Verify token
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    // Find user by id
    const user = await User.findById(decoded.id);

    if (!user) {
      return next(new AppError('User not found', 401));
    }

    // Attach user to request
    req.user = user;
    next();
  } catch (error) {
    return next(new AppError('Not authorized to access this route', 401));
  }
});

/**
 * Authorize specific roles
 * @param  {...String} roles - Allowed roles
 * @returns {Function} - Express middleware function
 */
export const authorize = (...roles) => {
  return (req, res, next) => {
    if (!req.user) {
      return next(new AppError('Not authorized to access this route', 401));
    }

    if (!roles.includes(req.user.role)) {
      return next(new AppError(`Role ${req.user.role} is not authorized to access this route`, 403));
    }

    next();
  };
};

/**
 * Require verified email
 * @param {Object} req - Express request object
 * @param {Object} res - Express response object
 * @param {Function} next - Express next middleware function
 */
export const requireVerifiedEmail = catchAsync(async (req, res, next) => {
  if (!req.user) {
    return next(new AppError('Not authorized to access this route', 401));
  }

  if (req.user.isEmailVerified === false) {
    return next(new AppError('Please verify your email address', 403));
  }

  next();
}); 