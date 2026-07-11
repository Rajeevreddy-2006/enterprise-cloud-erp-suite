import { useMutation } from "@tanstack/react-query";
import authService from "@/services/auth.service";
import type { ChangePasswordDto } from "@/types/auth.types";

export const useChangePassword = () => {
    return useMutation({
        mutationFn: (data: ChangePasswordDto) =>
            authService.changePassword(data)
    });
};