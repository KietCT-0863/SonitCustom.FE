import api from '../config/api.config';
import axios from 'axios';

// Create a separate axios instance for external API
const externalApi = axios.create({
  baseURL: 'https://sonitcustom-be.onrender.com/api',
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
    'Accept': 'application/json'
  }
});

// Response interceptor for external API
externalApi.interceptors.response.use(
  (response) => {
    return response.data;
  },
  (error) => {
    if (error.code === 'ERR_NETWORK') {
      console.error('Network error connecting to API:', error.message);
      return Promise.reject({ message: 'Cannot connect to the server. Please try again later.' });
    }
    
    if (error.response) {
      return Promise.reject(error.response.data);
    }
    
    return Promise.reject(error);
  }
);

const ProductService = {
  // Get all products with optional filters
  getProducts: async () => {
    try {
      const response = await externalApi.get('/Product');
      return response;
    } catch (error) {
      throw error;
    }
  },

  // Get product by ID
  getProductById: async (id) => {
    try {
      const response = await externalApi.get(`/Product/${id}`);
      return response;
    } catch (error) {
      throw error;
    }
  },

  // Create a new product
  createProduct: async (productData) => {
    try {
      const response = await externalApi.post('/Product', productData);
      return response;
    } catch (error) {
      throw error;
    }
  },

  // Update an existing product
  updateProduct: async (productId, productData) => {
    try {
      const response = await externalApi.put(`/Product/${productId}`, productData);
      return response;
    } catch (error) {
      throw error;
    }
  },

  // Delete a product
  deleteProduct: async (productId) => {
    try {
      const response = await externalApi.delete(`/Product/${productId}`);
      return response;
    } catch (error) {
      throw error;
    }
  },

  // Get all categories
  getCategories: async () => {
    try {
      const response = await externalApi.get('/Category');
      return response;
    } catch (error) {
      throw error;
    }
  },

  // Get products by category
  getProductsByCategory: async (category) => {
    try {
      const response = await externalApi.get(`/Product/category/${category}`);
      return response;
    } catch (error) {
      throw error;
    }
  },

  // Search products
  searchProducts: async (query, params = {}) => {
    try {
      const response = await api.get('/products/search', {
        params: { ...params, q: query }
      });
      return response.data;
    } catch (error) {
      throw error;
    }
  },

  // Get related products
  getRelatedProducts: async (productId, limit = 4) => {
    try {
      const response = await api.get(`/products/${productId}/related`, {
        params: { limit }
      });
      return response.data;
    } catch (error) {
      throw error;
    }
  }
};

export default ProductService; 