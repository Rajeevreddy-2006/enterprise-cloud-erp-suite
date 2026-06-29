import { useMutation, useQueryClient } from "@tanstack/react-query";
import salaryService from "@/services/salary.service";

export function useUpdateSalaryStructure(){
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn:({ id,data }:{ id:string; data:any; }) => salaryService.updateSalaryStructure(id,data),
        onSuccess(){
            queryClient.invalidateQueries({
                queryKey:[ "salaryStructures" ]
            });
        }
    });
}