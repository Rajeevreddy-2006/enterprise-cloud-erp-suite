import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { salarySchema, type SalaryFormData } from "@/schemas/salary.schema";
import { useEmployees } from "@/hooks/employee_hooks/useEmployees";
import type { Employee } from "@/types/employee.types";
import {
    Select,
    SelectTrigger,
    SelectValue,
    SelectContent,
    SelectItem
} from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
interface Props {
    onSubmit: (data: SalaryFormData) => void;
    loading?: boolean;
    defaultValues?: SalaryFormData;
}

function SalaryStructureForm({ onSubmit, loading, defaultValues }: Props) {
    const { register, handleSubmit, setValue, watch } = useForm<SalaryFormData>({ resolver: zodResolver(salarySchema),defaultValues });
    const {data} = useEmployees();
    const employees: Employee[] = data?.data || [];
    const basic = watch("basicSalary") || 0;
    const hra = watch("hra") || 0;
    const bonus = watch("bonus") || 0;
    const pf = watch("pfPercentage") || 0;
    const tax = watch("taxPercentage") || 0;
    const gross = basic + hra + bonus;
    const pfAmount = gross * pf / 100;
    const taxAmount = gross * tax / 100;
    const net = gross - pfAmount - taxAmount;
    return (
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            <Select onValueChange={(value) => setValue("employeeId",value) }>
                <SelectTrigger>
                    <SelectValue placeholder="Employee"/>
                </SelectTrigger>
                <SelectContent>
                    {
                        employees.map((employee) => (
                                <SelectItem key={employee.id} value={employee.id}>
                                    {employee.firstName}{" "}{employee.lastName}
                                </SelectItem>
                            )
                        )
                    }
                </SelectContent>
            </Select>
            <Input type="number" placeholder="Basic Salary" { ...register("basicSalary",{valueAsNumber: true}) }/>
            <Input type="number" placeholder="HRA" { ...register("hra",{valueAsNumber: true}) }/>
            <Input type="number" placeholder="Bonus" { ...register("bonus",{ valueAsNumber: true }) }/>
            <Input type="number" placeholder="PF %" { ...register("pfPercentage",{valueAsNumber: true}) }/>
            <Input type="number" placeholder="Tax %" { ...register("taxPercentage",{valueAsNumber: true}) }/>
            <Card>
                <CardContent className="p-4">
                    <p> Gross : ₹{gross} </p>
                    <p> PF : ₹{pfAmount} </p>
                    <p> Tax : ₹{taxAmount} </p>
                    <p className="font-bold"> Net : ₹{net} </p>
                </CardContent>
            </Card>
            <Button className="w-full" disabled={loading}> { loading?"Saving...":"Save" } </Button>
        </form>
    );
}

export default SalaryStructureForm;