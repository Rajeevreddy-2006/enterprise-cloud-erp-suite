import api from "./api";
import type { LoginDto,LoginResponse,RegisterDto,RegisterResponse,ForgotPasswordDto,ResetPasswordDto } from "@/types/auth.types";

class AuthService {

    async login(data:LoginDto){
        const response = await api.post<LoginResponse>("/auth/login",data);
        return response.data;
    }

    async register(data:RegisterDto){
        const response = await api.post<RegisterResponse>("/auth/register",data);
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
}

export default new AuthService();
