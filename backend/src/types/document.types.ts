import { DocumentCategory } from "../generated/prisma/enums";

export interface CreateDocumentDto {
  name: string;
  fileUrl: string;
  category: DocumentCategory;
  tenantId: string;
  uploadedById?: string;
  employeeId?:string;
}