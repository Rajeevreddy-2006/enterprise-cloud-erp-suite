import api from "./api";
import type { LoginDto,LoginResponse,RegisterDto,RegisterResponse,ForgotPasswordDto,ResetPasswordDto,ChangePasswordDto,AcceptInviteDto,InviteUserDto } from "@/types/auth.types";

class AuthService {

    async login(data:LoginDto){
        const response = await api.post<LoginResponse>("/auth/login",data);
        return response.data.data;
    }

    async register(data:RegisterDto){
        const response = await api.post<RegisterResponse>("/auth/register",data);
        return response.data;
    }

    async changePassword(data:ChangePasswordDto){
        const response = await api.patch("/auth/change-password",data);
        return response.data;
    }

    async inviteUser(data:InviteUserDto){
        const response = await api.post("/auth/invite",data);
        return response.data;
    }

    async acceptInvite(data:AcceptInviteDto){
        const response = await api.post("/auth/accept-invite",data);
        return response.data;
    }

    async forgotPassword(data:ForgotPasswordDto){
        const response = await api.post("/auth/forgot-password",data);
        return response.data;
    }

    async resetPassword(data:ResetPasswordDto){
        const response = await api.post("/auth/reset-password",data);
        return response.data;
    }

    async logout(){
        return api.post("/auth/logout");
    }

    async resendInvite(id: string) {
        const response = await api.post(
            `/auth/resend-invite/${id}`
        );
        return response.data;
    }
}

export default new AuthService();
