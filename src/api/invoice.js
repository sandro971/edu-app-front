import getAPI from './axiosConfig';

const api = getAPI();

const API_BASE_URL = '/invoice';

// Obtenir les messages (ex: {page: 1, pageSize: 10})
export const downloadInvoice = async (invoiceId) => {
  try {
    const response = await api.get(`${API_BASE_URL}/${invoiceId}.pdf`);
    return response.data;
  } catch (error) {
    throw error;
  }
};

// Créer une nouvelle connect (ex: {message: "Bonjour, je suis intéressé par votre offre de mission"})
export const getInvoiceById = async (invoiceId) => {
  try {
    const response = await api.get(`${API_BASE_URL}/${invoiceId}`);
    return response.data;
  } catch (error) {
    throw error;
  }
};

// Mettre à jour un message (ex: {isReaded: true})
export const fetchInvoices = async (params) => {
  try {
    const response = await api.get(`${API_BASE_URL}`, { params: { ...params } });
    return response.data;
  } catch (error) {
    throw error;
  }
};

const invoiceApi = {
  downloadInvoice,
  getInvoiceById,
  fetchInvoices,
};

export default invoiceApi;