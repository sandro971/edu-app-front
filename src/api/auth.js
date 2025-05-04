import getAPI from './axiosConfig';

const api = getAPI(false);
const apiWithToken = getAPI(true);
const apiWithTokenFormData = getAPI(true, true);

const API_BASE_URL = '/auth';

// Connexion formateur
export const login = async (credentials) => {
  try {
    const response = await api.post(API_BASE_URL + '/login', credentials);
    if (response.data.tokens) {
      localStorage.setItem('tokens', JSON.stringify(response.data.tokens));
    }
    return response.data;
  } catch (error) {
    throw error;
  }
}

// Inscription formateur
export const registerCandidate = async (userData) => {
  try {
    const response = await api.post(API_BASE_URL + '/register/candidate', userData);
    return response.data;
  } catch (error) {
    throw error;
  }
}

// Inscription recruteur
export const registerCompagny = async (userData) => {
  try {
    const response = await api.post(API_BASE_URL + '/register/compagny', userData);
    return response.data;
  } catch (error) {
    throw error;
  }
}


// Déconnexion
export const logout = () => {
  localStorage.removeItem('tokens');
}

export const getTokens = () => {
  return JSON.parse(localStorage.getItem('tokens'));
}

// Vérifier si l'utilisateur est connecté
export const isAuthenticated = () => {
  const tokens = getTokens();
  return !!tokens && new Date() < new Date(tokens.expires_in);
}

export const fetchCurrentUser = async () => {
  const response = await apiWithToken.get(API_BASE_URL + '/me');
  return response.data;
};

export const updateAvailability = async (isAvailable) => {
  const response = await apiWithToken.patch(API_BASE_URL + '/availability', { isAvailable });
  return response.data;
};

export const uploadAvatar = async (file) => {
  const formData = new FormData();
  formData.append('avatar', file);
  const response = await apiWithTokenFormData.post(API_BASE_URL + '/avatar', formData);
  return response.data;
};

export const disableAccount = async (message) => {
  const response = await apiWithToken.post(API_BASE_URL + '/disable', {message});
  if(response.status === 200) {
    await logout();
  }
  return response.data;
};

export const updateUser = async (userData) => {
  const response = await apiWithToken.patch(API_BASE_URL + '/me', userData);
  return response.data;
};

export const updateAsCandidate = async (candidateData) => {
  const response = await apiWithToken.patch(API_BASE_URL + '/me/candidate', candidateData);
  return response.data;
};

export const updateAsCompagny = async (compagnyData) => {
  const response = await apiWithToken.patch(API_BASE_URL + '/me/compagny', compagnyData);
  return response.data;
};

const authApi = {
  login,
  registerCandidate,
  registerCompagny,
  logout,
  getTokens,
  isAuthenticated,
  fetchCurrentUser,
  updateAvailability,
  uploadAvatar,
  disableAccount,
  updateUser,
  updateAsCandidate,
  updateAsCompagny
};

export default authApi;
