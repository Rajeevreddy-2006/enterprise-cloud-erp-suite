import { useMutation, useQueryClient } from "@tanstack/react-query";
import salaryService from "@/services/salary.service";

export function useDeleteSalaryStructure(){
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: salaryService.deleteSalaryStructure,
        onSuccess(){
            queryClient.invalidateQueries({
                queryKey:[ "salaryStructures" ]
            });
        }
    });
}