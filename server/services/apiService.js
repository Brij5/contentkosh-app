{\rtf1\ansi\ansicpg1252\cocoartf2821
\cocoatextscaling0\cocoaplatform0{\fonttbl\f0\fswiss\fcharset0 Helvetica;}
{\colortbl;\red255\green255\blue255;}
{\*\expandedcolortbl;;}
\paperw11900\paperh16840\margl1440\margr1440\vieww11520\viewh8400\viewkind0
\pard\tx720\tx1440\tx2160\tx2880\tx3600\tx4320\tx5040\tx5760\tx6480\tx7200\tx7920\tx8640\pardirnatural\partightenfactor0

\f0\fs24 \cf0 import axios from 'axios';\
import dotenv from 'dotenv';\
\
dotenv.config();\
\
const BASE_URL = process.env.REACT_APP_API_URL || 'http://localhost:5001/api';\
\
class ApiService \{\
  constructor(resourcePath) \{\
    this.resourcePath = resourcePath;\
    this.axiosInstance = axios.create(\{\
      baseURL: BASE_URL,\
      headers: \{\
        'Content-Type': 'application/json'\
      \}\
    \});\
\
    this.axiosInstance.interceptors.request.use(\
      (config) => \{\
        const token = localStorage.getItem('token');\
        if (token) \{\
          config.headers.Authorization = `Bearer $\{token\}`;\
        \}\
        return config;\
      \},\
      (error) => \{\
        return Promise.reject(error);\
      \}\
    );\
\
    this.axiosInstance.interceptors.response.use(\
      (response) => response,\
      async (error) => \{\
        const originalRequest = error.config;\
        if (error.response?.status === 401 && !originalRequest._retry) \{\
          originalRequest._retry = true;\
          try \{\
            const response = await axios.post(`$\{BASE_URL\}/auth/refresh-token`);\
            const \{ token \} = response.data;\
            if (token) \{\
              localStorage.setItem('token', token);\
              this.axiosInstance.defaults.headers.common['Authorization'] = `Bearer $\{token\}`;\
              return this.axiosInstance(originalRequest);\
            \}\
          \} catch (refreshError) \{\
            localStorage.removeItem('token');\
            window.location.href = '/login';\
            return Promise.reject(refreshError);\
          \}\
        \}\
        return Promise.reject(error);\
      \}\
    );\
  \}\
\
  async getAll(queryParams = \{\}) \{\
    try \{\
      const response = await this.axiosInstance.get(this.resourcePath, \{ params: queryParams \});\
      console.log('API Response:', response.data); // Debug log\
      return response;\
    \} catch (error) \{\
      console.error('Error fetching resources:', error);\
      throw new Error('Failed to fetch resources');\
    \}\
  \}\
const response = await fetch('/api/services', \{\
  headers: \{\
    'Authorization': `Bearer $\{localStorage.getItem('token')\}`,\
  \},\
\});\
  // Other CRUD operations...\
\}\
\
export default ApiService;}