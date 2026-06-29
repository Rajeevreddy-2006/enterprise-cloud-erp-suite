import api from "./api";

import type { CreatePayrollDto, UpdatePayrollDto } from "@/types/payroll.types";

class PayrollService{

    async getPayrolls(){
        const response = await api.get("/payroll");
        return response.data;
    }

    async createPayroll(data:CreatePayrollDto){
        const response = await api.post("/payroll",data);
        return response.data;
    }

    async updatePayroll(id:string,data:UpdatePayrollDto){
        const response = await api.put(`/payroll/${id}`,data);
        return response.data;
    }

    async deletePayroll(id:string){
        const response = await api.delete(`/payroll/${id}`);
        return response.data;
    }

}

export default new PayrollService();