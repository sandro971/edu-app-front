import getAPI from './axiosConfig';

const api = getAPI(false);
const apiWithToken = getAPI(true);

const API_BASE_URL = '/offer';

// Obtenir toutes les offres
export const fetchOffers = async (params) => {
  try {
    const response = await api.get(API_BASE_URL, { params });
    return response.data;
  } catch (error) {
    throw error;
  }
}

// Obtenir une offre par son ID
export const fetchOffer = async (offerId) => {
  try {
    const response = await api.get(`${API_BASE_URL}/${offerId}`);
    return response.data;
  } catch (error) {
    throw error;
  }
}

// Obtenir mes candidatures
export const fetchApplications = async (params) => {
  try {
    const response = await apiWithToken.get(`${API_BASE_URL}/applications`, { params });
    return response.data;
  } catch (error) {
    throw error;
  }
}

export default {
  fetchOffers,
  fetchOffer,
  fetchApplications
};

