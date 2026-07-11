import prisma from "../config/database";

import {
    UpdateAssetDto
}
from "../types/asset.types";

import {
    AssetCategory,
    AssetStatus
}
from "../generated/prisma/enums";

class AssetRepository {

    async getAllAssets() {

        return prisma.asset.findMany({

            include: {

                supplier: true,

                assignments: {

                    where: {

                        returnedAt: null

                    },

                    include: {

                        employee: true

                    }

                },

                tenant: true

            },

            orderBy: {

                createdAt: "desc"

            }

        });

    }

    async getAssetById(

        id: string

    ) {

        return prisma.asset.findUnique({

            where: {

                id

            },

            include: {

                supplier: true,

                assignments: {

                    include: {

                        employee: true

                    },

                    orderBy: {

                        assignedAt: "desc"

                    }

                },

                tenant: true

            }

        });

    }

    async getAssetByCode(

        assetCode: string

    ) {

        return prisma.asset.findUnique({

            where: {

                assetCode

            }

        });

    }

    async getAssetBySerialNumber(

        serialNumber: string

    ) {

        return prisma.asset.findUnique({

            where: {

                serialNumber

            }

        });

    }

    async createAsset(

        data: {

            assetCode: string;

            name: string;

            serialNumber?: string;

            category: AssetCategory;

            purchaseDate: Date;

            purchaseCost: number;

            currentValue: number;

            supplierId?: string;

            tenantId: string;

        }

    ) {

        return prisma.asset.create({

            data

        });

    }

    async updateAsset(

        id: string,

        data: UpdateAssetDto

    ) {

        if (
            data.supplierId === "" ||
            data.supplierId === undefined ||
            data.supplierId === null
        ) {
            delete data.supplierId;
        }

        return prisma.asset.update({

            where: {

                id

            },

            data

        });

    }

    async deleteAsset(

        id: string

    ) {

        return prisma.asset.delete({

            where: {

                id

            }

        });

    }

    async getEmployeeById(

        employeeId: string

    ) {

        return prisma.employee.findUnique({

            where: {

                id: employeeId

            }

        });

    }

    async getActiveAssignment(

        assetId: string

    ) {

        return prisma.assetAssignment.findFirst({

            where: {

                assetId,

                returnedAt: null

            }

        });

    }

    async assignAsset(

        assetId: string,

        employeeId: string,

        tenantId: string,

        remarks?: string

    ) {

        return prisma.assetAssignment.create({

            data: {

                assetId,

                employeeId,

                tenantId,

                remarks

            }

        });

    }

    async returnAsset(

        assignmentId: string,

        remarks?: string

    ) {

        return prisma.assetAssignment.update({

            where: {

                id: assignmentId

            },

            data: {

                returnedAt:

                    new Date(),

                remarks

            }

        });

    }

    async getAssignmentById(

        id: string

    ) {

        return prisma.assetAssignment.findUnique({

            where: {

                id

            },

            include: {

                asset: true,

                employee: true

            }

        });

    }

    async updateAssetStatus(

        id: string,

        status: AssetStatus

    ) {

        return prisma.asset.update({

            where: {

                id

            },

            data: {

                status

            }

        });

    }

    async getAssetAssignments(

        assetId: string

    ) {

        return prisma.assetAssignment.findMany({

            where: {

                assetId

            },

            include: {

                employee: true

            },

            orderBy: {

                assignedAt: "desc"

            }

        });

    }

    async getEmployeeAssets(

        employeeId: string

    ) {

        return prisma.assetAssignment.findMany({

            where: {

                employeeId,

                returnedAt: null

            },

            include: {

                asset: {

                    include: {

                        supplier: true

                    }

                }

            },

            orderBy: {

                assignedAt: "desc"

            }

        });

    }

}

export default new AssetRepository();