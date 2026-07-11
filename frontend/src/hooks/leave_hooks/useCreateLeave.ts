import {
    useMutation,
    useQueryClient
} from "@tanstack/react-query";
import leaveService from "@/services/leave.service";

export function useCreateLeave() {
    const queryClient =
        useQueryClient();
    return useMutation({
        mutationFn:
            leaveService
                .createLeave,
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