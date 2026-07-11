import prisma

from "../config/database";

class SupplierRepository {

    async getAllSuppliers() {

        return prisma.supplier.findMany({

            include: {

                assets: true,

                purchaseOrders: true

            },

            orderBy: {

                createdAt: "desc"

            }

        });

    }

    async getSupplierById(

        id: string

    ) {

        return prisma.supplier.findUnique({

            where: {

                id

            },

            include: {

                assets: true,

                purchaseOrders: true

            }

        });

    }

    async getSupplierByEmail(

        email: string

    ) {

        return prisma.supplier.findUnique({

            where: {

                email

            }

        });

    }

    async createSupplier(

        data: any

    ) {

        return prisma.supplier.create({

            data

        });

    }

    async updateSupplier(

        id: string,

        data: any

    ) {

        return prisma.supplier.update({

            where: {

                id

            },

            data

        });

    }

    async deleteSupplier(

        id: string

    ) {

        return prisma.supplier.delete({

            where: {

                id

            }

        });

    }

}

export default new SupplierRepository();