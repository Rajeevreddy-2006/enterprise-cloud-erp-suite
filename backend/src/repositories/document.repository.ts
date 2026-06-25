import prisma from "../config/database";
import { CreateDocumentDto } from "../types/document.types";

class DocumentRepository {

  async getAllDocuments() {
    return prisma.document.findMany({
      include: { tenant: true, uploadedBy: true, },
    });
  }

  async getDocumentById(id: string) {
    return prisma.document.findUnique({
      where: { id },
    });
  }

  async createDocument(data: CreateDocumentDto) {
    return prisma.document.create({ data, });
  }

  async deleteDocument(id: string) {
    return prisma.document.delete({
      where: { id },
    });
  }
}

export default new DocumentRepository();