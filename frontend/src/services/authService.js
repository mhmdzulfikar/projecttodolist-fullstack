import api from './api';

export const authService  = {
    getMe: async () => {
        const response = await api.get('/auth/me');
        return response.data;
    },

    loginUser: async (userData) => {
        const response = await api.post('/auth/login', userData);
        return response.data;
    },

    registerUser: async (userData) => {
        const response = await api.post('/auth/register', userData);
        return response.data;
    }

};