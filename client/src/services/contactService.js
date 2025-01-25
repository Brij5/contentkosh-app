import ApiService from './apiService';

class ContactService extends ApiService {
  constructor() {
    super('/contacts');
  }

  async getUnread(params = {}) {
    const response = await this.getAll({ ...params, status: 'unread' });
    return response.data;
  }

  async getRead(params = {}) {
    const response = await this.getAll({ ...params, status: 'read' });
    return response.data;
  }

  async getArchived(params = {}) {
    const response = await this.getAll({ ...params, status: 'archived' });
    return response.data;
  }

  async getByCategory(category, params = {}) {
    const response = await this.getAll({ ...params, category });
    return response.data;
  }

  async getByPriority(priority, params = {}) {
    const response = await this.getAll({ ...params, priority });
    return response.data;
  }

  async markAsRead(id) {
    const response = await this.axiosInstance.patch(`${this.resourcePath}/${id}/read`);
    return response.data;
  }

  async markAsUnread(id) {
    const response = await this.axiosInstance.patch(`${this.resourcePath}/${id}/unread`);
    return response.data;
  }

  async archive(id) {
    const response = await this.axiosInstance.patch(`${this.resourcePath}/${id}/archive`);
    return response.data;
  }

  async unarchive(id) {
    const response = await this.axiosInstance.patch(`${this.resourcePath}/${id}/unarchive`);
    return response.data;
  }

  async setPriority(id, priority) {
    const response = await this.axiosInstance.patch(`${this.resourcePath}/${id}/priority`, { priority });
    return response.data;
  }

  async addNote(id, note) {
    const response = await this.axiosInstance.post(`${this.resourcePath}/${id}/notes`, { note });
    return response.data;
  }

  async updateNote(id, noteId, note) {
    const response = await this.axiosInstance.patch(`${this.resourcePath}/${id}/notes/${noteId}`, {
      note
    });
    return response.data;
  }

  async deleteNote(id, noteId) {
    const response = await this.axiosInstance.delete(`${this.resourcePath}/${id}/notes/${noteId}`);
    return response.data;
  }

  async getNotes(id, params = {}) {
    const response = await this.axiosInstance.get(`${this.resourcePath}/${id}/notes`, { params });
    return response.data;
  }

  async addReply(id, reply) {
    const response = await this.axiosInstance.post(`${this.resourcePath}/${id}/replies`, { reply });
    return response.data;
  }

  async updateReply(id, replyId, reply) {
    const response = await this.axiosInstance.patch(`${this.resourcePath}/${id}/replies/${replyId}`, {
      reply
    });
    return response.data;
  }

  async deleteReply(id, replyId) {
    const response = await this.axiosInstance.delete(`${this.resourcePath}/${id}/replies/${replyId}`);
    return response.data;
  }

  async getReplies(id, params = {}) {
    const response = await this.axiosInstance.get(`${this.resourcePath}/${id}/replies`, { params });
    return response.data;
  }

  async assignTo(id, userId) {
    const response = await this.axiosInstance.patch(`${this.resourcePath}/${id}/assign`, { userId });
    return response.data;
  }

  async unassign(id) {
    const response = await this.axiosInstance.patch(`${this.resourcePath}/${id}/unassign`);
    return response.data;
  }

  async getAssignedTo(userId, params = {}) {
    const response = await this.getAll({ ...params, assignedTo: userId });
    return response.data;
  }

  async getCategories() {
    const response = await this.axiosInstance.get(`${this.resourcePath}/categories`);
    return response.data;
  }

  async getStats() {
    const response = await this.axiosInstance.get(`${this.resourcePath}/stats`);
    return response.data;
  }
}

export default new ContactService();