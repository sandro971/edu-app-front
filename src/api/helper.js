import getAPI from './axiosConfig';

const api = getAPI(false);

// Obtenir tous les helpers
export const fetchHelpers = async (params) => {
  try {
    const response = await api.get('/helper', { params });
    return response.data;
  } catch (error) {
    throw error;
  }
}



const helperAPI = {
  fetchHelpers,
};

export default helperAPI;