import { z } from "zod";

export const createAssetSchema = z.object({
  name: z.string().min(2),
  serialNumber: z.string().min(2),
  purchaseDate: z.coerce.date(),
  purchaseCost: z.number().positive(),
  tenantId: z.string(),
});

export const assignAssetSchema = z.object({
  assetId: z.string(),
  employeeId: z.string(),
});

export const returnAssetSchema = z.object({
  assignmentId: z.string(),
});