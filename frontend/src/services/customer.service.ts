import api from "./api";

class CustomerService {

    async getCustomers() {

        const res =
            await api.get(
                "/customers"
            );
        return res.data;

    }

    async getCustomers1() {

        const res =
            await api.get(
                "/customers"
            );
        return res.data;

    }

    async getCustomer(

        id: string

    ) {

        const res =
            await api.get(

                `/customers/${id}`

            );

        return res.data;

    }

    async createCustomer(

        data: any

    ) {

        const res =
            await api.post(

                "/customers",

                data

            );

        return res.data;

    }

    async updateCustomer(

        id: string,

        data: any

    ) {

        const res =
            await api.patch(

                `/customers/${id}`,

                data

            );

        return res.data;

    }

    async deleteCustomer(

        id: string

    ) {

        const res =
            await api.delete(

                `/customers/${id}`

            );

        return res.data;

    }

}

export default new CustomerService();