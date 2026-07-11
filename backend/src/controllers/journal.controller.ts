import { Request, Response } from "express";
import { asyncHandler } from "../utils/asyncHandler";
import journalService from "../services/journal.service";
import { successResponse } from "../utils/apiResponse";

class JournalController {
    getAllJournalEntries = asyncHandler(
        async (_req: Request, res: Response) => {
            const journalEntries =
                await journalService.getAllJournalEntries();
            return res.status(200).json(
                successResponse(
                    journalEntries,
                    "Journal Entries fetched successfully"
                )
            );
        }
    );

    getJournalEntryById = asyncHandler(
        async (req: Request, res: Response) => {
            const journalEntry =
                await journalService.getJournalEntryById(
                    req.params.id as string
                );
            return res.status(200).json(
                successResponse(
                    journalEntry,
                    "Journal Entry fetched successfully"
                )
            );
        }
    );

    createJournalEntry = asyncHandler(
        async (req: Request, res: Response) => {
            const user = (req as any).user;
            const journalEntry =
                await journalService.createJournalEntry({
                    ...req.body,
                    tenantId: user.tenantId
                });
            return res.status(201).json(
                successResponse(
                    journalEntry,
                    "Journal Entry created successfully"
                )
            );
        }
    );

    updateJournalEntry = asyncHandler(
        async (req: Request, res: Response) => {
            const journalEntry =
                await journalService.updateJournalEntry(
                    req.params.id as string,
                    req.body
                );
            return res.status(200).json(
                successResponse(
                    journalEntry,
                    "Journal Entry updated successfully"
                )
            );
        }
    );

    deleteJournalEntry = asyncHandler(
        async (req: Request, res: Response) => {
            await journalService.deleteJournalEntry(
                req.params.id as string
            );
            return res.status(200).json(
                successResponse(
                    null,
                    "Journal Entry deleted successfully"
                )
            );
        }
    );
}

export default new JournalController();