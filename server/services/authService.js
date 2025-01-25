import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import User from '../models/user.js';

/**
 * Register a new user
 * @param {Object} userData - User data (name, email, password)
 * @returns {Object} User data and token
 */
export const register = async (userData) => {
  const { name, email, password } = userData;

  // Check if user already exists
  const userExists = await User.findOne({ email });
  if (userExists) {
    throw new Error('User already exists');
  }

  // Create user
  const user = await User.create({
    name,
    email,
    password
  });

  // Return user with token
  return {
    _id: user._id,
    name: user.name,
    email: user.email,
    role: user.role,
    token: generateToken(user._id)
  };
};

/**
 * Login user
 * @param {string} email - User email
 * @param {string} password - User password
 * @returns {Object} User data and token
 */
export const login = async (email, password) => {
  // Find user by email
  const user = await User.findOne({ email });

  // Check if user exists and password matches
  if (user && (await bcrypt.compare(password, user.password))) {
    return {
      _id: user._id,
      name: user.name,
      email: user.email,
      role: user.role,
      token: generateToken(user._id)
    };
  } else {
    throw new Error('Invalid email or password');
  }
};

/**
 * Process forgot password request
 * @param {string} email - User email
 */
export const forgotPassword = async (email) => {
  // Find user by email
  const user = await User.findOne({ email });
  if (!user) {
    throw new Error('User not found');
  }

  // Generate password reset token
  const resetToken = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
    expiresIn: '1h'
  });

  // Save reset token to user
  user.resetPasswordToken = resetToken;
  user.resetPasswordExpires = Date.now() + 3600000; // 1 hour
  await user.save();

  // In a real application, you would send an email with the reset link
  // For this demo, we're just returning success
  return true;
};

/**
 * Reset user password
 * @param {string} token - Reset password token
 * @param {string} newPassword - New password
 */
export const resetPassword = async (token, newPassword) => {
  try {
    // Verify token
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    // Find user by id and check if reset token is valid
    const user = await User.findOne({
      _id: decoded.id,
      resetPasswordToken: token,
      resetPasswordExpires: { $gt: Date.now() }
    });

    if (!user) {
      throw new Error('Invalid or expired password reset token');
    }

    // Update password
    user.password = newPassword;
    user.resetPasswordToken = undefined;
    user.resetPasswordExpires = undefined;
    await user.save();

    return true;
  } catch (error) {
    throw new Error('Password reset failed');
  }
};

/**
 * Generate JWT token
 * @param {string} id - User ID
 * @returns {string} JWT token
 */
const generateToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRES_IN
  });
};