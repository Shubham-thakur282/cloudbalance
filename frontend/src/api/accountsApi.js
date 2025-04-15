import axiosInstance from "./axiosInstance";

export const getAccounts = async () =>{
    const res = await axiosInstance.get("/accounts");
    return res;
}