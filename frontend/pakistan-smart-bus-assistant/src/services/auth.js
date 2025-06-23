// src/services/auth.js
import api from './api';

export const registerUser = async (userData) => {
  const res = await api.post('users/register/', userData);
  return res.data;
};

export const loginUser = async (credentials) => {
  const res = await api.post('users/login/', credentials);
  return res.data; // ✅ Must return user + token
};
