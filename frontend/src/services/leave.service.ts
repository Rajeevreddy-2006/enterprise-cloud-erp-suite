import api from "./api";
import type { CreateLeaveDto, UpdateLeaveDto } from "@/types/leave.types";

class LeaveService{

    async getLeaves(){
        const response = await api.get("/leave");
        return response.data;
    }

    async createLeave(data:CreateLeaveDto){
        const response = await api.post("/leave",data);
        return response.data;
    }

    async updateLeave(id:string,data:UpdateLeaveDto){
        const response = await api.put(`/leave/${id}`,data);
        return response.data;
    }

    async deleteLeave(id:string){
        const response = await api.delete(`/leave/${id}`);
        return response.data;
    }

}

export default new LeaveService();