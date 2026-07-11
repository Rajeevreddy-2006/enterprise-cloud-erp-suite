import { z } from "zod";

export const inventorySchema = z.object({

    name: z.string().min(2),

    sku: z.string().min(1),

    quantity: z.coerce.number(),

    unitPrice: z.coerce.number()

});

export type InventoryFormData =
    z.output<typeof inventorySchema>;

export type InventoryFormInput =
    z.input<typeof inventorySchema>;