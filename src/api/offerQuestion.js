import getAPI from './axiosConfig';

const api = getAPI();

export const offerQuestionAPI = {
  // Obtenir toutes les questions d'une offre
  getOfferQuestions: async (offerId) => {
    try {
      const response = await api.get(`/offers/${offerId}/questions`);
      return response.data;
    } catch (error) {
      throw error;
    }
  },

  // Ajouter une question à une offre
  addQuestion: async (offerId, questionData) => {
    try {
      const response = await api.post(`/offers/${offerId}/questions`, questionData);
      return response.data;
    } catch (error) {
      throw error;
    }
  },

  // Mettre à jour une question
  updateQuestion: async (offerId, questionId, questionData) => {
    try {
      const response = await api.put(`/offers/${offerId}/questions/${questionId}`, questionData);
      return response.data;
    } catch (error) {
      throw error;
    }
  },

  // Supprimer une question
  deleteQuestion: async (offerId, questionId) => {
    try {
      const response = await api.delete(`/offers/${offerId}/questions/${questionId}`);
      return response.data;
    } catch (error) {
      throw error;
    }
  },

  // Soumettre une réponse à une question
  submitResponse: async (offerId, questionId, responseData) => {
    try {
      const response = await api.post(`/offers/${offerId}/questions/${questionId}/responses`, responseData);
      return response.data;
    } catch (error) {
      throw error;
    }
  },

  // Obtenir les réponses d'un formateur pour une offre
  getCandidateResponses: async (offerId, candidateId) => {
    try {
      const response = await api.get(`/offers/${offerId}/candidates/${candidateId}/responses`);
      return response.data;
    } catch (error) {
      throw error;
    }
  }
}; 