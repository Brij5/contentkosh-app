import ApiService from './apiService';

class UserService extends ApiService {
  constructor() {
    super('/users');
  }

  async getActiveUsers(params = {}) {
    const response = await this.getAll({ ...params, status: 'active' });
    return response.data;
  }

  async getInactiveUsers(params = {}) {
    const response = await this.getAll({ ...params, status: 'inactive' });
    return response.data;
  }

  async getByRole(role, params = {}) {
    const response = await this.getAll({ ...params, role });
    return response.data;
  }

  async activate(id) {
    const response = await this.axiosInstance.patch(`${this.resourcePath}/${id}/activate`);
    return response.data;
  }

  async deactivate(id) {
    const response = await this.axiosInstance.patch(`${this.resourcePath}/${id}/deactivate`);
    return response.data;
  }

  async updateRole(id, role) {
    const response = await this.axiosInstance.patch(`${this.resourcePath}/${id}/role`, { role });
    return response.data;
  }

  async updatePermissions(id, permissions) {
    const response = await this.axiosInstance.patch(`${this.resourcePath}/${id}/permissions`, {
      permissions
    });
    return response.data;
  }

  async getPermissions(id) {
    const response = await this.axiosInstance.get(`${this.resourcePath}/${id}/permissions`);
    return response.data;
  }

  async addToTeam(id, teamId) {
    const response = await this.axiosInstance.post(`${this.resourcePath}/${id}/teams`, { teamId });
    return response.data;
  }

  async removeFromTeam(id, teamId) {
    const response = await this.axiosInstance.delete(`${this.resourcePath}/${id}/teams/${teamId}`);
    return response.data;
  }

  async getTeams(id) {
    const response = await this.axiosInstance.get(`${this.resourcePath}/${id}/teams`);
    return response.data;
  }

  async updatePreferences(id, preferences) {
    const response = await this.axiosInstance.patch(`${this.resourcePath}/${id}/preferences`, {
      preferences
    });
    return response.data;
  }

  async getPreferences(id) {
    const response = await this.axiosInstance.get(`${this.resourcePath}/${id}/preferences`);
    return response.data;
  }

  async updateNotificationSettings(id, settings) {
    const response = await this.axiosInstance.patch(`${this.resourcePath}/${id}/notifications`, {
      settings
    });
    return response.data;
  }

  async getNotificationSettings(id) {
    const response = await this.axiosInstance.get(`${this.resourcePath}/${id}/notifications`);
    return response.data;
  }

  async getActivity(id, params = {}) {
    const response = await this.axiosInstance.get(`${this.resourcePath}/${id}/activity`, { params });
    return response.data;
  }

  async getSessions(id) {
    const response = await this.axiosInstance.get(`${this.resourcePath}/${id}/sessions`);
    return response.data;
  }

  async terminateSession(id, sessionId) {
    const response = await this.axiosInstance.delete(`${this.resourcePath}/${id}/sessions/${sessionId}`);
    return response.data;
  }

  async terminateAllSessions(id) {
    const response = await this.axiosInstance.delete(`${this.resourcePath}/${id}/sessions`);
    return response.data;
  }

  async enable2FA(id) {
    const response = await this.axiosInstance.post(`${this.resourcePath}/${id}/2fa/enable`);
    return response.data;
  }

  async disable2FA(id) {
    const response = await this.axiosInstance.post(`${this.resourcePath}/${id}/2fa/disable`);
    return response.data;
  }

  async verify2FA(id, token) {
    const response = await this.axiosInstance.post(`${this.resourcePath}/${id}/2fa/verify`, { token });
    return response.data;
  }

  async getRoles() {
    const response = await this.axiosInstance.get(`${this.resourcePath}/roles`);
    return response.data;
  }

  async getStats() {
    const response = await this.axiosInstance.get(`${this.resourcePath}/stats`);
    return response.data;
  }
}

export default new UserService();
