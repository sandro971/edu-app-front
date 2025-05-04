import getAPI from './axiosConfig';

const api = getAPI();

const API_BASE_URL = '/landing';

// Mettre à jour un message (ex: {isReaded: true})
export const fetchLandingData = async (params) => {
  try {
    const response = await api.get(`${API_BASE_URL}`, { params: { ...params } });
    return response.data;
  } catch (error) {
    throw error;
  }
};

const landingApi = {
  fetchLandingData,
};

export default landingApi;