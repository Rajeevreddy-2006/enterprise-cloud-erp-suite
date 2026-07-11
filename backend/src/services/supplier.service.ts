import supplierRepository

from "../repositories/supplier.repository";

import AppError

from "../utils/AppError";

class SupplierService {

    async getAllSuppliers() {

        return supplierRepository

            .getAllSuppliers();

    }

    async getSupplierById(

        id: string

    ) {

        const supplier =

            await supplierRepository

                .getSupplierById(

                    id

                );

        if (

            !supplier

        ) {

            throw new AppError(

                "Supplier not found",

                404

            );

        }

        return supplier;

    }

    async createSupplier(

        data: any

    ) {

        const existing =

            await supplierRepository

                .getSupplierByEmail(

                    data.email

                );

        if (

            existing

        ) {

            throw new AppError(

                "Supplier already exists",

                400

            );

        }

        return supplierRepository

            .createSupplier(

                data

            );

    }

    async updateSupplier(

        id: string,

        data: any

    ) {

        await this

            .getSupplierById(

                id

            );

        return supplierRepository

            .updateSupplier(

                id,

                data

            );

    }

    async deleteSupplier(

        id: string

    ) {

        await this

            .getSupplierById(

                id

            );

        return supplierRepository

            .deleteSupplier(

                id

            );

    }

}

export default new SupplierService();