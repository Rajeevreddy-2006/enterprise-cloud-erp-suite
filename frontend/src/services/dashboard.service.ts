import api from "./api";
import type { DashboardResponse } from "@/types/dashboard.types";

class DashboardService{
    
    async getDashboard(){
        const response = await api.get<DashboardResponse>("/dashboard");
        return response.data;
    }
}

export default new DashboardService();