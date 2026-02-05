import api from './api';

export const todoService = {
  getAll: async () => {
    const response = await api.get('/todos');
    return response.data;
  },

  create: async (todosData) => {
    const response = await api.post('/todos', todosData);
    return response.data;
  },

  updateStatus: async (id, status) => {
    const response = await api.put(`/todos/${id}`, { status });
    return response.data;
  },

  delete: async (id) => {
    const response = await api.delete(`/todos/${id}`);
    return response.data;
  }
};
