import { RoleType } from "../generated/prisma/enums";

export interface CreateUserDto {
    name:string;
    email:string;
    password?:string;
    tenantId:string;
    role:RoleType;
    designation?:string;
    phone?:string;
    isVerified?:boolean;
}

export interface UpdateUserDto {
  name?: string;
  email?: string;
  password?: string;
  tenantId?: string;
  role?: RoleType;
  isActive?: boolean;
}

export interface UpdateProfileDto{
  name:string;
}