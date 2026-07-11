import {z} from "zod";

export const supplierSchema=z.object({
    name:z.string().min(2),
    email:z.email(),
    phone:z.string().optional(),
    address:z.string().optional(),
    isActive:z.boolean()
});

export type SupplierFormData = z.infer<typeof supplierSchema>;