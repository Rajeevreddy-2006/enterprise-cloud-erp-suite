import { Router } from "express";
import userController from "../controllers/user.controller";
import { validate } from "../middleware/validate.middleware";
import { authenticate } from "../middleware/auth.middleware";
import { authorize } from "../middleware/rbac.middleware";
import { createUserSchema,updateUserSchema, } from "../validators/user.validator";

const router = Router();

router.use(authenticate);

router.get("/", authorize(["SUPER_ADMIN","TENANT_ADMIN",]), userController.getAllUsers);

router.get("/:id", authorize(["SUPER_ADMIN","TENANT_ADMIN",]), userController.getUserById);

router.post("/", authorize(["SUPER_ADMIN","TENANT_ADMIN",]), validate(createUserSchema), userController.createUser);

router.put("/:id", authorize(["SUPER_ADMIN","TENANT_ADMIN",]), validate(updateUserSchema), userController.updateUser);

router.delete("/:id", authorize(["SUPER_ADMIN",]), userController.deleteUser);

export default router;