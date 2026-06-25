import { Router } from "express";
import timeEntryController from "../controllers/timeEntry.controller";
import { authenticate } from "../middleware/auth.middleware";

const router = Router();

router.get("/",authenticate,timeEntryController.getAllTimeEntries);

router.get("/:id",authenticate,timeEntryController.getTimeEntryById);

router.post("/",authenticate,timeEntryController.createTimeEntry);

router.put("/:id",authenticate,timeEntryController.updateTimeEntry);

router.delete("/:id",authenticate,timeEntryController.deleteTimeEntry);

export default router;