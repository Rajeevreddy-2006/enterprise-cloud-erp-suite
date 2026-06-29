import { useMutation, useQueryClient } from "@tanstack/react-query";
import employeeService from "@/services/employee.service";

export function useUpdateEmployee(){

const queryClient= useQueryClient();
    return useMutation({
        mutationFn:({ id, data }:{ id:string; data:any; })=>
        employeeService.updateEmployee(id,data),
        onSuccess(){
            queryClient.invalidateQueries({
            queryKey:["employees"]
        });
        }
    });
}
