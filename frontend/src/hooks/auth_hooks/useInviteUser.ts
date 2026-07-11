import { useMutation } from "@tanstack/react-query";
import { useQueryClient } from "@tanstack/react-query";
import authService from "@/services/auth.service";

export const useInviteUser=()=>{
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn:(data:any)=>
            authService.inviteUser(
                data
            ),
        onSuccess(){
            queryClient.invalidateQueries({
                queryKey:["users"]
            });
        }
    });
};