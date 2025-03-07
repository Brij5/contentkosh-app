import React, { createContext, useContext, useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const AuthContext = createContext(null);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      getCurrentUser();
    } else {
      setLoading(false);
    }
  }, []);

  const getCurrentUser = async () => {
    try {
      const token = localStorage.getItem('token');
      if (!token) {
        setLoading(false);
        return;
      }
      const response = await axios.get('/api/auth/me', {
        headers: { Authorization: `Bearer ${token}` }
      });
      setUser(response.data.user);
    } catch (error) {
      console.error('Error fetching current user:', error);
      localStorage.removeItem('token');
    } finally {
      setLoading(false);
    }
  };

  const login = async (email, password) => {
    try {
      setError(null);
      const response = await axios.post('/api/auth/login', { email, password });
      const { token, user } = response.data;

      localStorage.setItem('token', token);
      setUser(user);

      axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;

      return user;
    } catch (error) {
      setError(error.response?.data?.message || 'An error occurred during login');
      throw error;
    }
  };

  const register = async (userData) => {
    try {
      setError(null);
      const response = await axios.post('/api/auth/register', userData);
      const { token, user } = response.data;

      localStorage.setItem('token', token);
      setUser(user);

      axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;

      return user;
    } catch (error) {
      setError(error.response?.data?.message || 'An error occurred during registration');
      throw error;
    }
  };

  const logout = () => {
    localStorage.removeItem('token');
    delete axios.defaults.headers.common['Authorization'];
    setUser(null);
    navigate('/login');
  };

  const forgotPassword = async (email) => {
    try {
      setError(null);
      const response = await axios.post('/api/auth/forgot-password', { email });
      return response.data;
    } catch (error) {
      setError(error.response?.data?.message || 'An error occurred');
      throw error;
    }
  };

  const resetPassword = async (token, password) => {
    try {
      setError(null);
      const response = await axios.patch(`/api/auth/reset-password/${token}`, { password });
      return response.data;
    } catch (error) {
      setError(error.response?.data?.message || 'An error occurred');
      throw error;
    }
  };

  const updatePassword = async (currentPassword, newPassword) => {
    try {
      setError(null);
      const response = await axios.patch('/api/auth/update-password', {
        currentPassword,
        newPassword
      });
      return response.data;
    } catch (error) {
      setError(error.response?.data?.message || 'An error occurred');
      throw error;
    }
  };

  const verifyEmail = async (token) => {
    try {
      setError(null);
      const response = await axios.get(`/api/auth/verify-email/${token}`);
      await getCurrentUser(); // Refresh user data after verification
      return response.data;
    } catch (error) {
      setError(error.response?.data?.message || 'An error occurred');
      throw error;
    }
  };

  const value = {
    user,
    loading,
    error,
    login,
    register,
    logout,
    forgotPassword,
    resetPassword,
    updatePassword,
    verifyEmail,
    getCurrentUser
  };

  return (
    <AuthContext.Provider value={value}>
      {!loading && children}
    </AuthContext.Provider>
  );
};

AuthProvider.propTypes = {
  children: PropTypes.node.isRequired
};

export default AuthContext;