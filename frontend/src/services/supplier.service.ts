import api from "./api";

class SupplierService {

    async getSuppliers() {

        const res =
            await api.get(
                "/suppliers"
            );

        return res.data;

    }

    async getSupplier(
        id: string
    ) {

        const res =
            await api.get(
                `/suppliers/${id}`
            );

        return res.data;

    }

    async createSupplier(
        data: any
    ) {

        const res =
            await api.post(
                "/suppliers",
                data
            );

        return res.data;

    }

    async updateSupplier(
        id: string,
        data: any
    ) {

        const res =
            await api.patch(
                `/suppliers/${id}`,
                data
            );

        return res.data;

    }

    async deleteSupplier(
        id: string
    ) {

        const res =
            await api.delete(
                `/suppliers/${id}`
            );

        return res.data;

    }

}

export default new SupplierService();