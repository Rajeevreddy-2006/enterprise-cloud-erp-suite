import {
    useMutation,
    useQueryClient
} from "@tanstack/react-query";
import leaveService from "@/services/leave.service";

export function useRejectLeave() {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: leaveService.rejectLeave,
        onSuccess() {
            queryClient.invalidateQueries({
                queryKey: [
                    "employee-leaves"
                ]
            });
        }
    });
}