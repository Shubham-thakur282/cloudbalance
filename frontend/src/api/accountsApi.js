import axiosInstance from "./axiosInstance";

export const getAccounts = async () =>{
    const res = await axiosInstance.get("/accounts");
    return res;
}

export const addAccount  = async (data)=>{
    const res = await axiosInstance.post("/accounts",data);
    return res;
}