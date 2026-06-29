import { useMutation, useQueryClient } from "@tanstack/react-query";
import employeeService from "@/services/employee.service";

export function useDeleteEmployee(){
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn:
        employeeService.deleteEmployee,
        onSuccess(){
            queryClient.invalidateQueries({
                queryKey:[ "employees" ]
            });
        }
    });
}