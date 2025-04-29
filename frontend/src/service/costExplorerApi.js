import axiosInstance from "./axiosInstance";

export const getGroupByColumns = async ()=>{
    const res = await axiosInstance.get("/cost-explorer");
    return res;
}

export const getData = async (payload)=>{
    const res = await axiosInstance.post("/cost-explorer",payload);
    return res;
}

export const getFilters = async (displayName) =>{
    const res = await axiosInstance.get(`/cost-explorer/${displayName}`);
    return res;
}