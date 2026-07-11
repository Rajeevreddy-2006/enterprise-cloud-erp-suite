import { useMutation } from "@tanstack/react-query";

import { useQueryClient } from "@tanstack/react-query";

import authService from "@/services/auth.service";

export const useResendInvite=()=>{
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn:(id:string)=>
            authService.resendInvite(
                id
            ),
        onSuccess(){
            queryClient.invalidateQueries({
                queryKey:["users"]
            });
        }
    });
};