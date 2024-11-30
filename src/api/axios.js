import axios from 'axios';
import { toast } from 'sonner';

// Create axios instance with custom config
const api = axios.create({
  baseURL: 'http://localhost:8000/api',
  headers: {
    'Content-Type': 'application/json',
  },
  timeout: 10000, // 10 seconds
});

// Request interceptor
api.interceptors.request.use(
  (config) => {
    // Get token from localStorage
    const token = localStorage.getItem('auth_token');
    
    // If token exists, add it to request headers
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Response interceptor
api.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    const { response } = error;

    // Handle different error scenarios
    if (response) {
      // Server responded with error status
      switch (response.status) {
        case 401:
          // Unauthorized - clear local storage and redirect to login
          localStorage.removeItem('auth_token');
          localStorage.removeItem('user');
          window.location.href = '/login';
          toast.error('Session expired. Please login again.');
          break;
        
        case 403:
          toast.error('You do not have permission to perform this action');
          break;
        
        case 404:
          toast.error('Resource not found');
          break;
        
        case 422:
          // Validation errors
          if (response.data.errors) {
            const errorMessages = Object.values(response.data.errors).flat();
            errorMessages.forEach(message => toast.error(message));
          } else {
            toast.error(response.data.message || 'Validation failed');
          }
          break;
        
        case 500:
          toast.error('Internal server error. Please try again later.');
          break;
        
        default:
          toast.error(response.data.message || 'Something went wrong');
      }
    } else if (error.request) {
      // Request was made but no response received
      toast.error('No response from server. Please check your internet connection.');
    } else {
      // Error in request configuration
      toast.error('Error in making request. Please try again.');
    }

    return Promise.reject(error);
  }
);

// API endpoints
export const authAPI = {
  login: (data) => api.post('/auth/login', data),
  register: (data) => api.post('/auth/register', data),
  logout: () => api.post('/auth/logout'),
  forgotPassword: (email) => api.post('/auth/forgot-password', { email }),
  resetPassword: (data) => api.post('/auth/reset-password', data),
  verifyEmail: (token) => api.post(`/auth/verify-email/${token}`),
  resendVerification: () => api.post('/auth/email/verification-notification'),
  getUser: () => api.get('/auth/user'),
  updateProfile: (data) => api.put('/auth/profile', data),
  changePassword: (data) => api.put('/auth/password', data),
};

// Example usage of protected routes
export const userAPI = {
  getDashboard: () => api.get('/user/dashboard'),
  getSettings: () => api.get('/user/settings'),
  updateSettings: (data) => api.put('/user/settings', data),
};

export default api;