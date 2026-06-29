import api from "./api";
import type { CreateSalaryStructureDto, UpdateSalaryStructureDto } from "@/types/salary.types";

class SalaryService{

    async getSalaryStructures(){
        const response = await api.get("/salary-structures");
        return response.data;
    }

    async createSalaryStructure(data:CreateSalaryStructureDto){
        const response = await api.post("/salary-structures",data);
        return response.data;
    }

    async updateSalaryStructure(id:string,data:UpdateSalaryStructureDto){
        const response = await api.put(`/salary-structures/${id}`,data);
        return response.data;
    }

    async deleteSalaryStructure(id:string){
        const response = await api.delete(`/salary-structures/${id}`);
        return response.data;
    }

}

export default new SalaryService();