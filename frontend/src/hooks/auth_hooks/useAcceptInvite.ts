import { useMutation } from "@tanstack/react-query";
import authService from "@/services/auth.service";
import type {
    AcceptInviteDto
} from "@/types/auth.types";

export const useAcceptInvite = ()=>{
    return useMutation({
        mutationFn:(data:AcceptInviteDto) => authService.acceptInvite(data)
    });
};