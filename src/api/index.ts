import axios from 'axios';

export const BASE_URL = 'http://apiotstest.prudencesoftech.in';

export const HEADERS = {
  Authorization: 'Basic T1RTOk9UU0AxNQ==',
  'X-ApiKey': 'MyRandomApiKeyValue',
  'Content-Type': 'application/json',
};

export const api = axios.create({
  baseURL: BASE_URL,
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Optional: Add interceptors for auth token
api.interceptors.request.use(
  async config => {
    config.headers.Authorization = 'Basic T1RTOk9UU0AxNQ==';
    config.headers['X-ApiKey'] = 'MyRandomApiKeyValue';

    return config;
  },
  error => Promise.reject(error),
);

api.interceptors.response.use(
  response => response,
  async error => {
    console.log('Response error:==================', error);
    const errorDetails = {
      url: error.config?.url,
      status: error.response?.status,
      data: error.response?.data,
      message: error.message,
    };
    console.error('API Response Error:', error.config);
    return Promise.reject(error);
  },
);

// Helper function
const getAccessToken = async () => {
  // Implement your AsyncStorage logic here
  return null;
};
