import { AssetCategory, AssetStatus, } from "../generated/prisma/enums";

export interface CreateAssetDto {
  name: string;
  serialNumber: string;
  category: AssetCategory;
  purchaseDate: Date;
  purchaseCost: number;
  tenantId: string;
}

export interface UpdateAssetDto {
  name?: string;
  category?: AssetCategory;
  purchaseCost?: number;
  currentValue?: number;
  status?: AssetStatus;
}

export interface AssignAssetDto {
  assetId: string;
  employeeId: string;
}

export interface ReturnAssetDto {
  assignmentId: string;
}