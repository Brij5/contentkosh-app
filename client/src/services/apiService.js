import axios from 'axios';

const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:5001/api';
const axiosInstance = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json'
  }
});

// Add request interceptor to attach JWT token if available
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

// Add response interceptor to handle unauthorized responses and retry with refreshed token
axiosInstance.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;
    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;
      try {
        const response = await axios.post(`${API_URL}/auth/refresh-token`);
        const { token } = response.data;
        if (token) {
          localStorage.setItem('token', token);
          axiosInstance.defaults.headers.common['Authorization'] = `Bearer ${token}`;
          return axiosInstance(originalRequest);
        }
      } catch (refreshError) {
        localStorage.removeItem('token');
        window.location.href = '/login';
        return Promise.reject(refreshError);
      }
    }
    return Promise.reject(error);
  }
);

class ApiService {
  constructor(resourcePath) {
    this.resourcePath = resourcePath;
  }

  async getAll(params = {}) {
    try {
      const response = await axiosInstance.get(this.resourcePath, { params });
      return response.data;
    } catch (error) {
      console.error('Error fetching resources:', error);
      throw new Error('Failed to fetch resources');
    }
  }

  async getById(id) {
    try {
      const response = await axiosInstance.get(`${this.resourcePath}/${id}`);
      return response.data;
    } catch (error) {
      console.error(`Error fetching resource with ID ${id}:`, error);
      throw new Error('Failed to fetch resource');
    }
  }

  async create(data) {
    try {
      const response = await axiosInstance.post(this.resourcePath, data);
      return response.data;
    } catch (error) {
      console.error('Error creating resource:', error);
      throw new Error('Failed to create resource');
    }
  }

  async update(id, data) {
    try {
      const response = await axiosInstance.patch(`${this.resourcePath}/${id}`, data);
      return response.data;
    } catch (error) {
      console.error(`Error updating resource with ID ${id}:`, error);
      throw new Error('Failed to update resource');
    }
  }

  async delete(id) {
    try {
      const response = await axiosInstance.delete(`${this.resourcePath}/${id}`);
      return response.data;
    } catch (error) {
      console.error(`Error deleting resource with ID ${id}:`, error);
      throw new Error('Failed to delete resource');
    }
  }

  async search(query) {
    try {
      const response = await axiosInstance.get(`${this.resourcePath}/search`, { params: { query } });
      return response.data;
    } catch (error) {
      console.error('Error searching resources:', error);
      throw new Error('Failed to search resources');
    }
  }

  async uploadFile(file, onProgress) {
    try {
      const formData = new FormData();
      formData.append('file', file);
      const response = await axiosInstance.post(`${this.resourcePath}/upload`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        },
        onUploadProgress: (progressEvent) => {
          if (onProgress) {
            const percentCompleted = Math.round((progressEvent.loaded * 100) / progressEvent.total);
            onProgress(percentCompleted);
          }
        }
      });
      return response.data;
    } catch (error) {
      console.error('Error uploading file:', error);
      throw new Error('Failed to upload file');
    }
  }

  async downloadFile(fileId) {
    try {
      const response = await axiosInstance.get(`${this.resourcePath}/download/${fileId}`, {
        responseType: 'blob'
      });
      return response.data;
    } catch (error) {
      console.error('Error downloading file:', error);
      throw new Error('Failed to download file');
    }
  }

  async bulkCreate(data) {
    try {
      const response = await axiosInstance.post(`${this.resourcePath}/bulk`, data);
      return response.data;
    } catch (error) {
      console.error('Error creating resources in bulk:', error);
      throw new Error('Failed to create resources in bulk');
    }
  }

  async bulkUpdate(data) {
    try {
      const response = await axiosInstance.patch(`${this.resourcePath}/bulk`, data);
      return response.data;
    } catch (error) {
      console.error('Error updating resources in bulk:', error);
      throw new Error('Failed to update resources in bulk');
    }
  }

  async bulkDelete(ids) {
    try {
      const response = await axiosInstance.delete(`${this.resourcePath}/bulk`, { data: { ids } });
      return response.data;
    } catch (error) {
      console.error('Error deleting resources in bulk:', error);
      throw new Error('Failed to delete resources in bulk');
    }
  }

  async export(format = 'csv') {
    try {
      const response = await axiosInstance.get(`${this.resourcePath}/export`, {
        params: { format },
        responseType: 'blob'
      });
      return response.data;
    } catch (error) {
      console.error('Error exporting resources:', error);
      throw new Error('Failed to export resources');
    }
  }

  async import(file, onProgress) {
    try {
      const formData = new FormData();
      formData.append('file', file);
      const response = await axiosInstance.post(`${this.resourcePath}/import`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        },
        onUploadProgress: (progressEvent) => {
          if (onProgress) {
            const percentCompleted = Math.round((progressEvent.loaded * 100) / progressEvent.total);
            onProgress(percentCompleted);
          }
        }
      });
      return response.data;
    } catch (error) {
      console.error('Error importing file:', error);
      throw new Error('Failed to import file');
    }
  }
}

export const createApiService = (resourcePath) => new ApiService(resourcePath);
export default ApiService;