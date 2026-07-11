import { CustomerInvitationStatus } from "../generated/prisma/enums";

export interface InviteCustomerDto {
    email: string;
    tenantId: string;
}

export interface CompleteCustomerRegistrationDto {
    name: string;
    phone: string;
    address: string;
}

export interface UpdateInvitationStatusDto {
    status: CustomerInvitationStatus;
}

export interface VerifyCustomerInvitationDto {
    token: string;
}

export interface CompleteCustomerRegistrationDto {
    name: string;
    email: string;
    phone: string;
    address: string;
}