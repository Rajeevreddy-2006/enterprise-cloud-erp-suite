import prisma from "../config/database";

import {
    CreateQuotationDto,
    UpdateQuotationDto,
} from "../types/quotation.types";

class QuotationRepository {

    async getAllQuotations(
        tenantId: string
    ) {

        return prisma.quotation.findMany({

            where: {
                tenantId,
            },

            include: {
                customer: true,
                opportunity: true,
            },

            orderBy: {
                createdAt: "desc",
            },

        });

    }

    async getQuotationById(
        id: string,
        tenantId: string
    ) {

        return prisma.quotation.findFirst({

            where: {
                id,
                tenantId,
            },

            include: {
                customer: true,
                opportunity: true,
            },

        });

    }

    async getQuotationByNumber(
        quotationNumber: string
    ) {

        return prisma.quotation.findUnique({

            where: {
                quotationNumber,
            },

        });

    }

    async createQuotation(
        data: CreateQuotationDto
    ) {

        return prisma.quotation.create({

            data: {

                quotationNumber:
                    data.quotationNumber,

                customerId:
                    data.customerId,

                opportunityId:
                    data.opportunityId,

                amount:
                    data.amount,

                requestedQuantity:
                    null,

                validUntil:
                    data.validUntil,

                tenantId:
                    data.tenantId,

            },

            include: {
                customer: true,
                opportunity: true,
            },

        });

    }

    async updateQuotation(
        id: string,
        tenantId: string,
        data: UpdateQuotationDto
    ) {

        return prisma.quotation.update({

            where: {
                id,
                tenantId,
            },

            data,

            include: {
                customer: true,
                opportunity: true,
            },

        });

    }

    async deleteQuotation(
        id: string,
        tenantId: string
    ) {

        return prisma.quotation.delete({

            where: {
                id,
                tenantId,
            },

        });

    }

    async sendQuotation(
        id: string,
        token: string
    ) {

        return prisma.quotation.update({

            where: {
                id,
            },

            data: {

                status: "SENT",

                approvalToken: token,

                sentAt: new Date(),

            },

        });

    }

    async findByApprovalToken(
        token: string
    ) {

        return prisma.quotation.findFirst({

            where: {
                approvalToken: token,
            },

            include: {

                customer: true,

                tenant: true,

                opportunity: true,

            },

        });

    }

    async acceptQuotation(
        token: string,
        requestedQuantity: number
    ) {

        return prisma.quotation.update({

            where: {
                approvalToken: token,
            },

            data: {

                status: "ACCEPTED",

                approvedAt: new Date(),

                requestedQuantity,

                approvalToken: null,

            },

            include: {

                customer: true,

                tenant: true,

                opportunity: true,

            },

        });

    }

    async rejectQuotation(
        token: string
    ) {

        return prisma.quotation.update({

            where: {
                approvalToken: token,
            },

            data: {

                status: "REJECTED",

                requestedQuantity: 0,

                rejectedAt: new Date(),

                approvalToken: null,

            },

            include: {

                customer: true,

                tenant: true,

                opportunity: true,

            },

        });

    }

    async expireQuotation(
        id: string
    ) {

        return prisma.quotation.update({

            where: {
                id,
            },

            data: {

                status: "EXPIRED",

            },

        });

    }

}

export default new QuotationRepository();