import getAPI from './axiosConfig';

const api = getAPI();

const API_BASE_URL = '/candidate';

export const fetchCandidate = async (candidateId) => {
  const response = await api.get(`${API_BASE_URL}/${candidateId}`);
  return response.data;
};

export const fetchCandidates = async (params) => {
  const response = await api.get(API_BASE_URL, { params });
  return response.data;
};

export const createCandidate = async (candidate) => {
  const response = await api.post(API_BASE_URL, candidate);
  return response.data;
};

export const updateCandidate = async (candidateId, updatedCandidate) => {
  const response = await api.put(`${API_BASE_URL}/${candidateId}`, updatedCandidate);
  return response.data;
};

export const deleteCandidate = async (candidateId) => {
  const response = await api.delete(`${API_BASE_URL}/${candidateId}`);
  return response.data;
};

const candidateApi = {
  fetchCandidate,
  fetchCandidates,
  createCandidate,
  updateCandidate,
  deleteCandidate,
};

export default candidateApi;
