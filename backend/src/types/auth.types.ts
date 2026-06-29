import { RoleType } from "../generated/prisma/enums";

export interface LoginDto {
  email: string;
  password: string;
}

export interface RegisterDto {
  companyName: string;
  companySlug: string;
  adminName: string;
  email: string;
  password: string;
}

export interface User {
  id: string;
  email: string;
  role: string;
  tenantId: string;
}

export interface LoginResponse {
  success: boolean;
  accessToken: string;
  refreshToken: string;
  user: User;
}

export interface RegisterResponse {
  tenantId: string;
  userId: string;
  email: string;
  role: RoleType;
}

export interface ForgotPasswordDto{
  email:string;
}

export interface ResetPasswordDto{
  token:string;
  password:string;
}