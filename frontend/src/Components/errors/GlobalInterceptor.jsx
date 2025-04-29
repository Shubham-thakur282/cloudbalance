import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import axiosInstance from "../../service/axiosInstance";
import { logout } from "../../redux/action";
import { toast } from "react-toastify";

const GlobalInterceptor = () =>{
    const navigate = useNavigate();
    const dispatch = useDispatch();

    useEffect(()=>{
        const resInterceptor = axiosInstance.interceptors.response.use((res)=>res,
        (err)=>{
            if(err?.response?.status === 401){
                toast.error("Session expired");
                dispatch(logout());
                navigate("/login");
            }
            return Promise.reject(err);
        })
        return () =>{
            axiosInstance.interceptors.response.eject(resInterceptor);
        };

    },[])

    return null;
}

export default GlobalInterceptor;

/*

AxiosInstance.interceptors.response.use(
  (config) => config,
  // eslint-disable-next-line complexity
  async (error) => {
    const { config: originalRequest, response: { status, data: { message } = {} } = {} } = error;
    // TODO : this if condition will change in future
    // If unauthorized and not a refresh token request
    if (status === 401 && !originalRequest._retry) {
      if (isRefreshing) {
        return new Promise((resolve) => {
          addRefreshSubscriber(() => {
            resolve(AxiosInstance(originalRequest));
          });
        });
      }
      isRefreshing = true;
      originalRequest._retry = true;

      try {
        // Request new access token
        const data = await getTokenByRefreshToken();

        // Store new access token and refresh token in userData
        updateTokensInLocalStorage(data?.data);
        // TODO code required
        if (data?.data?.forceRefresh === true) {
          showRefreshPopup();
        }

        // Notify subscribers with new token
        onTokenRefreshed();

        // Retry original request with new token
        return AxiosInstance(originalRequest);
      } catch (refreshError) {
        console.error("Refresh token failed:", refreshError);
        // Handle logout (clear storage, redirect, etc.)
        handle401Errors(message);
        return Promise.reject(refreshError);
      } finally {
        isRefreshing = false;
      }
    }
);

const handle401Errors = (message) => {
  if (
    window.location.pathname !== Routes.LOGIN &&
    window.location.pathname !== Routes.FORGOTPASSWORD &&
    window.location.pathname !== Routes.CONFIRMUSER &&
    window.location.pathname !== Routes.RESENDEMAIL
  ) {
    if (showToast) {
      getToast("error", "Your session has expired, please re-login");
    }
    showToast = false;
    logout();
  } else if (window.location.pathname !== "/") {
    getToast("error", message);
  }
};

*/