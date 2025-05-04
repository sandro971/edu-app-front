import getAPI from './axiosConfig';

const api = getAPI();

// Obtenir tous les packages
export const fetchPackages = async () => {
  try {
    const response = await api.get('/package');
    return response.data;
  } catch (error) {
    throw error;
  }
}


// Obtenir les abonnés d'un package
export const fetchPackageSubscribers = async (packageId) => {
  try {
    const response = await api.get(`/package/${packageId}/subscribers`);
    return response.data;
  } catch (error) {
    throw error;
  }
}

const packageAPI = {
  fetchPackages,
  fetchPackageSubscribers
};

export default packageAPI;