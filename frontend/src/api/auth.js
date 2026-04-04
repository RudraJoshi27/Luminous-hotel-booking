import axios from 'axios';

const api = axios.create({
  baseURL: 'http://localhost:5000/api',
});

export const loginCall = async (credentials) => {
  const res = await api.post('/auth/login', credentials);
  return res.data;
};

export const registerCall = async (userData) => {
  const res = await api.post('/auth/register', userData);
  return res.data;
};
