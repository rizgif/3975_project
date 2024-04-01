// src/services/api.ts

import axios from 'axios';

const API_URL = 'http://localhost:8000/api'; // Replace with your Laravel API URL

const api = axios.create({
  baseURL: API_URL,
});

export default api;
