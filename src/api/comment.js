import getAPI from './axiosConfig';

const api = getAPI();
const API_BASE_URL = '/comment';

export const fetchCandidateComments = async (candidateId, params) => {
  try {
    const response = await api.get(`${API_BASE_URL}/candidate/${candidateId}`, { params });
    return response.data;
  } catch (error) {
    throw error;
  }
}

export const getComment = async (commentId) => {
  try {
    const response = await api.get(`${API_BASE_URL}/${commentId}`);
    return response.data;
  } catch (error) {
    throw error;
  }
}

export const createComment = async (commentData) => {
  try {
    const response = await api.post(`${API_BASE_URL}/`, commentData);
    return response.data;
  } catch (error) {
    throw error;
  }
}

export const deleteComment = async (commentId) => {
  try {
    const response = await api.delete(`${API_BASE_URL}/${commentId}`);
    return response.data;
  } catch (error) {
    throw error;
  }
}


export default {
  fetchCandidateComments,
  getComment,
  createComment,
  deleteComment
};
