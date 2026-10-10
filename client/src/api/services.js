import api from './client';

export const authApi = {
  register: (payload) => api.post('/auth/register', payload).then((r) => r.data),
  login: (payload) => api.post('/auth/login', payload).then((r) => r.data),
  me: () => api.get('/auth/me').then((r) => r.data),
};

export const templatesApi = {
  list: (params, signal) => api.get('/templates', { params, signal }).then((r) => r.data),
  categories: () => api.get('/templates/categories').then((r) => r.data),
  get: (id, signal) => api.get(`/templates/${id}`, { signal }).then((r) => r.data),
};

export const favoritesApi = {
  list: () => api.get('/favorites').then((r) => r.data),
  add: (templateId) => api.post(`/favorites/${templateId}`).then((r) => r.data),
  remove: (templateId) => api.delete(`/favorites/${templateId}`).then((r) => r.data),
};
