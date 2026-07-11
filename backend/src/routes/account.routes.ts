import { Router } from "express";

import accountController from "../controllers/account.controller";

import { authenticate } from "../middleware/auth.middleware";
import { authorize } from "../middleware/rbac.middleware";
import { validate } from "../middleware/validate.middleware";

import { createAccountSchema, updateAccountSchema, } from "../validators/account.validator";

const router = Router();

router.use(authenticate);

router.get("/",accountController.getAllAccounts);

router.get("/:id",accountController.getAccountById);

router.post("/",validate(createAccountSchema),accountController.createAccount);

router.put("/:id",validate(updateAccountSchema),accountController.updateAccount);

router.delete("/:id",accountController.deleteAccount);

export default router;
//authorize(["SUPER_ADMIN","TENANT_ADMIN","ACCOUNTANT",])