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
    name:string;
    email:string;
    role:string;
    tenantId:string;
    createdAt?:string;
    companyName?:string;
    companySlug?: string;
    tenant?:{
        id:string;
        name:string;
        slug:string;
    };
}

export interface LoginPayload {
    accessToken:string;
    refreshToken:string;
    user:User;
}

export interface LoginResponse {
    success:boolean;
    message:string;
    data:LoginPayload;
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

export interface ChangePasswordDto{
    currentPassword:string;
    newPassword:string;
}

export interface InviteUserDto{
    name:string;
    email:string;
    designation:string;
    role:string;
}

export interface AcceptInviteDto{
    token:string;
    password:string;
}