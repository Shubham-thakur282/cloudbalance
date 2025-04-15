export const LOGIN = "LOGIN";
export const LOGOUT = "LOGOUT";
export const REFRESH_TOKEN = "REFRESH_TOKEN";

export const login = (data) => ({
  type: LOGIN,
  payload: data,
});

export const logout = () => ({
  type: LOGOUT,
});

export const refreshToken = (data) => ({
  type: REFRESH_TOKEN,
  payload: data,
});
