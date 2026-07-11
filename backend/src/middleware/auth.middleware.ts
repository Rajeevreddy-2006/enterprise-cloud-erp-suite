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
    try {
      const decoded = jwt.verify(token, process.env.JWT_SECRET!) as JwtPayload;
      (req as any).user = {
        id: decoded.id,
        email: decoded.email,
        role: decoded.role,
        tenantId: decoded.tenantId
      };
      next();
    }
    catch (error) {
      if (error instanceof jwt.TokenExpiredError) {
        throw new AppError("Token expired",401);
      }
      throw new AppError("Invalid token",401);
    }
  }
);