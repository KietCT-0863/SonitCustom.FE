import api from '../config/api.config';

const BlogService = {
  // Get all blog posts with optional filters
  getPosts: async (params = {}) => {
    try {
      const response = await api.get('/blog/posts', { params });
      return response.data;
    } catch (error) {
      throw error;
    }
  },

  // Get post by ID
  getPostById: async (id) => {
    try {
      const response = await api.get(`/blog/posts/${id}`);
      return response.data;
    } catch (error) {
      throw error;
    }
  },

  // Get posts by category
  getPostsByCategory: async (category, params = {}) => {
    try {
      const response = await api.get(`/blog/category/${category}`, { params });
      return response.data;
    } catch (error) {
      throw error;
    }
  },

  // Search posts
  searchPosts: async (query, params = {}) => {
    try {
      const response = await api.get('/blog/search', {
        params: { ...params, q: query }
      });
      return response.data;
    } catch (error) {
      throw error;
    }
  },

  // Get related posts
  getRelatedPosts: async (postId, limit = 3) => {
    try {
      const response = await api.get(`/blog/posts/${postId}/related`, {
        params: { limit }
      });
      return response.data;
    } catch (error) {
      throw error;
    }
  }
};

export default BlogService; 