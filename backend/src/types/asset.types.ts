import { AssetStatus } from "../generated/prisma/enums";

export interface CreateAssetDto {
  name: string;
  serialNumber: string;
  purchaseDate: Date;
  purchaseCost: number;
  tenantId: string;
}

export interface UpdateAssetDto {
  name?: string;
  purchaseCost?: number;
  status?: AssetStatus;
}

export interface AssignAssetDto {
  assetId: string;
  employeeId: string;
}

export interface ReturnAssetDto {
  assignmentId: string;
}