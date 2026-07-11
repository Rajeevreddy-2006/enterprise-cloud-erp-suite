import api from "./api";

import type {
    CreatePaymentDto,
    UpdatePaymentDto
} from "@/types/payment.types";

class PaymentService {

    async getPayments() {

        const response =
            await api.get(
                "/payments"
            );

        return response.data;

    }

    async getPaymentById(

        id: string

    ) {

        const response =
            await api.get(
                `/payments/${id}`
            );

        return response.data;

    }

    async createPayment(

        data: CreatePaymentDto

    ) {

        const response =
            await api.post(
                "/payments",
                data
            );

        return response.data;

    }

    async updatePayment(

        id: string,

        data: UpdatePaymentDto

    ) {

        const response =
            await api.patch(
                `/payments/${id}`,
                data
            );

        return response.data;

    }

    async deletePayment(

        id: string

    ) {

        const response =
            await api.delete(
                `/payments/${id}`
            );

        return response.data;

    }

    async completePayment(id: string) {

        const response =
            await api.patch(
                `/payments/${id}/complete`
            );

        return response.data;

    }

    async failPayment(id: string) {

        const response =
            await api.patch(
                `/payments/${id}/fail`
            );

        return response.data;

    }

}

export default new PaymentService();