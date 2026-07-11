import { RoleType } from "../generated/prisma/enums";

export interface InviteUserDto {
    name:string;
    email:string;
    role:RoleType;
    designation?:string;
}

export interface AcceptInviteDto{
    token:string;
    password:string;
}