// src/api.ts
import axios from 'axios';

const API_BASE_URL = 'https://assignment.stage.crafto.app';

export const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

export const login = (username: string, otp: string) =>
  api.post('/login', { username, otp });

export const uploadImage = (file: File) => {
  const formData = new FormData();
  formData.append('file', file);
  return api.post('/crafto/v1.0/media/assignment/upload', formData, {
    headers: { 'Content-Type': 'multipart/form-data' },
  });
};

export const createQuote = (text: string, mediaUrl: string, token: string) =>
  api.post(
    '/postQuote',
    { text, mediaUrl },
    { headers: { Authorization: token } }
  );

export const getQuotes = (limit: number, offset: number, token: string) =>
  api.get(`/getQuotes?limit=${limit}&offset=${offset}`, {
    headers: { Authorization: token },
  });
