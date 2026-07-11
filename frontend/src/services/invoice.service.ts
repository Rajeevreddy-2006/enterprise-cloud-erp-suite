import api from "./api";

import type {

    CreateInvoiceDto,

    UpdateInvoiceDto,

} from "@/types/invoice.types";

class InvoiceService {

    async getInvoices() {

        const response =
            await api.get(
                "/invoices"
            );

        return response.data.data;

    }

    async getInvoiceById(
        id: string
    ) {

        const response =
            await api.get(
                `/invoices/${id}`
            );

        return response.data.data;

    }

    async createInvoice(
        data: CreateInvoiceDto
    ) {

        const response =
            await api.post(
                "/invoices",
                data
            );

        return response.data.data;

    }

    async updateInvoice(
        id: string,
        data: UpdateInvoiceDto
    ) {

        const response =
            await api.patch(
                `/invoices/${id}`,
                data
            );

        return response.data.data;

    }

    async deleteInvoice(
        id: string
    ) {

        const response =
            await api.delete(
                `/invoices/${id}`
            );

        return response.data.data;

    }

    // ==========================================
    // ERP
    // ==========================================

    async sendInvoice(
        id: string
    ) {

        const response =
            await api.post(
                `/invoices/${id}/send`
            );

        return response.data.data;

    }

    async markInvoiceOverdue(
        id: string
    ) {

        const response =
            await api.patch(
                `/invoices/${id}/overdue`
            );

        return response.data.data;

    }

    // ==========================================
    // CUSTOMER
    // ==========================================

    async reviewInvoice(
        token: string
    ) {

        const response =
            await api.get(
                `/invoices/review/${token}`
            );

        return response.data.data;

    }

    async payInvoice(
        token: string
    ) {

        const response =
            await api.post(
                `/invoices/pay/${token}`
            );

        return response.data.data;

    }

    async failInvoice(
        token: string
    ) {

        const response =
            await api.post(
                `/invoices/fail/${token}`
            );

        return response.data.data;

    }

}

export default new InvoiceService();