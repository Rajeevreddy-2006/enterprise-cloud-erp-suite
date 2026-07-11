import api from "./api";

import type {

    CreatePurchaseOrderDto,

    UpdatePurchaseOrderDto

} from "@/types/purchase.types";

class PurchaseOrderService {

    async getPurchaseOrders() {

        const response = await api.get(

            "/purchase-orders"

        );

        return response.data;

    }

    async getPurchaseOrderById(

        id: string

    ) {

        const response = await api.get(

            `/purchase-orders/${id}`

        );

        return response.data;

    }

    async createPurchaseOrder(

        data: CreatePurchaseOrderDto

    ) {

        const response = await api.post(

            "/purchase-orders",

            data

        );

        return response.data;

    }

    async updatePurchaseOrder(

        id: string,

        data: UpdatePurchaseOrderDto

    ) {

        const response = await api.put(

            `/purchase-orders/${id}`,

            data

        );

        return response.data;

    }

    async deletePurchaseOrder(

        id: string

    ) {

        const response = await api.delete(

            `/purchase-orders/${id}`

        );

        return response.data;

    }

}

export default new PurchaseOrderService();