import api from "./api";

export const getLeads=() => api.get("/leads");

export const createLead=(data:any) => api.post("/leads",data);

export const updateLead=(id:string,data:any) => api.put(`/leads/${id}`,data);

export const deleteLead=(id:string) => api.delete(`/leads/${id}`);

