import axios from 'axios';

export const BASE_URL = 'http://apiotstest.prudencesoftech.in';

// Encode username:password in Base64
const username = 'OTS';
const password = 'OTS@15';
// const basicAuth = 'Basic ' + Buffer.from(`${username}:${password}`).toString('base64');
const basicAuth = `Basic ${btoa(`${username}:${password}`)}`;

export const HEADERS = {
  // Authorization: 'Basic T1RTOk9UU0AxNQ==',
  Authorization: basicAuth,
  'X-ApiKey': 'MyRandomApiKeyValue',
  'Content-Type': 'application/json',
};
export const HEADERSUPLOAD = {
  // Authorization: 'Basic T1RTOk9UU0AxNQ==',
  Authorization: basicAuth,
  'X-ApiKey': 'MyRandomApiKeyValue',
  'Content-Type': 'multipart/form-data',
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
    config.headers.Authorization = basicAuth;
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
    console.error('API Response Error:', error.config, errorDetails);
    return Promise.reject(error);
  },
);

// Helper function
const getAccessToken = async () => {
  // Implement your AsyncStorage logic here
  return null;
};
