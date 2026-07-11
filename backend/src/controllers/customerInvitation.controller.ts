import { Request, Response } from "express";

import customerInvitationService from "../services/customerInvitation.service";

import { asyncHandler } from "../utils/asyncHandler";
import { successResponse } from "../utils/apiResponse";

class CustomerInvitationController {

    getAllInvitations = asyncHandler(
        async (req: Request, res: Response) => {
            const user = (req as any).user;
            const invitations =
                await customerInvitationService.getAllInvitations(
                    user.tenantId
                );
            return res.json(
                successResponse(
                    invitations,
                    "Customer invitations fetched successfully"
                )
            );
        }
    );

    getInvitationById = asyncHandler(
        async (req: Request, res: Response) => {
            const invitation =
                await customerInvitationService.getInvitationById(
                    req.params.id as string
                );
            return res.json(
                successResponse(
                    invitation,
                    "Customer invitation fetched successfully"
                )
            );
        }
    );

    verifyInvitation = asyncHandler(
        async (req: Request, res: Response) => {

            const invitation =
                await customerInvitationService.verifyInvitation(
                    req.params.token as string
                );

            return res.json(
                successResponse(
                    invitation,
                    "Invitation verified successfully"
                )
            );
        }
    );

    inviteCustomer = asyncHandler(
        async (req: Request, res: Response) => {
            const user = (req as any).user;
            const invitation =
                await customerInvitationService.inviteCustomer({
                    ...req.body,
                    tenantId: user.tenantId,
                });
            return res.status(201).json(
                successResponse(
                    invitation,
                    "Customer invitation sent successfully"
                )
            );
        }
    );

    completeRegistration = asyncHandler(
        async (req: Request, res: Response) => {

            const customer =
                await customerInvitationService.completeRegistration(
                    req.params.token as string,
                    req.body
                );

            return res.status(201).json(
                successResponse(
                    customer,
                    "Customer registered successfully"
                )
            );
        }
    );

    resendInvitation = asyncHandler(
        async (req: Request, res: Response) => {
            const user = (req as any).user;
            const invitation =
                await customerInvitationService.resendInvitation(
                    req.params.id as string,
                    user.tenantId
                );
            return res.json(
                successResponse(
                    invitation,
                    "Customer invitation resent successfully"
                )
            );
        }
    );

    deleteInvitation = asyncHandler(
        async (req: Request, res: Response) => {
            await customerInvitationService.deleteInvitation(
                req.params.id as string
            );
            return res.json(
                successResponse(
                    null,
                    "Customer invitation deleted successfully"
                )
            );
        }
    );

}

export default new CustomerInvitationController();