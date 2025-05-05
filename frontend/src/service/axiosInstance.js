import axios from "axios";
import { toast } from "react-toastify";

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

const clearStorage = () => {
  localStorage.clear();
  sessionStorage.clear();
}

const redirectLogin = () => {
  window.location.reload();
}

const logout = () => {
  clearStorage();
  redirectLogin();
}

const axiosInstance = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
  withCredentials: false,
});

axiosInstance.interceptors.request.use(
  (config) => {
    const accessToken = localStorage.getItem("accessToken");

    if (accessToken) {
      config.headers["Authorization"] = `Bearer ${accessToken}`;
    }
    return config;
  },
  (err) => {
    return Promise.reject(err);
  }
);

axiosInstance.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    if (error.response) {
      const { status } = error.response;

      if (status === 401) {
        toast.warn("Session Expired. Redirecting to login page!");
        setTimeout(()=>{
          logout();
        },3000)
      } else if (status === 500) {
        console.warn('Server error. Please try again later.');
      }
    }

    return Promise.reject(error);
  }
);

export default axiosInstance;
