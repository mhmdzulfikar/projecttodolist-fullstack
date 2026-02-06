import axios from 'axios';

// 1. Buat Instance Axios
const api = axios.create({
  baseURL: 'http://127.0.0.1:5000', 
  headers: {
    "Content-Type" : "application/json"
  }
});


api.interceptors.request.use(
  (config) => {
    // Ambil token dari saku browser
    const token = localStorage.getItem('token');
    
    // Kalau ada token, tempelkan ke Header Authorization
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// --- NOTIFICATION API ---

export const getNotifications = async () => {
  const response = await api.get('/notifications');
  return response.data;
};

export const createBroadcast = async (data) => {
  const response = await api.post('/notifications', data);
  return response.data;
};

export const getCards = async () => {
  const response = await api.get('/cards');
  return response.data;
};

export const createCard = async (cardData) => {
  const response = await api.post('/cards', cardData);
  return response.data;
};

export const updateCardStatus = async (id, status) => {
  // status: 'progress' atau 'future'
  const response = await api.put(`/cards/${id}`, { status });
  return response.data;
};

// --- NOTE API ---
export const getNote = async () => {
  const response = await api.get('/notes');
  return response.data;
};

export const updateNote = async (data) => {
  const response = await api.put('/notes', data);
  return response.data;
};

export const deleteCard = async (id) => {
  const response = await api.delete(`/cards/${id}`);
  return response.data;
};

export default api;