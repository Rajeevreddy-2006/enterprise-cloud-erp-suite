import { Request, Response } from "express";
import authService from "../services/auth.service";
import { successResponse } from "../utils/apiResponse";
import { asyncHandler } from "../utils/asyncHandler";

class AuthController {

  login = asyncHandler(
    async (req: Request, res: Response) => {
      const result = await authService.login(req.body);
      return res.status(200).json(
        successResponse(result,"Login successful")
      );
    }
  );

  register = asyncHandler(
    async(req,res)=>{
      const result = await authService.register(req.body);
      return res.status(201).json(
        successResponse(result,"Registration successful")
      );
    }
  );

  refreshToken = asyncHandler(
    async (req: Request,res: Response) => {
        const result = await authService.refreshAccessToken(req.body.refreshToken);
        return res.status(200).json(
            successResponse(result,"Token refreshed successfully")
        );
    }
  );

  forgotPassword = asyncHandler(
    async(req,res)=>{
      const result = await authService.forgotPassword(req.body.email);
      return res.status(200).json(
        successResponse(result,"Reset link sent")
      );
    }
  );

  resetPassword = asyncHandler(
    async(req,res)=>{
      const result= await authService.resetPassword(req.body);
      return res.status(200).json(
        successResponse(result,"Password updated")
      );
    }
  );

  logout = asyncHandler(
    async (req: Request,res: Response) => {
        const user = (req as any).user;
        const result = await authService.logout(user.id);
        return res.status(200).json(
            successResponse(result,"Logout successful")
        );
    }
  );
}

export default new AuthController();