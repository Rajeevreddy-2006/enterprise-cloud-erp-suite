import {
    useMutation,
    useQueryClient
} from "@tanstack/react-query";
import leaveService from "@/services/leave.service";

export function useApproveLeave() {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: leaveService.approveLeave,
        onSuccess() {
            queryClient.invalidateQueries({
                queryKey: [
                    "employee-leaves"
                ]
            });
            queryClient.invalidateQueries({
                queryKey: [
                    "leave-balance"
                ]
            });
        }
    });
}