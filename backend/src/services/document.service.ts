import documentRepository from "../repositories/document.repository";
import AppError from "../utils/AppError";
import { CreateDocumentDto } from "../types/document.types";

class DocumentService {

  async getAllDocuments() {
    return documentRepository.getAllDocuments();
  }

  async getDocumentById(id: string) {
    const document = await documentRepository.getDocumentById(id);
    if (!document) {
      throw new AppError("Document not found",404);
    }
    return document;
  }

  async createDocument(data: CreateDocumentDto) {
    return documentRepository.createDocument(data);
  }

  async deleteDocument(id: string) {
    await this.getDocumentById(id);
    return documentRepository.deleteDocument(id);
  }
}

export default new DocumentService();