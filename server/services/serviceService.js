import axios from 'axios';
import ApiService from './apiService';

class ServiceService extends ApiService {
  constructor() {
    super('/services');
  }

  async getActiveServices(params = {}) {
    try {
      const response = await this.getAll({ ...params, status: 'active' });
      console.log('Response from getActiveServices:', response.data); // Debug log
      if (!response.data || !Array.isArray(response.data.services)) {
        throw new Error('Invalid response format');
      }
      return response.data.services;
    } catch (error) {
      console.error('Error fetching active services:', error);
      throw new Error('Failed to fetch active services');
    }
  }

  async getInactiveServices(params = {}) {
    try {
      const response = await this.getAll({ ...params, status: 'inactive' });
      return response.data.services;
    } catch (error) {
      console.error('Error fetching inactive services:', error);
      throw new Error('Failed to fetch inactive services');
    }
  }

  async getBySlug(slug) {
    try {
      const response = await this.axiosInstance.get(`${this.resourcePath}/slug/${slug}`);
      return response.data.service;
    } catch (error) {
      console.error('Error fetching service by slug:', error);
      throw new Error('Failed to fetch service by slug');
    }
  }

  async getByCategory(category, params = {}) {
    try {
      const response = await this.getAll({ ...params, category });
      return response.data.services;
    } catch (error) {
      console.error('Error fetching services by category:', error);
      throw new Error('Failed to fetch services by category');
    }
  }

  async getFeatured(params = {}) {
    try {
      const response = await this.getAll({ ...params, featured: true });
      return response.data.services;
    } catch (error) {
      console.error('Error fetching featured services:', error);
      throw new Error('Failed to fetch featured services');
    }
  }

  async getPopular(params = {}) {
    try {
      const response = await this.getAll({ ...params, sort: '-popularity' });
      return response.data.services;
    } catch (error) {
      console.error('Error fetching popular services:', error);
      throw new Error('Failed to fetch popular services');
    }
  }

  // Add other methods like activate, deactivate, feature, unfeature, etc.
}

export default new ServiceService();
