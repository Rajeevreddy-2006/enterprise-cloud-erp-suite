import { useMutation, useQueryClient } from "@tanstack/react-query";
import payrollService from "@/services/payroll.service";

export function useDeletePayroll(){
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: payrollService.deletePayroll,
        onSuccess(){
            queryClient.invalidateQueries({
                queryKey:[ "payrolls" ]
            });
        }
    });
}