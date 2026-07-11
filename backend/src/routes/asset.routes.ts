import { Router } from "express";

import assetController
    from "../controllers/asset.controller";

import {
    authenticate
}
    from "../middleware/auth.middleware";

import {
    authorize
}
    from "../middleware/rbac.middleware";

import {
    validate
}
    from "../middleware/validate.middleware";

import {

    createAssetSchema,

    updateAssetSchema,

    assignAssetSchema,

    returnAssetSchema

}

    from "../validators/asset.validator";

const router = Router();

router.use(

    authenticate

);

/*
--------------------------------
Assets
--------------------------------
*/

router.get(

    "/",

    assetController.getAllAssets

);

router.get(

    "/:id",

    assetController.getAssetById

);

router.post(

    "/",

    // authorize([

    //     "SUPER_ADMIN",

    //     "TENANT_ADMIN"

    // ]),

    validate(

        createAssetSchema

    ),

    assetController.createAsset

);

router.patch(

    "/:id",

    // authorize([

    //     "SUPER_ADMIN",

    //     "TENANT_ADMIN"

    // ]),

    validate(

        updateAssetSchema

    ),

    assetController.updateAsset

);

router.delete(

    "/:id",

    authorize([

        "SUPER_ADMIN",

        "TENANT_ADMIN"

    ]),

    assetController.deleteAsset

);

/*
--------------------------------
Assignments
--------------------------------
*/

router.post(

    "/assign",

    authorize([

        "SUPER_ADMIN",

        "TENANT_ADMIN",

        "HR"

    ]),

    validate(

        assignAssetSchema

    ),

    assetController.assignAsset

);

router.post(

    "/return",

    authorize([

        "SUPER_ADMIN",

        "TENANT_ADMIN",

        "HR"

    ]),

    validate(

        returnAssetSchema

    ),

    assetController.returnAsset

);

/*
--------------------------------
History
--------------------------------
*/

router.get(

    "/:id/history",

    assetController.getAssetHistory

);

/*
--------------------------------
Employee Assets
--------------------------------
*/

router.get(

    "/employee/:id",

    assetController.getEmployeeAssets

);

export default router;