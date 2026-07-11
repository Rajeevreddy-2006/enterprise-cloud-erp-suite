import api from "./api";

export const getOpportunities=() => api.get("/opportunities");

export const createOpportunity=(data:any) => api.post("/opportunities",data);

export const updateOpportunity=(id:string,data:any) => api.put(`/opportunities/${id}`,data);

export const deleteOpportunity=(id:string) => api.delete(`/opportunities/${id}`);