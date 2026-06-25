import { Request, Response } from "express";
import essService from "../services/ess.service";
import { successResponse } from "../utils/apiResponse";
import { asyncHandler } from "../utils/asyncHandler";

class EssController {

  getMyProfile = asyncHandler(
    async (req: Request, res: Response) => {
      const user = (req as any).user;
      const profile = await essService.getMyProfile(user.id);
      return res.status(200).json(
        successResponse(profile,"Profile fetched successfully")
      );
    }
  );

  getMyAttendance = asyncHandler(
    async (req: Request, res: Response) => {
      const user = (req as any).user;
      const attendance = await essService.getMyAttendance(user.id);
      return res.status(200).json(
        successResponse(attendance,"Attendance fetched successfully")
      );
    }
  );

  getMyLeaves = asyncHandler(
    async (req: Request, res: Response) => {
      const user = (req as any).user;
      const leaves = await essService.getMyLeaves(user.id);
      return res.status(200).json(
        successResponse(leaves,"Leaves fetched successfully")
      );
    }
  );

  getMyPayrolls = asyncHandler(
    async (req: Request, res: Response) => {
      const user = (req as any).user;
      const payrolls = await essService.getMyPayrolls(user.id);
      return res.status(200).json(
        successResponse(payrolls,"Payrolls fetched successfully")
      );
    }
  );
}

export default new EssController();