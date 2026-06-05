import API from './axios';

export const getServices = () => API.get('/services');
export const getFeaturedServices = () => API.get('/services/featured');
export const getServiceById = (id) => API.get(`/services/${id}`);
export const getAllServicesAdmin = () => API.get('/services/all');
export const createService = (data) => API.post('/services', data);
export const updateService = (id, data) => API.put(`/services/${id}`, data);
export const deleteService = (id) => API.delete(`/services/${id}`);
