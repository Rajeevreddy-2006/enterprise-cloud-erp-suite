export interface LoginDto {
    email:string;
    password:string;
}

export interface RegisterDto {
    companyName:string;
    companySlug:string;
    adminName:string;
    email:string;
    password:string;
}

export interface User {
    id:string;
    email:string;
    role:string;
    tenantId:string;
}

export interface LoginResponse {
    success:boolean;
    accessToken:string;
    refreshToken:string;
    user:User;
}

export interface RegisterResponse{
    success:boolean;
    message:string;
}

export interface ForgotPasswordDto{
    email:string;
}


export interface ResetPasswordDto{
    token:string;
    password:string;
}