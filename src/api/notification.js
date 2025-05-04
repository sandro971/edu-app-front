import getAPI from './axiosConfig';

const api = getAPI();

const API_BASE_URL = '/notification';

export const fetchNotifications = async (query) => {
  const response = await api.get(API_BASE_URL, { params: query });
  return response.data;
};

export const fetchUnreadCount = async () => {
  const response = await api.get(`${API_BASE_URL}/unread-count`);
  return response.data;
};

export const createNotification = async (notificationData) => {
  const response = await api.post(API_BASE_URL, notificationData);
  return response.data;
};

export const updateNotification = async (notificationId, notificationData) => {
  const response = await api.put(`${API_BASE_URL}/${notificationId}`, notificationData);
  return response.data;
};


export const fetchNotification = async (notificationId) => {
  const response = await api.get(`${API_BASE_URL}/${notificationId}`);
  return response.data;
};

const notificationApi = {
  fetchNotifications,
  createNotification,
  updateNotification,
  fetchNotification,
  fetchUnreadCount,
};

export default notificationApi;
