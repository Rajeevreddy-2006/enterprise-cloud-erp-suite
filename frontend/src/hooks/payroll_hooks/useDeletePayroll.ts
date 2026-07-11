import {
    useMutation
} from "@tanstack/react-query";
import payrollService from "@/services/payroll.service";

export function useDeletePayroll() {
    return useMutation({
        mutationFn: (
            id: string
        ) =>
            payrollService.deletePayroll(
                id
            )
    });
}