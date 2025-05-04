import getAPI from './axiosConfig';

const api = getAPI();

export const recruiterAPI = {
  // Obtenir le profil du recruteur
  getProfile: async () => {
    try {
      const response = await api.get('/recruiters/profile');
      return response.data;
    } catch (error) {
      throw error;
    }
  },

  // Mettre à jour le profil du recruteur
  updateProfile: async (profileData) => {
    try {
      const response = await api.put('/recruiters/profile', profileData);
      return response.data;
    } catch (error) {
      throw error;
    }
  },

  // Créer une nouvelle offre
  createOffer: async (offerData) => {
    try {
      const response = await api.post('/recruiters/offers', offerData);
      return response.data;
    } catch (error) {
      throw error;
    }
  },

  // Mettre à jour une offre
  updateOffer: async (offerId, offerData) => {
    try {
      const response = await api.put(`/recruiters/offers/${offerId}`, offerData);
      return response.data;
    } catch (error) {
      throw error;
    }
  },

  // Supprimer une offre
  deleteOffer: async (offerId) => {
    try {
      const response = await api.delete(`/recruiters/offers/${offerId}`);
      return response.data;
    } catch (error) {
      throw error;
    }
  },

  // Obtenir la liste des offres du recruteur
  getOffers: async (params) => {
    try {
      const response = await api.get('/recruiters/offers', { params });
      return response.data;
    } catch (error) {
      throw error;
    }
  },

  // Obtenir la liste des candidatures pour une offre
  getOfferApplications: async (offerId) => {
    try {
      const response = await api.get(`/recruiters/offers/${offerId}/applications`);
      return response.data;
    } catch (error) {
      throw error;
    }
  }
};
