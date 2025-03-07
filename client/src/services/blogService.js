import ApiService from './apiService';

class BlogService extends ApiService {
  constructor() {
    super('/blogs');
  }

  async getPublishedPosts(params = {}) {
    const response = await this.getAll({ ...params, status: 'published' });
    return response.data;
  }

  async getDraftPosts(params = {}) {
    const response = await this.getAll({ ...params, status: 'draft' });
    return response.data;
  }

  async getBySlug(slug) {
    const response = await this.axiosInstance.get(`${this.resourcePath}/slug/${slug}`);
    return response.data;
  }

  async getByCategory(category, params = {}) {
    const response = await this.getAll({ ...params, category });
    return response.data;
  }

  async getByTag(tag, params = {}) {
    const response = await this.getAll({ ...params, tag });
    return response.data;
  }

  async getByAuthor(authorId, params = {}) {
    const response = await this.getAll({ ...params, author: authorId });
    return response.data;
  }

  async getFeatured(params = {}) {
    const response = await this.getAll({ ...params, featured: true });
    return response.data;
  }

  async getTrending(params = {}) {
    const response = await this.getAll({ ...params, sort: '-views' });
    return response.data;
  }

  async getRelated(postId, params = {}) {
    const response = await this.axiosInstance.get(`${this.resourcePath}/${postId}/related`, { params });
    return response.data;
  }

  async publish(id) {
    const response = await this.axiosInstance.patch(`${this.resourcePath}/${id}/publish`);
    return response.data;
  }

  async unpublish(id) {
    const response = await this.axiosInstance.patch(`${this.resourcePath}/${id}/unpublish`);
    return response.data;
  }

  async feature(id) {
    const response = await this.axiosInstance.patch(`${this.resourcePath}/${id}/feature`);
    return response.data;
  }

  async unfeature(id) {
    const response = await this.axiosInstance.patch(`${this.resourcePath}/${id}/unfeature`);
    return response.data;
  }

  async addComment(postId, data) {
    const response = await this.axiosInstance.post(`${this.resourcePath}/${postId}/comments`, data);
    return response.data;
  }

  async getComments(postId, params = {}) {
    const response = await this.axiosInstance.get(`${this.resourcePath}/${postId}/comments`, { params });
    return response.data;
  }

  async deleteComment(postId, commentId) {
    const response = await this.axiosInstance.delete(`${this.resourcePath}/${postId}/comments/${commentId}`);
    return response.data;
  }

  async like(postId) {
    const response = await this.axiosInstance.post(`${this.resourcePath}/${postId}/like`);
    return response.data;
  }

  async unlike(postId) {
    const response = await this.axiosInstance.delete(`${this.resourcePath}/${postId}/like`);
    return response.data;
  }

  async getLikes(postId) {
    const response = await this.axiosInstance.get(`${this.resourcePath}/${postId}/likes`);
    return response.data;
  }

  async getCategories() {
    const response = await this.axiosInstance.get(`${this.resourcePath}/categories`);
    return response.data;
  }

  async getTags() {
    const response = await this.axiosInstance.get(`${this.resourcePath}/tags`);
    return response.data;
  }

  async getStats() {
    const response = await this.axiosInstance.get(`${this.resourcePath}/stats`);
    return response.data;
  }
}

const blogService = new BlogService();

// Helper function for getBlog to match the useData hook expectations
export const getBlog = (id) => {
  return blogService.getById(id);
};

export default blogService;
