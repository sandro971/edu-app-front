import getAPI from './axiosConfig';

const api = getAPI(false);

const API_BASE_URL = '/location';

export const searchLocation = async (query) => {
  const response = await api.get(API_BASE_URL + '/search?query=' + query);
  return response.data;
};

export const createLocation = async (locationData) => {
  const response = await api.post(API_BASE_URL, locationData);
  return response.data;
};

export const updateLocation = async (locationId, locationData) => {
  const response = await api.put(API_BASE_URL + '/' + locationId, locationData);
  return response.data;
};

export const deleteLocation = async (locationId) => {
  const response = await api.delete(API_BASE_URL + '/' + locationId);
  return response.data;
};

export const getLocation = async (locationId) => {
  const response = await api.get(API_BASE_URL + '/' + locationId);
  return response.data;
};

const locationApi = {
  searchLocation,
  createLocation,
  updateLocation,
  deleteLocation,
  getLocation
};

export default locationApi;
