import axios from "axios";

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

const axiosInstance = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
  withCredentials: false,
});


const loginUser = async (credentials) => {
  const response = await axiosInstance.post("/auth/login", credentials);

  localStorage.setItem("refreshToken", response?.data?.refreshToken);
  localStorage.setItem("accessToken", response?.data?.accessToken);
  localStorage.setItem("isAuthenticated", true);

  const user = {};
  user.email = response?.data?.email;
  user.name = response?.data?.name;
  user.role = response?.data?.role;
  user.permissions = response?.data?.permissions;

  localStorage.setItem("user", JSON.stringify(user));
  return response;
};

export { loginUser };
