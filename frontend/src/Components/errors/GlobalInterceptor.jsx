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