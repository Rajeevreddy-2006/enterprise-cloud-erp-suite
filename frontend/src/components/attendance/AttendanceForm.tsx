import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { attendanceSchema, type AttendanceFormData } from "@/schemas/attendance.schema";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { AttendanceStatus } from "@/types/attendance.types";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useEmployees } from "@/hooks/employee_hooks/useEmployees";
import type { Employee } from "@/types/employee.types";

interface Props{
    onSubmit:(data:AttendanceFormData)=>void;
    loading?:boolean;
    defaultValues?:AttendanceFormData;
}

function AttendanceForm({ onSubmit, loading, defaultValues }:Props){
    const { register,handleSubmit,setValue,watch,formState:{errors} } =
    useForm<AttendanceFormData>({ resolver:zodResolver(attendanceSchema),defaultValues });
    const { data } = useEmployees();
    const employees:Employee[] = data?.data || [];
    return(
        <form onSubmit={ handleSubmit(onSubmit) } className="space-y-4">
            <Select onValueChange={(value:string) => setValue("employeeId",value)}>
                <SelectTrigger>
                    <SelectValue placeholder="Employee"/>
                </SelectTrigger>
                <SelectContent> 
                {
                    employees.map((employee)=>(
                        <SelectItem key={employee.id} value={employee.id}>{employee.firstName} {" "} {employee.lastName} </SelectItem>
                    ))
                } 
                </SelectContent> 
            </Select>
            <Input type="date" { ...register("date") } />
            <Select onValueChange={(value:string) => setValue("status",value as AttendanceStatus) } >
            <SelectTrigger> 
                <SelectValue placeholder="Status"/>
            </SelectTrigger>
            <SelectContent>
                <SelectItem value="PRESENT"> Present </SelectItem>
                <SelectItem value="ABSENT"> Absent </SelectItem>
                <SelectItem value="HALF_DAY"> Half Day </SelectItem>
                <SelectItem value="LEAVE"> Leave </SelectItem>
            </SelectContent>
            </Select>
            <Input type="time" { ...register("checkIn") } />
            <Input type="time" { ...register("checkOut") } />
            <Button className="w-full" disabled={loading} > { loading?"Saving...":"Save" } </Button>
        </form>
    )
}

export default AttendanceForm;