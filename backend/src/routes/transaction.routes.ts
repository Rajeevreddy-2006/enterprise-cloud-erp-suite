import { Router } from "express";
import transactionController from "../controllers/transaction.controller";
import { authenticate } from "../middleware/auth.middleware";
import { authorize } from "../middleware/rbac.middleware";
import { validate } from "../middleware/validate.middleware";
import { createTransactionSchema, updateTransactionSchema, } from "../validators/transaction.validator";

const router = Router();

router.use(authenticate);

router.get("/",authorize(["SUPER_ADMIN","TENANT_ADMIN","ACCOUNTANT",]),transactionController.getAllTransactions);

router.get("/:id",authorize(["SUPER_ADMIN","TENANT_ADMIN","ACCOUNTANT",]),transactionController.getTransactionById);

router.post("/",authorize(["SUPER_ADMIN","TENANT_ADMIN","ACCOUNTANT",]),validate(createTransactionSchema),transactionController.createTransaction);

router.put("/:id",authorize(["SUPER_ADMIN","TENANT_ADMIN","ACCOUNTANT",]),validate(updateTransactionSchema),transactionController.updateTransaction);

router.delete("/:id",authorize(["SUPER_ADMIN","TENANT_ADMIN",]),transactionController.deleteTransaction);

export default router;