import api from "./api";
import type { CreateDepartmentDto } from "@/types/department.types";

class DepartmentService{
    async getDepartments(){
        const response = await api.get("/departments");
        return response.data;
    }

    async getDepartment(id:string){
        const response = await api.get(`/departments/${id}`);
        return response.data;
    }

    async createDepartment(data:CreateDepartmentDto){
        const response = await api.post("/departments",data);
        return response.data;
    }

    async updateDepartment(id:string,data:CreateDepartmentDto){
        const response = await api.put(`/departments/${id}`,data);
        return response.data;
    }

    async deleteDepartment(id:string){
        const response = await api.delete(`/departments/${id}`);
        return response.data;
    }
}

export default new DepartmentService();