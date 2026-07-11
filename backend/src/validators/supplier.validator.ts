import { z } from "zod";

export const createSupplierSchema = z.object({

    name:

        z.string()

        .min(2),

    email:

        z.email(),

    phone:

        z.string()

        .optional(),

    address:

        z.string()

        .optional(),

    tenantId: z.string().optional()

});

export const updateSupplierSchema =

createSupplierSchema

.partial()

.extend({

    isActive:

        z.boolean()

        .optional()

});
