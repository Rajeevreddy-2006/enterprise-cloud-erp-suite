import {
    AssetCategory,
    AssetStatus
}
from "../generated/prisma/enums";

export interface CreateAssetDto {

    name: string;

    assetCode: string;

    serialNumber?: string;

    category: AssetCategory;

    purchaseDate: string;

    purchaseCost: number;

    currentValue: number;

    supplierId?: string;

    tenantId: string;

}

export interface UpdateAssetDto {

    name?: string;

    serialNumber?: string;

    category?: AssetCategory;

    purchaseDate?: Date;

    purchaseCost?: number;

    currentValue?: number;

    supplierId?: string;

    status?: AssetStatus;

}

export interface AssignAssetDto {

    assetId: string;

    employeeId: string;

    remarks?: string;

}

export interface ReturnAssetDto {

    assignmentId: string;

    remarks?: string;

}