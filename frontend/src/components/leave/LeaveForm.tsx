import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { leaveSchema, type LeaveFormData } from "@/schemas/leave.schema";
import { LeaveStatus, type LeaveType } from "@/types/leave.types";
import { useEmployees } from "@/hooks/employee_hooks/useEmployees";
import type { Employee } from "@/types/employee.types";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";

interface Props{
    onSubmit:(data:LeaveFormData)=>void;
    loading?:boolean;
    defaultValues?:LeaveFormData;
}

function LeaveForm({ onSubmit, loading, defaultValues }:Props){
    const { register, handleSubmit, setValue, watch } = useForm<LeaveFormData>({ resolver: zodResolver( leaveSchema ), defaultValues });
    const { data } = useEmployees();
    const employees:Employee[] = data?.data || [];
    const startDate = watch("startDate");
    const endDate = watch("endDate");
    const handleFormSubmit = (data: LeaveFormData) => {
        if (startDate && endDate && new Date(endDate) < new Date(startDate)) {
            toast.error("End date cannot be earlier than start date");
            return;
        }
        onSubmit(data); 
    };
    return(
        <form onSubmit={ handleSubmit(handleFormSubmit) } className="space-y-4">
        <Select onValueChange={(value:string) => setValue("employeeId",value)}>
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
        <Select onValueChange={(value:LeaveType) => setValue("leaveType",value as LeaveType)}>
        <SelectTrigger>
        <SelectValue placeholder="Leave Type"/>
        </SelectTrigger>
        <SelectContent>
            <SelectItem value="SICK"> Sick </SelectItem>
            <SelectItem value="CASUAL"> Casual </SelectItem>
            <SelectItem value="EARNED"> Earned </SelectItem>
            <SelectItem value="UNPAID"> Unpaid </SelectItem>
        </SelectContent>
        </Select>
        <Input type="date" { ...register("startDate") } />
        <Input type="date" { ...register("endDate") } />
        <Input placeholder="Reason" { ...register("reason") } />
        <Select onValueChange={(value:LeaveStatus) => setValue("status",value as LeaveStatus) } >
        <SelectTrigger>
        <SelectValue placeholder="Status" />
        </SelectTrigger>
        <SelectContent>
            <SelectItem value="PENDING"> Pending </SelectItem>
            <SelectItem value="APPROVED"> Approved </SelectItem>
            <SelectItem value="REJECTED"> Rejected</SelectItem>
        </SelectContent>
        </Select>
        <Button className="w-full" disabled={loading}> { loading?"Saving...":"Save" } </Button>
        </form>
    );
}

export default LeaveForm;