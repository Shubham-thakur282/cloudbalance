import axiosInstance from "./axiosInstance";

export const getUsers = async (size = 10, page = 0) => {
  const res = await axiosInstance.get(`/users?page=${page}&size=${size}`);
  return res;
};

export const addUser = async (data) => {
  const res = await axiosInstance.post("/users", data);
  return res;
};

export const getUser = async (id) => {
  const res = await axiosInstance.get(`/users/${id}`);
  return res;
};

export const updateUser = async (id, data) => {
  const res = await axiosInstance.patch(`/users/${id}`, data);
  return res;
};

export const logoutUser = async (data) => {
  const res = await axiosInstance.post(`/auth/logout`, data);
  return res;
};

export const removeUser = async (id) => {
  const res = await axiosInstance.delete(`/users/${id}`);
  return res;
};
