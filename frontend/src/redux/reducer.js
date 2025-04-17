import { LOGIN, LOGOUT, REFRESH_TOKEN } from "./action";

const user = JSON.parse(localStorage.getItem("user")) || {};

const initialState = {
  accessToken: localStorage.getItem("accessToken") || null,
  refreshToken: localStorage.getItem("refreshToken") || null,
  isAuthenticated: localStorage.getItem("isAuthenticated") === "true",
  email: user?.email || "",
  name: user?.name || "",
  role: user?.role || "",
  permissions: user?.permissions || [],
};

export const authReducer = (state = initialState, action) => {
  switch (action.type) {
    case LOGIN:
      console.log("Im in login reducer");
      return {
        ...state,
        accessToken: action.payload.accessToken,
        refreshToken: action.payload.refreshToken,
        isAuthenticated: true,
        email: action.payload.email,
        name: action.payload.name,
        role: action.payload.role,
        permissions: action.payload.permissions,
      };
    case LOGOUT: {
        localStorage.removeItem("accessToken");
        localStorage.removeItem("refreshToken");
        localStorage.removeItem("isAuthenticated");
        localStorage.removeItem("user");

      return {
        accessToken: null,
        refreshToken: null,
        isAuthenticated: false,
        email: "",
        name: "",
        role: "",
        permissions: [],
      };
    }
    case REFRESH_TOKEN: {
      return {
        ...state,
        accessToken: action.payload.accessToken,
      };
    }
    default: {
      return state;
    }
  }
};
