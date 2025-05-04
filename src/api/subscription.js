import getAPI from './axiosConfig';

const api = getAPI();

const API_URL = '/subscription';

export const fetchPackages = async () => {
  try {
    const response = await api.get(`${API_URL}/packages`);
    return response.data;
  } catch (error) {
    throw error;
  }
}

// Obtenir l'abonnement actuel de l'utilisateur
export const fetchSubscriptions = async () => {
  try {
    const response = await api.get(`${API_URL}`);
    return response.data;
  } catch (error) {
    throw error;
  }
}

// Souscrire à un package
export const subscribe = async (data) => {
  try {
    const response = await api.post(`${API_URL}`, data);
    return response.data;
  } catch (error) {
    throw error;
  }
}

// Annuler un abonnement
export const updateSubscription = async (subscriptionId, data) => {
  try {
    const response = await api.put(`${API_URL}/${subscriptionId}`, data);
    return response.data;
  } catch (error) {
    throw error;
  }
}

// Obtenir l'historique des abonnements
export const getSubscriptionHistory = async () => {
  try {
    const response = await api.get(`${API_URL}/history`);
    return response.data;
  } catch (error) {
    throw error;
  }
}

// Créer une session de paiement
export const createPaymentIntent = async (priceId) => {
  try {
    const response = await api.get(`${API_URL}/intent/${priceId}`);
    return response.data;
  } catch (error) {
    throw error;
  }
}

const subscriptionApi = {
  fetchPackages,
  fetchSubscriptions,
  subscribe,
  updateSubscription,
  getSubscriptionHistory,
  createPaymentIntent
};

export default subscriptionApi;