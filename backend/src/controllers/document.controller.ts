import { Request, Response } from "express";
import documentService from "../services/document.service";
import { successResponse } from "../utils/apiResponse";
import { asyncHandler } from "../utils/asyncHandler";
import cloudinary from "../config/cloudinary";
import fs from "fs";
import AppError from "../utils/AppError";

class DocumentController {

  getAllDocuments = asyncHandler(
    async (req: Request, res: Response) => {
      const documents = await documentService.getAllDocuments();
      return res.status(200).json(
        successResponse(documents, "Documents fetched successfully")
      );
    }
  );

  employeeDocuments = asyncHandler(
    async (req, res) => {
      const docs =
        await documentService.employeeDocuments(
          req.params.id as string
        );
      return res.status(200).json(
        successResponse(
          docs,
          "Documents fetched"
        )
      );
    }
  );

  // upload = asyncHandler(
  //   async (req, res) => {
  //     const file = (req as any).file;
  //     if (!file) {
  //       return res.status(400).json({
  //         success: false,
  //         message: "No file uploaded"
  //       });
  //     }
  //     const user = (req as any).user;
  //     const document =
  //       await documentService.createDocument({
  //         name:
  //           file.originalname,
  //         fileUrl:
  //           file.path,
  //         category:
  //           req.body.category,
  //         employeeId:
  //           req.body.employeeId,
  //         tenantId:
  //           user.tenantId,
  //         uploadedById:
  //           user.id
  //       });
  //     res.status(201).json({
  //       success: true,
  //       data: document
  //     });
  //   });


  upload = asyncHandler(

    async (req, res) => {

      const file =
        (req as any).file;

      if (!file) {

        throw new AppError(

          "No file uploaded",

          400

        );

      }

      const uploaded =

        await cloudinary
          .uploader
          .upload(

            file.path,

            {

              folder:

                "amdox-documents",

              resource_type:

                "raw"

            }

          );

      fs.unlinkSync(

        file.path

      );
      const user = (req as any).user;
      const document =

        await documentService
          .createDocument({

            name:

              file.originalname,

            fileUrl:

              uploaded.secure_url,

            category:

              req.body.category,

            employeeId:

              req.body.employeeId,

            tenantId:

              user.tenantId,

            uploadedById:

              user.id

          });

      return res.json({

        success: true,

        data: document

      });

    }

  );

  getDocumentById = asyncHandler(
    async (req: Request, res: Response) => {
      const document = await documentService.getDocumentById(req.params.id as string);
      return res.status(200).json(
        successResponse(document, "Document fetched successfully")
      );
    }
  );

  createDocument = asyncHandler(
    async (req: Request, res: Response) => {
      const user = (req as any).user;
      const document = await documentService.createDocument({ ...req.body, tenantId: user.tenantId, uploadedById: user.id, });
      return res.status(201).json(
        successResponse(document, "Document created successfully")
      );
    }
  );

  deleteDocument = asyncHandler(
    async (req: Request, res: Response) => {
      await documentService.deleteDocument(req.params.id as string);
      return res.status(200).json(
        successResponse(null, "Document deleted successfully")
      );
    }
  );
}

export default new DocumentController();