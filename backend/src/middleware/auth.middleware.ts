import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";

import AppError from "../utils/AppError";
import { asyncHandler } from "../utils/asyncHandler";

interface JwtPayload {
  id: string;
  email: string;
  role: string;
  tenantId: string;
}

export const authenticate = asyncHandler(
  async (req: Request,res: Response,next: NextFunction) => {
    const authHeader = req.headers.authorization;
    if ( !authHeader || !authHeader.startsWith("Bearer ")) 
    {
      throw new AppError("Access token required",401);
    }
    const token = authHeader.split(" ")[1];
    const decoded = jwt.verify(token,process.env.JWT_SECRET!) as JwtPayload;
    (req as any).user = {
      id: decoded.id,
      email: decoded.email,
      role: decoded.role as any,
      tenantId: decoded.tenantId,
    };
    next();
  }
);