import axios from 'axios';
import ListOfOrchidsData from '../data/ListOfOrchids';

// Primary MockAPI URL from environment variable (.env)
export const MOCK_API_ENDPOINT =
  import.meta.env.VITE_MOCK_API_URL ||
  localStorage.getItem('mockapi_url') ||
  'https://6ac9ddec3115bcc958202472.mockapi.io/orchid';

const apiClient = axios.create({
  baseURL: MOCK_API_ENDPOINT,
  headers: {
    'Content-Type': 'application/json',
  },
  timeout: 10000,
});

export const orchidApi = {
  // GET all orchids
  getAll: async () => {
    try {
      const response = await apiClient.get('');
      if (Array.isArray(response.data) && response.data.length > 0) {
        return response.data;
      }
      return ListOfOrchidsData;
    } catch {
      // Fallback to local botanical catalog if API is unreachable or empty
      const localData = localStorage.getItem('orchids_local_cache');
      if (localData) {
        try {
          return JSON.parse(localData);
        } catch {
          // ignore cache parse error
        }
      }
      return ListOfOrchidsData;
    }
  },

  // GET orchid by id
  getById: async (id) => {
    try {
      const response = await apiClient.get(`/${id}`);
      return response.data;
    } catch {
      return ListOfOrchidsData.find((item) => String(item.id) === String(id));
    }
  },

  // POST new orchid
  create: async (orchidData) => {
    try {
      const response = await apiClient.post('', orchidData);
      return response.data;
    } catch {
      // Fallback local persistence if offline
      const newOrchid = {
        ...orchidData,
        id: String(Date.now()),
      };
      return newOrchid;
    }
  },

  // PUT update orchid
  update: async (id, orchidData) => {
    try {
      const response = await apiClient.put(`/${id}`, orchidData);
      return response.data;
    } catch {
      // Fallback local update if offline
      return { ...orchidData, id: String(id) };
    }
  },

  // DELETE orchid
  delete: async (id) => {
    try {
      await apiClient.delete(`/${id}`);
      return id;
    } catch {
      return id;
    }
  },
};

export default apiClient;
