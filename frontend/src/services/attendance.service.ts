import api from "./api";
import type { CreateAttendanceDto, UpdateAttendanceDto } from "@/types/attendance.types";

class AttendanceService{
    async getAttendance(){
        const response = await api.get("/attendance");
        return response.data;
    }

    async createAttendance(data:CreateAttendanceDto){
        const response = await api.post("/attendance",data);
        return response.data;
    }

    async updateAttendance(id:string,data:UpdateAttendanceDto){
        const response = await api.put(`/attendance/${id}`,data);
        return response.data;
    }

    async deleteAttendance(id:string){
        const response = await api.delete(`/attendance/${id}`);
        return response.data;
    }
}

export default new AttendanceService();