export interface CustomerInvitation {
    id: string;
    email: string;
    token: string;
    status:
        | "PENDING"
        | "ACCEPTED"
        | "EXPIRED";
    tenantId: string;
    expiresAt: string;
    acceptedAt?: string;
    createdAt: string;
    updatedAt?: string;
}

export interface InviteCustomer {
    email: string;
}

export interface VerifyCustomerInvitationResponse {
    email: string;
    tenantId: string;
}

export interface CompleteCustomerRegistration {
    name: string;
    email: string;
    phone: string;
    address: string;
}