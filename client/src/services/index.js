import axios from "axios";

// For running uni test in local
const axiosInstance = axios.create({
  baseURL: process.env.REACT_APP_API_URL || "http://localhost:1234",
});

axiosInstance.interceptors.request.use(
  function (config) {
    const token = JSON.parse(localStorage.getItem("token"));

    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }

    return config;
  },
  function (error) {
    return Promise.reject(error);
  }
);

class HTTPMethod {
  get = (...props) => axiosInstance.get(...props);

  post = (...props) => axiosInstance.post(...props);

  put = (...props) => axiosInstance.put(...props);

  delete = (...props) => axiosInstance.delete(...props);
}

export default new HTTPMethod();
