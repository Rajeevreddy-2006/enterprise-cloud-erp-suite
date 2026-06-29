import { useMutation, useQueryClient } from "@tanstack/react-query";
import leaveService from "@/services/leave.service";

export function useDeleteLeave(){
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: leaveService.deleteLeave,
        onSuccess(){
            queryClient.invalidateQueries({
                queryKey:[ "leaves" ]
            });
        }
    });
}