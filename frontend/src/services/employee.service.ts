import api from "./api";
import type { CreateEmployeeDto, UpdateEmployeeDto } from "@/types/employee.types";

class EmployeeService{
    async getEmployees(){
        const response = await api.get("/employees");
        return response.data;
    }

    async getEmployee(id:string){
        const response = await api.get(`/employees/${id}`);
        return response.data;
    }

    async createEmployee(data:CreateEmployeeDto){
        const response = await api.post("/employees",data);
        return response.data;
    }

    async updateEmployee(id:string,data:UpdateEmployeeDto){
        const response = await api.put(`/employees/${id}`,data);
        return response.data;
    }

    async deleteEmployee(id:string){
        const response = await api.delete(`/employees/${id}`);
        return response.data;
    }
}

export default new EmployeeService();