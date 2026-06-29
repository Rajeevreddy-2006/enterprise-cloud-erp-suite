import { useMutation, useQueryClient } from "@tanstack/react-query";
import leaveService from "@/services/leave.service";

export function useUpdateLeave(){
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn:({ id, data }:{ id:string; data:any; }) => leaveService.updateLeave( id, data ),
        onSuccess(){
            queryClient.invalidateQueries({
                queryKey:[ "leaves" ]
            });
        }
    });
}