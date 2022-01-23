import axios, { AxiosRequestConfig } from "axios";

export const CMCApiClient = axios.create({
  baseURL: process.env.REACT_APP_CMC_BASE_URL,
});

CMCApiClient.interceptors.request.use(
  (config: AxiosRequestConfig) => {
    if (config.headers === undefined) {
      config.headers = {};
    }
    config.headers["X-CMC_PRO_API_KEY"] =
      process.env.REACT_APP_CMC_API_KEY || "";
    config.headers["Accept"] = "application/json";
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);
