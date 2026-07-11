import { Router } from "express";
import journalController from "../controllers/journal.controller";
import { authenticate } from "../middleware/auth.middleware";
import { authorize } from "../middleware/rbac.middleware";
import { validate } from "../middleware/validate.middleware";
import {
    createJournalEntrySchema,
    updateJournalEntrySchema
} from "../validators/journal.validator";

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
    journalController.getAllJournalEntries

);

router.get(
    "/:id",
    authorize([
        "SUPER_ADMIN",
        "TENANT_ADMIN",
        "ACCOUNTANT",
        "HR"
    ]),
    journalController.getJournalEntryById
);

router.post(
    "/",
    authorize([
        "SUPER_ADMIN",
        "TENANT_ADMIN",
        "ACCOUNTANT",
        "HR"
    ]),
    validate(createJournalEntrySchema),
    journalController.createJournalEntry
);

router.put(
    "/:id",
    authorize([
        "SUPER_ADMIN",
        "TENANT_ADMIN",
        "ACCOUNTANT",
        "HR"
    ]),
    validate(updateJournalEntrySchema),
    journalController.updateJournalEntry
);

router.delete(
    "/:id",
    authorize([
        "SUPER_ADMIN",
        "TENANT_ADMIN",
        "HR"
    ]),
    journalController.deleteJournalEntry
);

export default router;
// authorize([
//         "SUPER_ADMIN",
//         "TENANT_ADMIN",
//         "ACCOUNTANT"
//     ]),