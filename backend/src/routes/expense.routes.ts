import { Router } from "express";

import expenseController from "../controllers/expense.controller";

import { authenticate } from "../middleware/auth.middleware";

import { authorize } from "../middleware/rbac.middleware";

import { validate } from "../middleware/validate.middleware";

import {

    createExpenseSchema,

    updateExpenseSchema

} from "../validators/expense.validator";

const router = Router();

router.use(authenticate);

router.get(

    "/",

    authorize([

        "SUPER_ADMIN",

        "TENANT_ADMIN",

        "ACCOUNTANT",

        "HR"

    ]),

    expenseController.getAllExpenses

);

router.get(

    "/:id",

    authorize([

        "SUPER_ADMIN",

        "TENANT_ADMIN",

        "ACCOUNTANT",

        "HR"

    ]),

    expenseController.getExpenseById

);

router.post(

    "/",

    authorize([

        "SUPER_ADMIN",

        "TENANT_ADMIN",

        "ACCOUNTANT",

        "HR"

    ]),

    validate(createExpenseSchema),

    expenseController.createExpense

);

router.put(

    "/:id",

    authorize([

        "SUPER_ADMIN",

        "TENANT_ADMIN",

        "ACCOUNTANT",

        "HR"

    ]),

    validate(updateExpenseSchema),

    expenseController.updateExpense

);

router.delete(

    "/:id",

    authorize([

        "SUPER_ADMIN",

        "TENANT_ADMIN",

        "HR"

    ]),

    expenseController.deleteExpense

);

export default router;