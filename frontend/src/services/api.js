// API service para conectar con el backend

import axios from 'axios';

// URL base del backend - usar variable de entorno o fallback
// NOTA: Si REACT_APP_API_URL incluye /api, no lo agregues de nuevo
// Si solo incluye el dominio, entonces agregamos /api
const BASE_URL = process.env.REACT_APP_API_URL || 'https://nebula2-0.onrender.com';
// Asegurarnos de que no tenga /api duplicado
const API_URL = BASE_URL.endsWith('/api') ? BASE_URL.replace(/\/api$/, '') : BASE_URL;

// Crear instancia de axios con configuración base
const api = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
  timeout: 10000, // 10 segundos de timeout
});

// Interceptor para manejar errores
api.interceptors.response.use(
  (response) => response,
  (error) => {
    console.error('Error en la petición API:', error);
    if (error.response) {
      // El servidor respondió con un código de estado fuera del rango 2xx
      console.error('Error del servidor:', error.response.data);
    } else if (error.request) {
      // La petición fue hecha pero no se recibió respuesta
      console.error('No se recibió respuesta del servidor');
    } else {
      // Algo pasó al configurar la petición
      console.error('Error al configurar la petición:', error.message);
    }
    return Promise.reject(error);
  }
);

// Servicios de productos
export const productService = {
  // Obtener todos los productos
  getAllProducts: async () => {
    try {
      const url = '/api/products';
      console.log('🌐 Haciendo petición a:', `${API_URL}${url}`);
      const response = await api.get(url);
      console.log('📦 Respuesta completa:', response);
      console.log('📦 Datos recibidos:', response.data);
      return response.data;
    } catch (error) {
      console.error('❌ Error al obtener productos:', error);
      if (error.response) {
        console.error('❌ Status:', error.response.status);
        console.error('❌ Data:', error.response.data);
      }
      if (error.request) {
        console.error('❌ No se recibió respuesta. Verifica la URL:', error.config?.url);
      }
      throw error;
    }
  },

  // Obtener productos destacados
  getFeaturedProducts: async () => {
    try {
      const response = await api.get('/api/products/featured');
      return response.data;
    } catch (error) {
      console.error('Error al obtener productos destacados:', error);
      throw error;
    }
  },

  // Obtener un producto por ID
  getProductById: async (id) => {
    try {
      const response = await api.get(`/api/products/${id}`);
      return response.data;
    } catch (error) {
      console.error('Error al obtener producto:', error);
      throw error;
    }
  },

  // Obtener un producto por slug
  getProductBySlug: async (slug) => {
    try {
      const response = await api.get(`/api/products/slug/${slug}`);
      return response.data;
    } catch (error) {
      console.error('Error al obtener producto por slug:', error);
      throw error;
    }
  },
};

export default api;

