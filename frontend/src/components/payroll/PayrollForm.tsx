import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { payrollSchema,type PayrollFormData } from "@/schemas/payroll.schema";
import { PayrollStatus } from "@/types/payroll.types";
import { useEmployees } from "@/hooks/employee_hooks/useEmployees";
import type { Employee } from "@/types/employee.types";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

interface Props{
    onSubmit:(data:PayrollFormData)=>void;
    loading?:boolean;
    defaultValues?:PayrollFormData;
}

function PayrollForm({ onSubmit,loading,defaultValues }:Props){
    const { register,handleSubmit,setValue } = useForm<PayrollFormData>({ resolver: zodResolver(payrollSchema),defaultValues });
    const { data } = useEmployees();
    const employees:Employee[] = data?.data || [];
    return(
        <form onSubmit={ handleSubmit(onSubmit) } className="space-y-4">
        <Select onValueChange={ (value:string) => setValue("employeeId",value) }>
            <SelectTrigger>
                <SelectValue placeholder="Employee"/>
            </SelectTrigger>
            <SelectContent>
            {
                employees.map((employee)=>(
                    <SelectItem key={employee.id} value={employee.id}> {employee.firstName}{" "}{employee.lastName} </SelectItem>
                ))
            }
            </SelectContent>
        </Select>
        <Input type="number" placeholder="Month" { ...register("month", { valueAsNumber:true }) }/>
        <Input type="number" placeholder="Year" { ...register("year", { valueAsNumber:true }) }/>
        <Input type="number" placeholder="Gross Salary" { ...register("grossSalary", { valueAsNumber:true }) }/>
        <Input type="number" placeholder="Deductions" { ...register("deductions", { valueAsNumber:true }) }/>
        <Input type="number" placeholder="Net Salary" { ...register("netSalary", { valueAsNumber:true }) }/>
        <Select onValueChange={ (value:PayrollStatus) => setValue("status", value) }>
            <SelectTrigger>
                <SelectValue placeholder="Status"/>
            </SelectTrigger>
            <SelectContent>
                <SelectItem value="PENDING"> Pending </SelectItem>
                <SelectItem value="PROCESSED"> Processed </SelectItem>
                <SelectItem value="PAID"> Paid </SelectItem>
            </SelectContent>
        </Select>
        <Button className="w-full" disabled={loading}> {loading?"Saving...":"Save"} </Button>
        </form>
    );
}

export default PayrollForm;