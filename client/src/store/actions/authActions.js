import { authAPI } from '../../services/api';
import {
  loginStart,
  loginSuccess,
  loginFailure,
  logout,
  registerStart,
  registerSuccess,
  registerFailure,
  updateProfileStart,
  updateProfileSuccess,
  updateProfileFailure,
  clearError,
} from '../slices/authSlice';
import { toast } from 'react-toastify';

// Login action
export const loginUser = (credentials) => async (dispatch) => {
  try {
    dispatch(loginStart());
    const data = await authAPI.login(credentials);
    dispatch(loginSuccess(data));
    toast.success('Login successful!');
    return true;
  } catch (error) {
    dispatch(loginFailure(error.response?.data?.message || 'Login failed'));
    return false;
  }
};

// Register action
export const registerUser = (userData) => async (dispatch) => {
  try {
    dispatch(registerStart());
    const data = await authAPI.register(userData);
    dispatch(registerSuccess(data));
    toast.success('Registration successful!');
    return true;
  } catch (error) {
    dispatch(registerFailure(error.response?.data?.message || 'Registration failed'));
    return false;
  }
};

// Logout action
export const logoutUser = () => async (dispatch) => {
  try {
    await authAPI.logout();
    dispatch(logout());
    toast.success('Logged out successfully');
  } catch (error) {
    console.error('Logout error:', error);
    // Still logout the user on the client side
    dispatch(logout());
  }
};

// Update profile action
export const updateUserProfile = (userData) => async (dispatch) => {
  try {
    dispatch(updateProfileStart());
    const data = await authAPI.updateProfile(userData);
    dispatch(updateProfileSuccess(data));
    toast.success('Profile updated successfully!');
    return true;
  } catch (error) {
    dispatch(updateProfileFailure(error.response?.data?.message || 'Profile update failed'));
    return false;
  }
};

// Forgot password action
export const forgotPassword = (email) => async () => {
  try {
    await authAPI.forgotPassword(email);
    toast.success('Password reset instructions sent to your email');
    return true;
  } catch (error) {
    toast.error(error.response?.data?.message || 'Failed to send reset instructions');
    return false;
  }
};

// Reset password action
export const resetPassword = (token, newPassword) => async () => {
  try {
    await authAPI.resetPassword(token, newPassword);
    toast.success('Password reset successful! Please login with your new password');
    return true;
  } catch (error) {
    toast.error(error.response?.data?.message || 'Password reset failed');
    return false;
  }
};

// Verify email action
export const verifyEmail = (token) => async () => {
  try {
    await authAPI.verifyEmail(token);
    toast.success('Email verified successfully!');
    return true;
  } catch (error) {
    toast.error(error.response?.data?.message || 'Email verification failed');
    return false;
  }
};

// Clear auth errors
export const clearAuthError = () => (dispatch) => {
  dispatch(clearError());
}; 