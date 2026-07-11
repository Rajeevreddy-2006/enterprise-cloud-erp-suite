import { z }
from "zod";

const assetCategories = [

    "COMPUTER",

    "LAPTOP",

    "MOBILE",

    "FURNITURE",

    "VEHICLE",

    "MACHINERY",

    "NETWORK_DEVICE",

    "OTHER"

] as const;

const assetStatuses = [

    "AVAILABLE",

    "ASSIGNED",

    "UNDER_MAINTENANCE",

    "RETIRED"

] as const;

export const createAssetSchema =

z.object({

    assetCode:

        z.string()

        .min(2),

    name:

        z.string()

        .min(2),

    serialNumber:

        z.string()

        .optional(),

    category:

        z.enum(

            assetCategories

        ),

    purchaseDate: z.string(),

    purchaseCost:

        z.number()

        .positive(),

    currentValue:

        z.number()

        .positive(),

    supplierId:

        z.string()

        .optional(),

    tenantId: z.string().optional()

});

export const updateAssetSchema =

z.object({

    assetCode:

        z.string()

        .optional(),

    name:

        z.string()

        .optional(),

    serialNumber:

        z.string()

        .optional(),

    category:

        z.enum(

            assetCategories

        )

        .optional(),

    purchaseDate:

        z.coerce.date()

        .optional(),

    purchaseCost:

        z.number()

        .positive()

        .optional(),

    currentValue:

        z.number()

        .positive()

        .optional(),

    supplierId:

        z.string()

        .optional(),

    status:

        z.enum(

            assetStatuses

        )

        .optional()

});

export const assignAssetSchema =

z.object({

    assetId:

        z.string(),

    employeeId:

        z.string(),

    remarks:

        z.string()

        .optional()

});

export const returnAssetSchema =

z.object({

    assignmentId:

        z.string(),

    remarks:

        z.string()

        .optional()

});