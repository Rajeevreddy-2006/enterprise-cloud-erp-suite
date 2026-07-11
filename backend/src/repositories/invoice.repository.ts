import prisma from "../config/database";

import {
    CreateInvoiceDto,
    UpdateInvoiceDto,
} from "../types/invoice.types";

class InvoiceRepository {

    async getAllInvoices(
        tenantId: string
    ) {

        return prisma.invoice.findMany({

            where: {
                tenantId,
            },

            include: {

                salesOrder: {
                    include: {
                        customer: true,
                    },
                },

                tenant: true,

                payments: true,

            },

            orderBy: {
                createdAt: "desc",
            },

        });

    }

    async getInvoiceById(
        id: string,
        tenantId: string
    ) {

        return prisma.invoice.findFirst({

            where: {
                id,
                tenantId,
            },

            include: {

                salesOrder: {
                    include: {
                        customer: true,
                    },
                },

                tenant: true,

                payments: true,

            },

        });

    }

    async getInvoiceByNumber(
        invoiceNumber: string
    ) {

        return prisma.invoice.findUnique({

            where: {
                invoiceNumber,
            },

        });

    }

    async createInvoice(
        data: CreateInvoiceDto
    ) {

        return prisma.invoice.create({

            data: {

                invoiceNumber:
                    data.invoiceNumber,

                salesOrderId:
                    data.salesOrderId,

                amount:
                    data.amount,

                dueDate:
                    new Date(data.dueDate),

                tenantId:
                    data.tenantId,

                status:
                    data.status ?? "DRAFT",

            },

            include: {

                salesOrder: {
                    include: {
                        customer: true,
                    },
                },

                tenant: true,

            },

        });

    }

    async updateInvoice(
        id: string,
        tenantId: string,
        data: UpdateInvoiceDto
    ) {

        return prisma.invoice.update({

            where: {
                id,
            },

            data: {

                ...data,

                dueDate:
                    data.dueDate
                        ? new Date(data.dueDate)
                        : undefined,

            },

            include: {

                salesOrder: {
                    include: {
                        customer: true,
                    },
                },

                tenant: true,

            },

        });

    }

    async deleteInvoice(
        id: string,
        tenantId: string
    ) {

        return prisma.invoice.delete({

            where: {
                id,
            },

        });

    }

    // =====================================================
    // EMAIL PAYMENT FLOW
    // =====================================================

    async sendInvoice(
        id: string,
        token: string
    ) {

        return prisma.invoice.update({

            where: {
                id,
            },

            data: {

                paymentToken: token,

                status: "SENT",

                sentAt: new Date(),

            },

        });

    }

    async reviewInvoice(
        token: string
    ) {

        return prisma.invoice.findFirst({

            where: {
                paymentToken: token,
            },

            include: {

                salesOrder: {
                    include: {
                        customer: true,
                    },
                },

                tenant: true,

            },

        });

    }

    async payInvoice(
        token: string
    ) {

        return prisma.invoice.update({

            where: {
                paymentToken: token,
            },

            data: {

                status: "PAID",

                paidAt: new Date(),

                paymentDate: new Date(),

                paymentToken: null,

            },

            include: {

                salesOrder: {
                    include: {
                        customer: true,
                    },
                },

                tenant: true,

            },

        });

    }

    async expireInvoice(
        id: string
    ) {

        return prisma.invoice.update({

            where: {
                id,
            },

            data: {

                status: "OVERDUE",

            },

        });

    }

    async findByPaymentToken(
        token: string
    ) {

        return prisma.invoice.findFirst({

            where: {
                paymentToken: token,
            },

            include: {

                salesOrder: {
                    include: {
                        customer: true,
                    },
                },

                tenant: true,

            },

        });

    }

  async getInvoiceBySalesOrderId(
    salesOrderId: string
  ) {

    return prisma.invoice.findFirst({

      where: {
        salesOrderId,
      },

    });

  }

  async failInvoice(token: string) {

    return prisma.invoice.update({

        where: {
            paymentToken: token,
        },

        data: {

            status: "FAILED",

            declinedAt: new Date(),

            paymentToken: null,

        },

        include: {

            salesOrder: {
                include: {
                    customer: true,
                },
            },

            tenant: true,

        },

    });

  }

}

export default new InvoiceRepository();