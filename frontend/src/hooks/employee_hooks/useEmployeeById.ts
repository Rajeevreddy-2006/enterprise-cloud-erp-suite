import { useQuery } from "@tanstack/react-query";
import employeeService from "@/services/employee.service";

export function useEmployeeById(id:string){
    return useQuery({
        queryKey:["employee",id],
        queryFn:() => employeeService.getEmployee(id),enabled:!!id
    });
}