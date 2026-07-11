import api from "./api";

class SalesOrderService {

    async getSalesOrders() {

        const res =
            await api.get(
                "/sales-orders"
            );

        return res.data;

    }

    async getSalesOrder(
        id: string
    ) {

        const res =
            await api.get(
                `/sales-orders/${id}`
            );

        return res.data;

    }

    async createSalesOrder(
        data: any
    ) {

        const res =
            await api.post(
                "/sales-orders",
                data
            );

        return res.data;

    }

    async updateSalesOrder(
        id: string,
        data: any
    ) {

        const res =
            await api.patch(
                `/sales-orders/${id}`,
                data
            );

        return res.data;

    }

    async deleteSalesOrder(
        id: string
    ) {

        const res =
            await api.delete(
                `/sales-orders/${id}`
            );

        return res.data;

    }

    async confirmSalesOrder(id: string) {

        const res =
            await api.patch(
                `/sales-orders/${id}/confirm`
            );

        return res.data;

    }

    async completeSalesOrder(id: string) {

        const res =
            await api.patch(
                `/sales-orders/${id}/complete`
            );

        return res.data;

    }

    async cancelSalesOrder(id: string) {

        const res =
            await api.patch(
                `/sales-orders/${id}/cancel`
            );

        return res.data;

    }

}

export default new SalesOrderService();