import { Router } from "express";

import supplierController

from "../controllers/supplier.controller";

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

    createSupplierSchema,

    updateSupplierSchema

}

from "../validators/supplier.validator";

const router = Router();

router.use(

    authenticate

);

router.get(

    "/",

    supplierController

        .getAllSuppliers

);

router.get(

    "/:id",

    supplierController

        .getSupplierById

);

router.post(

    "/",

    authorize([

        "SUPER_ADMIN",

        "TENANT_ADMIN",

        "HR"

    ]),

    validate(

        createSupplierSchema

    ),

    supplierController

        .createSupplier

);

router.patch(

    "/:id",

    // authorize([

    //     "SUPER_ADMIN",

    //     "TENANT_ADMIN"

    // ]),

    validate(

        updateSupplierSchema

    ),

    supplierController

        .updateSupplier

);

router.delete(

    "/:id",

    authorize([

        "SUPER_ADMIN",

        "TENANT_ADMIN"

    ]),

    supplierController

        .deleteSupplier

);

export default router;