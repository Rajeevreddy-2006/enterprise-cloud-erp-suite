import api from "./api";

import type {

    CreatePurchaseRequestDto,

    UpdatePurchaseRequestDto

} from "@/types/purchaseRequest.types";

class PurchaseRequestService {

    async getPurchaseRequests() {

        const response = await api.get(

            "/purchase-requests"

        );

        return response.data;

    }

    async getPurchaseRequestById(

        id: string

    ) {

        const response = await api.get(

            `/purchase-requests/${id}`

        );

        return response.data;

    }

    async createPurchaseRequest(

        data: CreatePurchaseRequestDto

    ) {

        const response = await api.post(

            "/purchase-requests",

            data

        );

        return response.data;

    }

    async updatePurchaseRequest(

        id: string,

        data: UpdatePurchaseRequestDto

    ) {

        const response = await api.patch(

            `/purchase-requests/${id}`,

            data

        );

        return response.data;

    }

    async deletePurchaseRequest(

        id: string

    ) {

        const response = await api.delete(

            `/purchase-requests/${id}`

        );

        return response.data;

    }

    async approvePurchaseRequest(

        id: string

    ) {

        const response = await api.patch(

            `/purchase-requests/${id}/approve`

        );

        return response.data;

    }

    async rejectPurchaseRequest(

        id: string

    ) {

        const response = await api.patch(

            `/purchase-requests/${id}/reject`

        );

        return response.data;

    }

    async createPurchaseOrder(

        id: string

    ) {

        const response = await api.post(

            `/purchase-requests/${id}/create-po`

        );

        return response.data;

    }

}

export default new PurchaseRequestService();