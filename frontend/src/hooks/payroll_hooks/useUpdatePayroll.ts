import { useMutation, useQueryClient } from "@tanstack/react-query";
import payrollService from "@/services/payroll.service";

export function useUpdatePayroll(){
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn:({ id, data }:{ id:string; data:any; }) => payrollService.updatePayroll(id,data),
        onSuccess(){
            queryClient.invalidateQueries({
                queryKey:[ "payrolls" ]
            });
        }
    });
}