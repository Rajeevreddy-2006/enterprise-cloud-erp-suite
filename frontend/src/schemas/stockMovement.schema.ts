import { z } from "zod";

export const stockMovementSchema = z.object({
    movementType:z.enum([
        "PURCHASE",
        "GRN",
        "SALE",
        "ASSET_ASSIGNMENT",
        "ADJUSTMENT"
    ]),
    quantity:z.coerce.number(),
    remarks:z.string().optional(),
    inventoryItemId:z.string()
});

export type StockMovementFormData = z.infer<typeof stockMovementSchema>;