import api from "./api";
import type { CreateAttendanceDto, UpdateAttendanceDto, AttendanceSummary } from "@/types/attendance.types";

class AttendanceService {
    async getAttendance() {
        const response = await api.get("/attendances");
        return response.data;
    }

    async createAttendance(data: CreateAttendanceDto) {
        const response = await api.post("/attendances",data);
        return response.data;
    }

    async updateAttendance(id: string,data: UpdateAttendanceDto) {
        const response = await api.put(`/attendances/${id}`,data);
        return response.data;
    }

    async deleteAttendance(id: string) {
        const response = await api.delete(`/attendances/${id}`);
        return response.data;
    }

    async getSummary(month: number,year: number) {
        const response = await api.get(`/attendances/summary?month=${month}&year=${year}`);
        return response.data;
    }

    async employeeAttendance(id: string) {
        const response = await api.get(`/attendances/employee/${id}`);
        return response.data;
    }

    async employeeAttendanceSummary(id: string) {
        const response = await api.get(`/attendances/employee/${id}/summary`);
        return response.data;
    }
}

export default new AttendanceService();