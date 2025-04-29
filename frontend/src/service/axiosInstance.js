import axios from "axios";
import store from "../redux/store";
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
    const accessToken = store.getState()?.accessToken;

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
    console.log('[Response]', response);
    return response;
  },
  (error) => {
    console.error('[Response Error]', error);
    if (error.response) {
      const { status } = error.response;

      if (status === 401) {
        console.log("redirect to login");
        console.warn('Unauthorized. Redirecting to login...');
        toast.warn("Session Expired. Redirecting to login page!");
        setTimeout(()=>{
          logout();
        },2000)
      } else if (status === 500) {
        console.warn('Server error. Please try again later.');
      }
    }

    return Promise.reject(error);
  }
);



export default axiosInstance;
