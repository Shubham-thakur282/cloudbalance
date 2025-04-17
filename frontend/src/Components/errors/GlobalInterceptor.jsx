import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import axiosInstance from "../../api/axiosInstance";
import { logout } from "../../redux/action";

const GlobalInterceptor = () =>{
    const navigate = useNavigate();
    const dispatch = useDispatch();

    useEffect(()=>{
        const resInterceptor = axiosInstance.interceptors.response.use((res)=>res,
        (err)=>{
            if(err?.response?.status === 401){
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