import { z } from "zod";

export const createAssetSchema = z.object({
  name: z.string().min(2),

  serialNumber: z.string().min(2),

  category: z.enum([
    "COMPUTER",
    "LAPTOP",
    "MOBILE",
    "FURNITURE",
    "VEHICLE",
    "MACHINERY",
    "NETWORK_DEVICE",
    "OTHER",
  ]),

  purchaseDate: z.coerce.date(),

  purchaseCost: z.number().positive(),

  tenantId: z.string(),
});

export const updateAssetSchema = z.object({
  name: z.string().min(2).optional(),

  category: z.enum([
    "COMPUTER",
    "LAPTOP",
    "MOBILE",
    "FURNITURE",
    "VEHICLE",
    "MACHINERY",
    "NETWORK_DEVICE",
    "OTHER",
  ]).optional(),

  purchaseCost: z.number().positive().optional(),

  currentValue: z.number().positive().optional(),

  status: z.enum([
    "AVAILABLE",
    "ASSIGNED",
    "UNDER_MAINTENANCE",
    "RETIRED",
  ]).optional(),
});

export const assignAssetSchema = z.object({
  assetId: z.string(),

  employeeId: z.string(),
});

export const returnAssetSchema = z.object({
  assignmentId: z.string(),
});