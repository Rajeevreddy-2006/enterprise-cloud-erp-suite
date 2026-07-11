import api from "./api";

export const getInteractions=() => api.get("/interactions");

export const createInteraction=(data:any) => api.post("/interactions",data);

export const updateInteraction=(id:string,data:any) => api.put(`/interactions/${id}`,data);

export const deleteInteraction=(id:string) => api.delete(`/interactions/${id}`);