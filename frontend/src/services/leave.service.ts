import api from "./api";

import type {
    CreateLeaveDto,
    UpdateLeaveDto
} from "@/types/leave.types";

class LeaveService {

    async getLeaves() {
        const response =
            await api.get("/leaves");

        return response.data;
    }

    async getLeave(id: string) {
        const response =
            await api.get(`/leaves/${id}`);

        return response.data;
    }

    async createLeave(
        data: CreateLeaveDto
    ) {

        const response =
            await api.post(
                "/leaves",
                data
            );

        return response.data;
    }

    async updateLeave(
        id: string,
        data: UpdateLeaveDto
    ) {

        const response =
            await api.put(
                `/leaves/${id}`,
                data
            );

        return response.data;
    }

    async deleteLeave(
        id: string
    ) {

        const response =
            await api.delete(
                `/leaves/${id}`
            );

        return response.data;
    }

    async approveLeave(
        id: string
    ) {

        const response =
            await api.patch(
                `/leaves/${id}/approve`
            );

        return response.data;
    }

    async rejectLeave(
        id: string
    ) {

        const response =
            await api.patch(
                `/leaves/${id}/reject`
            );

        return response.data;
    }

    async getEmployeeLeaves(id: string) {
        const response =
            await api.get(
                `/leaves/employee/${id}`
            );
        return response.data;
    }

    async getLeaveBalance(id: string) {
        const response =
            await api.get(
                `/leaves/employee/${id}/balance`
            );
        return response.data;
    }

}

export default new LeaveService();