import api from "./api";

export const getReports = () => api.get("/reports");

export const exportPdf = () => api.get("/reports/pdf",{ responseType:"blob" });

export const exportExcel = () => api.get("/reports/excel",{ responseType:"blob" });