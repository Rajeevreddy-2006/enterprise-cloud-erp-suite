import { useMutation, useQueryClient } from "@tanstack/react-query";
import salaryService from "@/services/salary.service";

export function useCreateSalaryStructure(){
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: salaryService.createSalaryStructure,
        onSuccess(){
            queryClient.invalidateQueries({
                queryKey:[ "salaryStructures" ]
            });
        }
    });
}