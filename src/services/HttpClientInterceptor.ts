import axios, { AxiosRequestConfig } from "axios";

export const defaultApiClient = axios.create({
  baseURL: process.env.REACT_APP_DEFAULT_URL,
});

defaultApiClient.interceptors.request.use(
  (config: AxiosRequestConfig) => {
    if (config.headers === undefined) {
      config.headers = {};
    }
    const token = localStorage.getItem("token");
    if (token) config.headers["Authorization"] = token;
    config.headers["Accept"] = "application/json";

    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);
