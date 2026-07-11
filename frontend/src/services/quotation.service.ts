import api from "./api";

import type {
    CreateQuotation,
    UpdateQuotation,
    AcceptQuotation,
} from "@/types/quotation.types";

class QuotationService {

    async getAllQuotations() {

        const response =
            await api.get(
                "/quotations"
            );

        return response.data.data;

    }

    async getQuotationById(
        id: string
    ) {

        const response =
            await api.get(
                `/quotations/${id}`
            );

        return response.data.data;

    }

    async createQuotation(
        data: CreateQuotation
    ) {

        const response =
            await api.post(
                "/quotations",
                data
            );

        return response.data.data;

    }

    async updateQuotation(
        id: string,
        data: UpdateQuotation
    ) {

        const response =
            await api.patch(
                `/quotations/${id}`,
                data
            );

        return response.data.data;

    }

    async deleteQuotation(
        id: string
    ) {

        const response =
            await api.delete(
                `/quotations/${id}`
            );

        return response.data.data;

    }

    async sendQuotation(
        id: string
    ) {

        const response =
            await api.post(
                `/quotations/${id}/send`
            );

        return response.data.data;

    }

    async reviewQuotation(
        token: string
    ) {

        const response =
            await api.get(
                `/quotations/review/${token}`
            );

        return response.data.data;

    }

    async acceptQuotation(
        token: string,
        data: AcceptQuotation
    ) {

        const response =
            await api.post(
                `/quotations/accept/${token}`,
                data
            );

        return response.data.data;

    }

    async rejectQuotation(
        token: string
    ) {

        const response =
            await api.post(
                `/quotations/reject/${token}`
            );

        return response.data.data;

    }

}

export default new QuotationService();