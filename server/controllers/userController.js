import User from '../models/user.js';
import catchAsync from '../utils/catchAsync.js';
import AppError from '../utils/AppError.js';

/**
 * Get all users
 * @route GET /api/users
 * @access Private (Admin)
 */
export const getUsers = catchAsync(async (req, res) => {
  const users = await User.find().select('-password');
  res.status(200).json({
    success: true,
    count: users.length,
    data: users
  });
});

/**
 * Get user by ID
 * @route GET /api/users/:id
 * @access Private (Admin)
 */
export const getUserById = catchAsync(async (req, res, next) => {
  const user = await User.findById(req.params.id).select('-password');
  
  if (!user) {
    return next(new AppError('User not found', 404));
  }
  
  res.status(200).json({
    success: true,
    data: user
  });
});

/**
 * Update user (admin)
 * @route PUT /api/users/:id
 * @access Private (Admin)
 */
export const updateUser = catchAsync(async (req, res, next) => {
  // Don't allow password updates through this route
  if (req.body.password) {
    delete req.body.password;
  }
  
  const user = await User.findByIdAndUpdate(
    req.params.id,
    req.body,
    { new: true, runValidators: true }
  ).select('-password');
  
  if (!user) {
    return next(new AppError('User not found', 404));
  }
  
  res.status(200).json({
    success: true,
    data: user
  });
});

/**
 * Delete user
 * @route DELETE /api/users/:id
 * @access Private (Admin)
 */
export const deleteUser = catchAsync(async (req, res, next) => {
  const user = await User.findByIdAndDelete(req.params.id);
  
  if (!user) {
    return next(new AppError('User not found', 404));
  }
  
  res.status(200).json({
    success: true,
    data: {}
  });
});

/**
 * Get current user profile
 * @route GET /api/users/me
 * @access Private
 */
export const getCurrentUser = catchAsync(async (req, res) => {
  // req.user is set by the protect middleware
  const user = await User.findById(req.user.id).select('-password');
  
  res.status(200).json({
    success: true,
    data: user
  });
});

/**
 * Update current user profile
 * @route PUT /api/users/me
 * @access Private
 */
export const updateCurrentUser = catchAsync(async (req, res) => {
  // Don't allow password updates or role change through this route
  if (req.body.password) delete req.body.password;
  if (req.body.role) delete req.body.role;
  
  const user = await User.findByIdAndUpdate(
    req.user.id,
    req.body,
    { new: true, runValidators: true }
  ).select('-password');
  
  res.status(200).json({
    success: true,
    data: user
  });
});

/**
 * Update password
 * @route PUT /api/users/password
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
  
  res.status(200).json({
    success: true,
    message: 'Password updated successfully'
  });
});