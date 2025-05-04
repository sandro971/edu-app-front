import axios from 'axios';
import { getTokens } from './auth';

const getAPI = (required_token=true, isFormData=false) => {
  const instance = axios.create({
    baseURL: 'http://localhost:3032/',
    timeout: 5000,
    headers: {
      'Content-Type': isFormData ? 'multipart/form-data' : 'application/json'
    }
  });

  // Intercepteur pour ajouter le token Authorization
  instance.interceptors.request.use((config) => {
    let tokens = getTokens();
    if(tokens && required_token){
      config.headers['Authorization'] = `Bearer ${tokens.access_token}`;
    }

    return config;
  });

  return instance;
};

export default getAPI;
