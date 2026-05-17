import axios from 'axios';

const isServer = typeof window === 'undefined';

/** Tarayıcıda aynı origin (/api) — canlıda nginx üzerinden backend'e gider. */
function getApiBaseUrl(): string {
  if (!isServer) {
    return '/api';
  }
  return (
    process.env.API_INTERNAL_URL ||
    process.env.NEXT_PUBLIC_API_URL ||
    'https://www.insucomsigorta.site/api'
  );
}

const API_BASE_URL = getApiBaseUrl();

const api = axios.create({
  baseURL: API_BASE_URL.endsWith('/') ? API_BASE_URL.slice(0, -1) : API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Request interceptor for JWT
api.interceptors.request.use((config) => {
  if (typeof window !== 'undefined') {
    const token = localStorage.getItem('access_token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
  }
  return config;
});

export const apiService = {
  // Public Pages
  getHomePage: () => api.get('/pages/home/'),
  getAboutPage: () => api.get('/pages/about/'),

  // Services
  getServices: () => api.get('/services/'),
  getServiceDetail: (slug: string) => api.get(`/services/${slug}/`),
  getServiceBySlug: (slug: string) => api.get(`/services/${slug}/`),

  // Blog
  getBlogs: () => api.get('/blog/'),
  getBlogDetail: (slug: string) => api.get(`/blog/${slug}/`),
  getBlogBySlug: (slug: string) => api.get(`/blog/${slug}/`),

  // Projects
  getProjects: () => api.get('/projects/'),
  getProjectDetail: (slug: string) => api.get(`/projects/${slug}/`),
  getProjectBySlug: (slug: string) => api.get(`/projects/${slug}/`),

  // FAQ
  getFAQ: () => api.get('/faq/'),

  // Contact
  getContactPage: () => api.get('/contact/'),
  sendContactMessage: (data: object) => api.post('/contact/messages/', data),

  // Auth
  login: (credentials: any) => api.post('/auth/token/', credentials),
  register: (data: any) => api.post('/auth/register/', data),
  refreshToken: (refresh: string) => api.post('/auth/token/refresh/', { refresh }),

  // Private Data (Login Required)
  getMyPolicies: () => api.get('/me/policies/'),
  createPolicy: (data: object) => api.post('/me/policies/', data),
  updatePolicy: (id: number, data: object) => api.patch(`/me/policies/${id}/`, data),
  deletePolicy: (id: number) => api.delete(`/me/policies/${id}/`),

  getMyQuotes: () => api.get('/me/quotes/'),
  createQuote: (data: object) => api.post('/me/quotes/', data),
  deleteQuote: (id: number) => api.delete(`/me/quotes/${id}/`),

  getMyClaims: () => api.get('/me/claims/'),
  createClaim: (data: object) => api.post('/me/claims/', data),
  deleteClaim: (id: number) => api.delete(`/me/claims/${id}/`),

  getMyPayments: () => api.get('/me/payments/'),
  createPayment: (data: object) => api.post('/me/payments/', data),
  updatePayment: (id: number, data: object) => api.patch(`/me/payments/${id}/`, data),
  deletePayment: (id: number) => api.delete(`/me/payments/${id}/`),

  getMyAlerts: () => api.get('/me/alerts/'),
  updateAlert: (id: number, data: object) => api.patch(`/me/alerts/${id}/`, data),
  deleteAlert: (id: number) => api.delete(`/me/alerts/${id}/`),
};

export default api;
