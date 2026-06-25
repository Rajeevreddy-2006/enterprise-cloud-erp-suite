import { Request, Response, NextFunction } from "express";
import AppError from "../utils/AppError";

export const tenantGuard = (req: Request,res: Response,next: NextFunction) => {
  if (!req.user?.tenantId) {
    throw new AppError("Tenant information missing",403);
  }
  next();
};