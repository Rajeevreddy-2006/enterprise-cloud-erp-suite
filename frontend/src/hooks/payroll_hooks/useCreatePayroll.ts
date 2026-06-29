import { useMutation, useQueryClient } from "@tanstack/react-query";
import payrollService from "@/services/payroll.service";

export function useCreatePayroll(){
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: payrollService.createPayroll,
        onSuccess(){
            queryClient.invalidateQueries({
                queryKey:[ "payrolls" ]
            });
        }
    });
}