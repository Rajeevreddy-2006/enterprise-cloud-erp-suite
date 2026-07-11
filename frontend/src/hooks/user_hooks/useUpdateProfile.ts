import { useMutation } from "@tanstack/react-query";
import userService from "@/services/user.service";

export const useUpdateProfile=()=>{
    return useMutation({
        mutationFn:(data:any)=>
            userService.updateProfile(data)
    });
};