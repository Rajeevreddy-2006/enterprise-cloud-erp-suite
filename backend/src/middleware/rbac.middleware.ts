//RBAC (Role-Based Access Control)
import { Request, Response, NextFunction } from "express";
import AppError from "../utils/AppError";
import { RoleType } from "../generated/prisma/enums";

export const authorize = (allowedRoles: RoleType[]) => {
  return (req: Request,res: Response,next: NextFunction) => {
    if (!(req as any).user) {
      throw new AppError("Unauthorized",401);
    }
    if ( !allowedRoles.includes((req as any).user.role) ) {
      throw new AppError("Forbidden",403);
    }
    next();
  };
};