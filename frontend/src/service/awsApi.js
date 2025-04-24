import axiosInstance from "./axiosInstance";

export const awsData = async (service,accountId) =>{
    const res = axiosInstance.get(`/aws/${service}/${accountId}`)
    return res;
}