import getAPI from './axiosConfig';

const api = getAPI();

const API_BASE_URL = '/attribute';

export const addAttribute = async (attributeData) => {
  const response = await api.post(API_BASE_URL + '/', attributeData);
  return response.data;
};


export const fetchAttributes = async (candidateId) => {
  const response = await api.get(API_BASE_URL + '/candidate/' + candidateId);
  return response.data;
};

export const createAttribute = async (education) => {
  const response = await api.post(API_BASE_URL, education);
  return response.data;
};

export const updateAttribute = async (attributeId, updatedAttribute) => {
  const response = await api.put(`${API_BASE_URL}/${attributeId}`, updatedAttribute);
  return response.data;
};

export const deleteAttribute = async (attributeId) => {
  const response = await api.delete(`${API_BASE_URL}/${attributeId}`);
  return response.data;
};


export default {
  addAttribute,
  fetchAttributes,
  createAttribute,
  updateAttribute,
  deleteAttribute
};
