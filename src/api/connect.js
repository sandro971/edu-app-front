import getAPI from './axiosConfig';

const api = getAPI();

const API_BASE_URL = '/connect';

// Obtenir les connects (ex: {page: 1, pageSize: 10})
export const fetchConnects = async (params) => {
  try {
    const response = await api.get(`${API_BASE_URL}`, { params });
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const fetchConnect = async (id) => {
  try {
    const response = await api.get(`${API_BASE_URL}/${id}`);
    return response.data;
  } catch (error) {
    throw error;
  }
};


export const createConnect = async (connect) => {
  try {
    const response = await api.post(`${API_BASE_URL}`, connect);
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const updateConnect = async (id, connect) => {
  try {
    const response = await api.put(`${API_BASE_URL}/${id}`, connect);
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const deleteConnect = async (id) => {
  try {
    const response = await api.delete(`${API_BASE_URL}/${id}`);
    return response.data;
  } catch (error) {
    throw error;
  }
};

const connectApi = {
  fetchConnects,
  fetchConnect,
  createConnect,
  updateConnect,
  deleteConnect
};

export default connectApi;