import axios from 'axios';

const api = axios.create({
  baseURL: 'http://localhost:8080/'
});

api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('access_token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

api.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;

  
    if (error.response.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;

      try {
        const response = await api.post('/auth/login');
        const { access_token } = response.data;

        localStorage.setItem('access_token', access_token);

  
        originalRequest.headers.Authorization = `Bearer ${access_token}`;
        return axios(originalRequest);
      } catch {
        // Handle refresh token error or redirect to login
        // For example, you might want to redirect to the login page
        window.location.href = '/login';
      }
    }

    return Promise.reject(error);
  }
);

export default api;