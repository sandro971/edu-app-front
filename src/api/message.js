import getAPI from './axiosConfig';

const api = getAPI();

const API_BASE_URL = '/message';

// Obtenir les messages (ex: {page: 1, pageSize: 10})
export const fetchMessages = async (connectId, params) => {
  try {
    const response = await api.get(`${API_BASE_URL}/connect/${connectId}`, { params });
    return response.data;
  } catch (error) {
    throw error;
  }
};

// Créer une nouvelle connect (ex: {message: "Bonjour, je suis intéressé par votre offre de mission"})
export const createMessage = async (connectId, message) => {
  try {
    const response = await api.post(`${API_BASE_URL}/connect/${connectId}`, message);
    return response.data;
  } catch (error) {
    throw error;
  }
};

// Mettre à jour un message (ex: {isReaded: true})
export const updateMessage = async (messageId, messageData) => {
  try {
    const response = await api.put(`${API_BASE_URL}/${messageId}`, messageData);
    return response.data;
  } catch (error) {
    throw error;
  }
};

const messageApi = {
  fetchMessages,
  createMessage,
  updateMessage,
};

export default messageApi;