import { Request, Response } from "express";
import accountService from "../services/account.service";
import AppError from "../utils/AppError";
import { successResponse } from "../utils/apiResponse";
import { asyncHandler } from "../utils/asyncHandler";
import auditLogService from "../services/auditLog.service";

class AccountController {

  getAllAccounts = asyncHandler(
    async (req: Request, res: Response) => {
      const user = (req as any).user;
      const accounts = await accountService.getAllAccounts(user.tenantId, user.role);
      return res.status(200).json(
        successResponse(accounts,"Accounts fetched successfully"
        )
      );
    }
  );

  getAccountById = asyncHandler(
    async (req: Request, res: Response) => {
      const id = req.params.id as string;
      const account = await accountService.getAccountById(id);
      if (!account) {
        throw new AppError("Account not found",404);
      }
      return res.status(200).json(
        successResponse(account,"Account fetched successfully")
      );
    }
  );

  createAccount = asyncHandler(
    async (req: Request, res: Response) => {
      const user = (req as any).user;
      const account =await accountService.createAccount({...req.body,tenantId: user.tenantId,});
      await auditLogService.createLog({
        action: "CREATE",
        entity: "ACCOUNT",
        entityId: account.id,
        userId: user.id,
        tenantId: user.tenantId,
      });
      return res.status(201).json(
        successResponse(account,"Account created successfully")
      );
    }
  );

  updateAccount = asyncHandler(
    async (req: Request, res: Response) => {
      const id = req.params.id as string;
      const user = (req as any).user;
      const account = await accountService.updateAccount(id,req.body);
      await auditLogService.createLog({
        action: "UPDATE",
        entity: "ACCOUNT",
        entityId: account.id,
        userId: user.id,
        tenantId: user.tenantId,
      });
      return res.status(200).json(
        successResponse(account,"Account updated successfully")
      );
    }
  );

  deleteAccount = asyncHandler(
    async (req: Request, res: Response) => {
      const id = req.params.id as string;
      const user = (req as any).user;
      await accountService.deleteAccount(id);
      await auditLogService.createLog({
        action: "DELETE",
        entity: "ACCOUNT",
        entityId: id,
        userId: user.id,
        tenantId: user.tenantId,
      });
      return res.status(200).json(
        successResponse(null,"Account deleted successfully")
      );
    }
  );

}

export default new AccountController();