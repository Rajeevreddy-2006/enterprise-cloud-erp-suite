import { RoleType } from "../generated/prisma/enums";

export interface CreateUserDto {
  name: string;
  email: string;
  password: string;
  tenantId: string;
  role: RoleType;
}

export interface UpdateUserDto {
  name?: string;
  email?: string;
  password?: string;
  tenantId?: string;
  role?: RoleType;
  isActive?: boolean;
}