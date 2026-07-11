import api from "./api";
import type { CreatePayrollDto, UpdatePayrollDto } from "@/types/payroll.types";

class PayrollService {

    async getPayrolls() {

        const response =
            await api.get("/payrolls");

        return response.data;
    }

    async employeePayrolls(
        employeeId: string
    ) {

        const response =
            await api.get(
                `/payrolls/employee/${employeeId}`
            );

        return response.data;
    }

    async getPayroll(
        id: string
    ) {

        const response =
            await api.get(
                `/payrolls/${id}`
            );

        return response.data;
    }

    async createPayroll(
        data: any
    ) {

        const response =
            await api.post(
                "/payrolls",
                data
            );

        return response.data;
    }

    async markAsPaid(
        id: string
    ) {

        const response =
            await api.patch(
                `/payrolls/${id}/pay`
            );

        return response.data;
    }

    // async downloadPayslip(id: string) {
    //     window.open(
    //         `${import.meta.env.VITE_API_URL}/payrolls/${id}/payslip/download`,
    //         "_blank"
    //     );
    // }
    async downloadPayslip(

id:string

){

const response=

await api.get(

`/payrolls/${id}/payslip/download`,

{

responseType:"blob"

}

);

const url=

window.URL.createObjectURL(

new Blob([response.data])

);

const link=

document.createElement(

"a"

);

link.href=url;

link.download=

`payslip-${id}.pdf`;

document.body.appendChild(

link

);

link.click();

link.remove();

window.URL.revokeObjectURL(

url

);

}

    async getPayrollSummary(
        employeeId: string,
        month: number,
        year: number
    ) {
        const response =
            await api.get(
                "/payrolls/summary",
                {
                    params: {
                        employeeId,
                        month,
                        year
                    }
                }
            );
        return response.data;
    }

    async deletePayroll(id:string){
        const response = await api.delete(`/payrolls/${id}`);
        return response.data;
    }

    async getEmployeePayrolls(id: string) {
        const response = await api.get(`/payrolls/employee/${id}`);
        return response.data;
    }

    async updatePayroll(id:string,data:UpdatePayrollDto){
        const response = await api.put(`/payrolls/${id}`,data);
        return response.data;
    }

}

export default new PayrollService();