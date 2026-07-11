import { Router } from "express";

import customerInvitationController from "../controllers/customerInvitation.controller";

import { authenticate } from "../middleware/auth.middleware";
import { authorize } from "../middleware/rbac.middleware";
import { validate } from "../middleware/validate.middleware";

import {
    inviteCustomerSchema,
    completeCustomerSchema,
    completeCustomerRegistrationSchema
} from "../validators/customerInvitation.validator";

const router = Router();

// router.post(
//     "/register/:token",
//     validate(completeCustomerSchema),
//     customerInvitationController.completeRegistration
// );

router.post(
    "/register/:token",
    validate(completeCustomerRegistrationSchema),
    customerInvitationController.completeRegistration
);

router.get(
    "/verify/:token",
    customerInvitationController.verifyInvitation
);

router.use(authenticate);

router.get(
    "/",
    authorize([
        "SUPER_ADMIN",
        "TENANT_ADMIN",
        "SALES_MANAGER",
        "SALES_EXECUTIVE",
    ]),
    customerInvitationController.getAllInvitations
);

router.get(
    "/:id",
    authorize([
        "SUPER_ADMIN",
        "TENANT_ADMIN",
        "SALES_MANAGER",
        "SALES_EXECUTIVE",
    ]),
    customerInvitationController.getInvitationById
);

router.post(
    "/",
    authorize([
        "SUPER_ADMIN",
        "TENANT_ADMIN",
        "SALES_MANAGER",
        "SALES_EXECUTIVE",
    ]),
    validate(inviteCustomerSchema),
    customerInvitationController.inviteCustomer
);

router.post(
    "/:id/resend",
    authorize([
        "SUPER_ADMIN",
        "TENANT_ADMIN",
        "SALES_MANAGER",
        "SALES_EXECUTIVE",
    ]),
    customerInvitationController.resendInvitation
);

router.delete(
    "/:id",
    authorize([
        "SUPER_ADMIN",
        "TENANT_ADMIN",
        "SALES_MANAGER",
    ]),
    customerInvitationController.deleteInvitation
);

export default router;