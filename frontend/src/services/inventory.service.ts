import api from "./api";

class InventoryService {

    async getInventoryItems() {

        const res =
            await api.get(
                "/inventory"
            );

        return res.data;

    }

    async getInventoryItem(
        id: string
    ) {

        const res =
            await api.get(
                `/inventory/${id}`
            );

        return res.data;

    }

    async createInventoryItem(
        data: any
    ) {

        const res =
            await api.post(
                "/inventory",
                data
            );

        return res.data;

    }

    async updateInventoryItem(
        id: string,
        data: any
    ) {

        const res =
            await api.put(
                `/inventory/${id}`,
                data
            );

        return res.data;

    }

    async deleteInventoryItem(
        id: string
    ) {

        const res =
            await api.delete(
                `/inventory/${id}`
            );

        return res.data;

    }

}

export default new InventoryService();