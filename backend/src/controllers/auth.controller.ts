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

  changePassword = asyncHandler(
    async (req, res) => {
      const user = (req as any).user;
      const result = await authService.changePassword(user.id, req.body);
      return res.status(200).json(
        successResponse(
          result,
          "Password updated"
        )
      );
    }
  );

  inviteUser = asyncHandler(
    async (req, res) => {
      const currentUser = (req as any).user;
      const result = await authService
          .inviteUser(
            currentUser.tenantId,
            req.body
          );
      return res.status(201).json(successResponse(result, "Invitation Sent"));
    }
  );

  acceptInvite = asyncHandler(
    async (req, res) => {
      const result = await authService.acceptInvite(req.body);
      return res.status(200).json(
        successResponse(result,"Account Created")
      );
    }
  );

  resendInvite = asyncHandler(
    async (req, res) => {
      const result = await authService.resendInvite(req.params.id as string);
      return res.status(200).json(
        successResponse(result,"Invitation resent")
      );
    }
  );

  // refreshToken = asyncHandler(
  //   async (req: Request,res: Response) => {
  //       const result = await authService.refreshAccessToken(req.body.refreshToken);
  //       return res.status(200).json(
  //           successResponse(result,"Token refreshed successfully")
  //       );
  //   }
  // );
  refreshToken = asyncHandler(

async(req,res)=>{

console.log("REFRESH HIT");

console.log(req.body);

const result=

await authService.refreshAccessToken(

req.body.refreshToken

);

return res.status(200)

.json(

successResponse(

result,

"Refreshed"

)

);

}

);

  forgotPassword = asyncHandler(
    async(req,res)=>{
      const result = await authService.forgotPassword(req.body);
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