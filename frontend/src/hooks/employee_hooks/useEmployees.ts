import { useQuery } from "@tanstack/react-query";
import employeeService from "@/services/employee.service";

export function useEmployees(){
    return useQuery({
        queryKey:[ "employees" ],
        queryFn: employeeService.getEmployees 
    });
}