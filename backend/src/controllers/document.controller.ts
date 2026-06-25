import { Request, Response } from "express";
import documentService from "../services/document.service";
import { successResponse } from "../utils/apiResponse";
import { asyncHandler } from "../utils/asyncHandler";

class DocumentController {

  getAllDocuments = asyncHandler(
    async (req: Request,res: Response) => {
      const documents = await documentService.getAllDocuments();
      return res.status(200).json(
        successResponse(documents,"Documents fetched successfully")
      );
    }
  );

  getDocumentById = asyncHandler(
    async (req: Request,res: Response) => {
      const document = await documentService.getDocumentById(req.params.id as string);
      return res.status(200).json(
        successResponse(document,"Document fetched successfully")
      );
    }
  );

  createDocument = asyncHandler(
    async (req: Request,res: Response) => {
      const user = (req as any).user;
      const document = await documentService.createDocument({...req.body,tenantId: user.tenantId,uploadedById: user.id,});
      return res.status(201).json(
        successResponse(document,"Document created successfully")
      );
    }
  );

  deleteDocument = asyncHandler(
    async (req: Request,res: Response) => {
      await documentService.deleteDocument(req.params.id as string);
      return res.status(200).json(
        successResponse(null,"Document deleted successfully")
      );
    }
  );
}

export default new DocumentController();