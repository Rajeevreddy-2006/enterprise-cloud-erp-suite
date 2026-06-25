import { Router } from "express";

import accountController from "../controllers/account.controller";

import { authenticate } from "../middleware/auth.middleware";
import { authorize } from "../middleware/rbac.middleware";
import { validate } from "../middleware/validate.middleware";

import { createAccountSchema, updateAccountSchema, } from "../validators/account.validator";

const router = Router();

router.use(authenticate);

router.get("/",authorize(["SUPER_ADMIN","TENANT_ADMIN","ACCOUNTANT",]),accountController.getAllAccounts);

router.get("/:id",authorize(["SUPER_ADMIN","TENANT_ADMIN","ACCOUNTANT",]),accountController.getAccountById);

router.post("/",authorize(["SUPER_ADMIN","TENANT_ADMIN","ACCOUNTANT",]),validate(createAccountSchema),accountController.createAccount);

router.put("/:id",authorize(["SUPER_ADMIN","TENANT_ADMIN","ACCOUNTANT",]),validate(updateAccountSchema),accountController.updateAccount);

router.delete("/:id",authorize(["SUPER_ADMIN","TENANT_ADMIN",]),accountController.deleteAccount);

export default router;