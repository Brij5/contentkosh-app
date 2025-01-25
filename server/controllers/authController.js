import crypto from 'crypto';
import jwt from 'jsonwebtoken';
import User from '../models/user.js';
import AppError from '../utils/AppError.js';
import catchAsync from '../utils/catchAsync.js';

/**
 * Generate JWT Token
 * @param {string} id - User ID
 * @returns {string} JWT token
 */
const generateToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRES_IN
  });
};

/**
 * Send token response with cookie
 * @param {Object} user - User object
 * @param {number} statusCode - HTTP status code
 * @param {Object} res - Express response object
 */
const sendTokenResponse = (user, statusCode, res) => {
  // Create token
  const token = generateToken(user._id);

  // Remove password from response
  user.password = undefined;

  res.status(statusCode).json({
    success: true,
    token,
    user
  });
};

/**
 * Register a new user
 * @route POST /api/auth/register
 * @access Public
 */
export const register = catchAsync(async (req, res, next) => {
  const { name, email, password } = req.body;

  // Check if user already exists
  const existingUser = await User.findOne({ email });
  if (existingUser) {
    return next(new AppError('User already exists with that email', 400));
  }

  // Create user
  const user = await User.create({
    name,
    email,
    password
  });

  // Send token response
  sendTokenResponse(user, 201, res);
});

/**
 * Login user
 * @route POST /api/auth/login
 * @access Public
 */
export const login = catchAsync(async (req, res, next) => {
  const { email, password } = req.body;

  // Validate email & password
  if (!email || !password) {
    return next(new AppError('Please provide an email and password', 400));
  }

  // Check for user
  const user = await User.findOne({ email }).select('+password');

  if (!user) {
    return next(new AppError('Invalid credentials', 401));
  }

  // Check if password matches
  const isMatch = await user.matchPassword(password);

  if (!isMatch) {
    return next(new AppError('Invalid credentials', 401));
  }

  // Send token response
  sendTokenResponse(user, 200, res);
});

/**
 * Get current logged in user
 * @route GET /api/auth/me
 * @access Private
 */
export const getMe = catchAsync(async (req, res) => {
  const user = await User.findById(req.user.id);
  
  res.status(200).json({
    success: true,
    data: user
  });
});

/**
 * Forgot password
 * @route POST /api/auth/forgot-password
 * @access Public
 */
export const forgotPassword = catchAsync(async (req, res, next) => {
  const user = await User.findOne({ email: req.body.email });

  if (!user) {
    return next(new AppError('There is no user with that email', 404));
  }

  // Generate reset token (this would be hashed and saved to the database)
  const resetToken = crypto.randomBytes(32).toString('hex');
  
  // Hash token and set to resetPasswordToken field
  user.resetPasswordToken = crypto
    .createHash('sha256')
    .update(resetToken)
    .digest('hex');

  // Set expire time - 10 minutes
  user.resetPasswordExpires = Date.now() + 10 * 60 * 1000;

  await user.save({ validateBeforeSave: false });

  // In a real application, you would send an email with the reset link
  // const resetUrl = `${process.env.CLIENT_URL}/auth/reset-password/${resetToken}`;

  // For demo purposes, we'll just return the token
  res.status(200).json({
    success: true,
    message: 'Password reset token generated',
    resetToken // Note: In production, don't send this back to the client
  });
});

/**
 * Reset password
 * @route PATCH /api/auth/reset-password/:token
 * @access Public
 */
export const resetPassword = catchAsync(async (req, res, next) => {
  // Get hashed token
  const resetPasswordToken = crypto
    .createHash('sha256')
    .update(req.params.token)
    .digest('hex');

  const user = await User.findOne({
    resetPasswordToken,
    resetPasswordExpires: { $gt: Date.now() }
  });

  if (!user) {
    return next(new AppError('Invalid or expired token', 400));
  }

  // Set new password
  user.password = req.body.password;
  user.resetPasswordToken = undefined;
  user.resetPasswordExpires = undefined;
  await user.save();

  // Send token response
  sendTokenResponse(user, 200, res);
});

/**
 * Update password
 * @route PATCH /api/auth/update-password
 * @access Private
 */
export const updatePassword = catchAsync(async (req, res, next) => {
  const { currentPassword, newPassword } = req.body;

  // Get user with password
  const user = await User.findById(req.user.id).select('+password');

  // Check if current password matches
  const isMatch = await user.matchPassword(currentPassword);

  if (!isMatch) {
    return next(new AppError('Current password is incorrect', 401));
  }

  // Update password
  user.password = newPassword;
  await user.save();

  // Send token response
  sendTokenResponse(user, 200, res);
});

/**
 * Logout user
 * @route GET /api/auth/logout
 * @access Private
 */
export const logout = catchAsync(async (req, res) => {
  res.status(200).json({
    success: true,
    message: 'Logged out successfully'
  });
}); 