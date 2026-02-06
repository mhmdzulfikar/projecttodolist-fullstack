import api from './api';

export const snippetService  = {

  getAll: async () => {
    const response = await api.get('/snippets');
    return response.data;
  },

  create: async (data) => {
    const response = await api.post('/snippets', data);
    return response.data;
  },

  delete: async (id) => {
    const response = await api.delete(`/snippets/${id}`);
    return response.data;
  },

  updateStatus: async (id, data) => {
    const response = await api.put(`/snippets/${id}`, data);
    return response.data;
  }
};
