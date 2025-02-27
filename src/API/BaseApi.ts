import axios, { AxiosInstance, InternalAxiosRequestConfig } from "axios";

// Function to create an Axios instance
const createAxiosInstance = (
  baseURL: string,
  headers: Record<string, string>
): AxiosInstance => {
  return axios.create({
    baseURL,
    headers,
  });
};

// Function to set up interceptors
const setupInterceptors = (instance: AxiosInstance) => {
  instance.interceptors.request.use(
    async (config: InternalAxiosRequestConfig) => {
      const access = import.meta.env.VITE_FAKE_TOKEN;

      if (access) {
        config.headers["Authorization"] = `JWT ${access}`;
      }
      return config;
    },
    (error) => Promise.reject(error)
  );
};

// Base URL from environment variables
const baseURL = import.meta.env.VITE_BASE_URL;

// Common headers
const commonHeaders = {
  "Content-Type": "application/json",
  "Accept-Language": "en-US,en;q=0.9",
};

// Create Axios instances
export const plain = createAxiosInstance(baseURL, commonHeaders);
const base = createAxiosInstance(baseURL, commonHeaders);
const multiPartBase = createAxiosInstance(baseURL, {
  ...commonHeaders,
  "Content-Type": "multipart/form-data",
});

// Set up interceptors
setupInterceptors(base);
setupInterceptors(multiPartBase);

export { multiPartBase };
export default base;
