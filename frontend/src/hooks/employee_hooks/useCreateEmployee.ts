import { useMutation, useQueryClient } from "@tanstack/react-query";
import employeeService from "@/services/employee.service";

export function useCreateEmployee(){
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn:
        employeeService.createEmployee,
        onSuccess(){
            queryClient.invalidateQueries({
                queryKey:[ "employees" ]
            });
        }
    });
}