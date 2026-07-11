import assetRepository from "../repositories/asset.repository";

import notificationService from "./notification.service";

import AppError from "../utils/AppError";

import {
    CreateAssetDto,
    UpdateAssetDto,
    AssignAssetDto,
    ReturnAssetDto
} from "../types/asset.types";

class AssetService {

    async getAllAssets() {

        return assetRepository.getAllAssets();

    }

    async getAssetById(id: string) {

        const asset =
            await assetRepository.getAssetById(id);

        if (!asset) {

            throw new AppError(

                "Asset not found",

                404

            );

        }

        return asset;

    }

    // async createAsset(

    //     data: CreateAssetDto

    // ) {

    //     const existingCode =

    //         await assetRepository.getAssetByCode(

    //             data.assetCode

    //         );

    //     if (existingCode) {

    //         throw new AppError(

    //             "Asset code already exists",

    //             400

    //         );

    //     }

    //     if (

    //         data.serialNumber

    //     ) {

    //         const existingSerial =

    //             await assetRepository

    //                 .getAssetBySerialNumber(

    //                     data.serialNumber

    //                 );

    //         if (existingSerial) {

    //             throw new AppError(

    //                 "Serial number already exists",

    //                 400

    //             );

    //         }

    //     }

    //     const asset =

    //         await assetRepository

    //             .createAsset({

    //                 assetCode:

    //                     data.assetCode,

    //                 name:

    //                     data.name,

    //                 serialNumber:

    //                     data.serialNumber,

    //                 category:

    //                     data.category,

    //                 purchaseDate:

    //                     data.purchaseDate,

    //                 purchaseCost:

    //                     data.purchaseCost,

    //                 currentValue:

    //                     data.currentValue,

    //                 supplierId:

    //                     data.supplierId,

    //                 tenantId:

    //                     data.tenantId

    //             });

    //     await notificationService

    //         .createNotification({

    //             title:

    //                 "Asset Created",

    //             message:

    //                 `${asset.name} created successfully`,

    //             tenantId:

    //                 asset.tenantId

    //         });

    //     return asset;

    // }
    async createAsset(data: CreateAssetDto) {
    try {

        console.log("Incoming Data:", data);

        const existing = data.serialNumber
            ? await assetRepository.getAssetBySerialNumber(data.serialNumber)
            : null;

        if (existing) {
            throw new AppError("Serial number already exists", 400);
        }

        const asset = await assetRepository.createAsset({
            assetCode: data.assetCode,
            name: data.name,
            serialNumber: data.serialNumber,
            category: data.category,
            purchaseDate: new Date(data.purchaseDate),
            purchaseCost: data.purchaseCost,
            currentValue: data.currentValue,
            supplierId: data.supplierId,
            tenantId: data.tenantId,
        });

        return asset;

    } catch (error) {
        console.error(error);
        throw error;
    }
}

    async updateAsset(

        id: string,

        data: UpdateAssetDto

    ) {

        const asset =

            await this.getAssetById(

                id

            );

        if (

            data.serialNumber &&

            data.serialNumber !==

            asset.serialNumber

        ) {

            const existing =

                await assetRepository

                    .getAssetBySerialNumber(

                        data.serialNumber

                    );

            if (existing) {

                throw new AppError(

                    "Serial number already exists",

                    400

                );

            }

        }

        return assetRepository

            .updateAsset(

                id,

                data

            );

    }

    async deleteAsset(

        id: string

    ) {

        const asset =

            await this.getAssetById(

                id

            );

        const active =

            await assetRepository

                .getActiveAssignment(

                    asset.id

                );

        if (active) {

            throw new AppError(

                "Assigned asset cannot be deleted",

                400

            );

        }

        return assetRepository

            .deleteAsset(

                id

            );

    }

    async assignAsset(

        data: AssignAssetDto

    ) {

        const asset =

            await assetRepository

                .getAssetById(

                    data.assetId

                );

        if (!asset) {

            throw new AppError(

                "Asset not found",

                404

            );

        }

        if (

            asset.status !==

            "AVAILABLE"

        ) {

            throw new AppError(

                "Asset is not available",

                400

            );

        }

        const employee =

            await assetRepository

                .getEmployeeById(

                    data.employeeId

                );

        if (!employee) {

            throw new AppError(

                "Employee not found",

                404

            );

        }

        const active =

            await assetRepository

                .getActiveAssignment(

                    asset.id

                );

        if (active) {

            throw new AppError(

                "Asset already assigned",

                400

            );

        }

        const assignment =

            await assetRepository

                .assignAsset(

                    asset.id,

                    employee.id,

                    asset.tenantId,

                    data.remarks

                );

        await assetRepository

            .updateAssetStatus(

                asset.id,

                "ASSIGNED"

            );

        await notificationService

            .createNotification({

                title:

                    "Asset Assigned",

                message:

                    `${asset.name} assigned to ${employee.firstName} ${employee.lastName}`,

                tenantId:

                    asset.tenantId

            });

        return assignment;

    }

    async returnAsset(

        data: ReturnAssetDto

    ) {

        const assignment =

            await assetRepository

                .getAssignmentById(

                    data.assignmentId

                );

        if (!assignment) {

            throw new AppError(

                "Assignment not found",

                404

            );

        }

        if (

            assignment.returnedAt

        ) {

            throw new AppError(

                "Asset already returned",

                400

            );

        }

        const returned =

            await assetRepository

                .returnAsset(

                    assignment.id,

                    data.remarks

                );

        await assetRepository

            .updateAssetStatus(

                assignment.assetId,

                "AVAILABLE"

            );

        await notificationService

            .createNotification({

                title:

                    "Asset Returned",

                message:

                    "Asset returned successfully",

                tenantId:

                    assignment.tenantId

            });

        return returned;

    }

    async getAssetHistory(

        assetId: string

    ) {

        await this.getAssetById(

            assetId

        );

        return assetRepository

            .getAssetAssignments(

                assetId

            );

    }

    async getEmployeeAssets(

        employeeId: string

    ) {

        return assetRepository

            .getEmployeeAssets(

                employeeId

            );

    }

}

export default new AssetService();