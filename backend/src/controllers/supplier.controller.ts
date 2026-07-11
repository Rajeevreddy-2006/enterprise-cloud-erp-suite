import {

    Request,

    Response

}

from "express";

import supplierService

from "../services/supplier.service";

import {

    successResponse

}

from "../utils/apiResponse";

import {

    asyncHandler

}

from "../utils/asyncHandler";

class SupplierController {

    getAllSuppliers = asyncHandler(

        async (

            req,

            res

        ) => {

            const suppliers =

                await supplierService

                    .getAllSuppliers();

            return res.json(

                successResponse(

                    suppliers,

                    "Suppliers fetched"

                )

            );

        }

    );

    getSupplierById = asyncHandler(

        async (

            req,

            res

        ) => {

            const supplier =

                await supplierService

                    .getSupplierById(

                        req.params.id as string

                    );

            return res.json(

                successResponse(

                    supplier,

                    "Supplier fetched"

                )

            );

        }

    );

    createSupplier = asyncHandler(
        async (req, res) => {

            console.log("Request Body:", req.body);
            const user = (req as any).user;

            const supplier = await supplierService.createSupplier({
                ...req.body,
                tenantId: user!.tenantId
            });

            return res.status(201).json(
                successResponse(
                    supplier,
                    "Supplier created successfully"
                )
            );
        }
    );

    updateSupplier = asyncHandler(

        async (

            req,

            res

        ) => {

            const supplier =

                await supplierService

                    .updateSupplier(

                        req.params.id as string,

                        req.body

                    );

            return res.json(

                successResponse(

                    supplier,

                    "Supplier updated"

                )

            );

        }

    );

    deleteSupplier = asyncHandler(

        async (

            req,

            res

        ) => {

            await supplierService

                .deleteSupplier(

                    req.params.id as string

                );

            return res.json(

                successResponse(

                    null,

                    "Supplier deleted"

                )

            );

        }

    );

}

export default new SupplierController();