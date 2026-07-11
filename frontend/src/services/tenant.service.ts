import api from "./api";

export const getTenants = () => api.get("/tenants");

export const createTenant = (data:any) => api.post("/tenants", data);

export const updateTenant = (id:string,data:any) => api.put(`/tenants/${id}`,data);

export const deleteTenant = (id:string) => api.delete(`/tenants/${id}`);