import axios from 'axios';

const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:5000/api';

const axiosInstance = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json'
  }
});

axiosInstance.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

axiosInstance.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      localStorage.removeItem('token');
      window.location.href = '/login';
    }
    return Promise.reject(error);
  }
);

export const login = async (credentials) => {
  const response = await axiosInstance.post('/auth/login', credentials);
  if (response.data.token) {
    localStorage.setItem('token', response.data.token);
  }
  return response.data;
};

export const register = async (userData) => {
  const response = await axiosInstance.post('/auth/register', userData);
  return response.data;
};

export const verifyEmail = async (token) => {
  const response = await axiosInstance.post('/auth/verify-email', { token });
  return response.data;
};

export const forgotPassword = async (email) => {
  const response = await axiosInstance.post('/auth/forgot-password', { email });
  return response.data;
};

export const resetPassword = async (token, password) => {
  const response = await axiosInstance.post('/auth/reset-password', { token, password });
  return response.data;
};

export const changePassword = async (data) => {
  const response = await axiosInstance.post('/auth/change-password', data);
  return response.data;
};

export const updateProfile = async (data) => {
  const response = await axiosInstance.patch('/auth/profile', data);
  return response.data;
};

export const getProfile = async () => {
  const response = await axiosInstance.get('/auth/profile');
  return response.data;
};

export const refreshToken = async () => {
  const response = await axiosInstance.post('/auth/refresh-token');
  if (response.data.token) {
    localStorage.setItem('token', response.data.token);
  }
  return response.data;
};

export const logout = async () => {
  try {
    await axiosInstance.post('/auth/logout');
  } finally {
    localStorage.removeItem('token');
  }
};

export const loginWithGoogle = async (tokenId) => {
  const response = await axiosInstance.post('/auth/google', { tokenId });
  if (response.data.token) {
    localStorage.setItem('token', response.data.token);
  }
  return response.data;
};

export const checkAuth = async () => {
  try {
    const response = await axiosInstance.get('/auth/check');
    return response.data;
  } catch (error) {
    localStorage.removeItem('token');
    throw error;
  }
};

export default {
  login,
  register,
  verifyEmail,
  forgotPassword,
  resetPassword,
  changePassword,
  updateProfile,
  getProfile,
  refreshToken,
  logout,
  loginWithGoogle,
  checkAuth
};