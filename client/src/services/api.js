import axios from 'axios';
import { toast } from 'react-toastify';

const API_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:5001/api';

// Create axios instance with default config
const api = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Request interceptor for adding auth token
api.interceptors.request.use(
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

// Response interceptor for handling errors
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      localStorage.removeItem('token');
      window.location.href = '/auth/login';
    }
    return Promise.reject(error);
  }
);

// Auth endpoints
export const authAPI = {
  login: (credentials) => api.post('/auth/login', credentials),
  register: (userData) => api.post('/auth/register', userData),
  forgotPassword: (email) => api.post('/auth/forgot-password', { email }),
  resetPassword: (token, password) => api.post(`/auth/reset-password/${token}`, { password }),
  verifyEmail: (token) => api.get(`/auth/verify-email/${token}`),
};

// Users endpoints
export const usersAPI = {
  getUsers: () => api.get('/users'),
  getUser: (id) => api.get(`/users/${id}`),
  updateUser: (id, userData) => api.put(`/users/${id}`, userData),
  deleteUser: (id) => api.delete(`/users/${id}`),
};

// Content endpoints
export const contentAPI = {
  getContent: () => api.get('/content'),
  getContentById: (id) => api.get(`/content/${id}`),
  createContent: (contentData) => api.post('/content', contentData),
  updateContent: (id, contentData) => api.put(`/content/${id}`, contentData),
  deleteContent: (id) => api.delete(`/content/${id}`),
};

// User API calls
export const userAPI = {
  getProfile: async () => {
    return api.get('/users/profile');
  },
  
  updateProfile: async (userData) => {
    return api.put('/users/profile', userData);
  },
  
  updatePassword: async (passwords) => {
    return api.put('/users/password', passwords);
  },
  
  uploadAvatar: async (formData) => {
    return api.post('/users/avatar', formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
  },
};

// Blog API calls
export const blogAPI = {
  getBlogs: async (params) => {
    return api.get('/blogs', { params });
  },
  
  getBlogById: async (id) => {
    return api.get(`/blogs/${id}`);
  },
  
  createBlog: async (blogData) => {
    return api.post('/blogs', blogData);
  },
  
  updateBlog: async (id, blogData) => {
    return api.put(`/blogs/${id}`, blogData);
  },
  
  deleteBlog: async (id) => {
    return api.delete(`/blogs/${id}`);
  },
};

// Contact API calls
export const contactAPI = {
  submitContact: async (contactData) => {
    return api.post('/contact', contactData);
  },
};

export default api;
