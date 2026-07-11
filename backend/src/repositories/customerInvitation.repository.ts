import prisma from "../config/database";

import {
    CustomerInvitationStatus,
} from "../generated/prisma/enums";

import {
    InviteCustomerDto,
} from "../types/customerInvitation.types";

class CustomerInvitationRepository {

    async getAllInvitations(tenantId: string) {
        return prisma.customerInvitation.findMany({
            where: {
                tenantId,
            },
            include: {
                tenant: true,
            },
            orderBy: {
                createdAt: "desc",
            },
        });
    }

    async getInvitationById(id: string) {
        return prisma.customerInvitation.findUnique({
            where: {
                id,
            },
            include: {
                tenant: true,
            },
        });
    }

    async getInvitationByEmail(email: string) {
        return prisma.customerInvitation.findFirst({
            where: {
                email,
            },
        });
    }

    async getInvitationByToken(token: string) {
        return prisma.customerInvitation.findUnique({
            where: {
                token,
            },
        });
    }

    async verifyInvitation(token: string) {
        return prisma.customerInvitation.findFirst({
            where: {
                token,
            },
        });
    }

    async acceptInvitation(token: string) {
        return prisma.customerInvitation.update({
            where: {
                token,
            },
            data: {
                status: "ACCEPTED",
                token: null,
            },
        });
    }

    async createInvitation(
        data: InviteCustomerDto & {
            token: string;
            expiresAt: Date;
        }
    ) {
        return prisma.customerInvitation.create({
            data: {
                email: data.email,
                tenantId: data.tenantId,
                token: data.token,
                expiresAt: data.expiresAt,
            },
            include: {
                tenant: true,
            },
        });
    }

    async updateInvitation(
        id: string,
        data: Partial<InviteCustomerDto>
    ) {
        return prisma.customerInvitation.update({
            where: {
                id,
            },
            data,
            include: {
                tenant: true,
            },
        });
    }

    async updateStatus(
        id: string,
        status: CustomerInvitationStatus
    ) {
        return prisma.customerInvitation.update({
            where: {
                id,
            },
            data: {
                status,
                acceptedAt:
                    status === "ACCEPTED"
                        ? new Date()
                        : null,
            },
        });
    }

    async resendInvitation(
        id: string,
        token: string,
        expiresAt: Date
    ) {
        return prisma.customerInvitation.update({
            where: {
                id,
            },
            data: {
                token,
                expiresAt,
                status: "PENDING",
            },
        });
    }

    async deleteInvitation(id: string) {
        return prisma.customerInvitation.delete({
            where: {
                id,
            },
        });
    }
}

export default new CustomerInvitationRepository();