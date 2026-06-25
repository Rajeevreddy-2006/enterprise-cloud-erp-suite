import { Request, Response } from "express";
import timeEntryService from "../services/timeEntry.service";
import { successResponse } from "../utils/apiResponse";
import { asyncHandler } from "../utils/asyncHandler";

class TimeEntryController {

  getAllTimeEntries = asyncHandler(
    async (req: Request,res: Response) => {
      const timeEntries = await timeEntryService.getAllTimeEntries();
      return res.status(200).json(
        successResponse(timeEntries,"Time entries fetched successfully")
      );
    }
  );

  getTimeEntryById = asyncHandler(
    async (req: Request,res: Response) => {
      const timeEntry = await timeEntryService.getTimeEntryById(req.params.id as string);
      return res.status(200).json(
        successResponse(timeEntry,"Time entry fetched successfully")
      );
    }
  );

  createTimeEntry = asyncHandler(
    async (req: Request,res: Response) => {
      const timeEntry = await timeEntryService.createTimeEntry(req.body);
      return res.status(201).json(
        successResponse(timeEntry,"Time entry created successfully")
      );
    }
  );

  updateTimeEntry = asyncHandler(
    async (req: Request,res: Response) => {
      const timeEntry = await timeEntryService.updateTimeEntry(req.params.id as string,req.body);
      return res.status(200).json(
        successResponse(timeEntry,"Time entry updated successfully")
      );
    }
  );

  deleteTimeEntry = asyncHandler(
    async (req: Request,res: Response) => {
      await timeEntryService.deleteTimeEntry(req.params.id as string);
      return res.status(200).json(
        successResponse(null,"Time entry deleted successfully")
      );
    }
  );
}

export default new TimeEntryController();