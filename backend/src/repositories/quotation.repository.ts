import prisma from "../config/database";
import { CreateQuotationDto, UpdateQuotationDto, } from "../types/quotation.types";

class QuotationRepository {

  async getAllQuotations() {
    return prisma.quotation.findMany({
      include: { customer: true, opportunity: true, },
    });
  }

  async getQuotationById(id: string) {
    return prisma.quotation.findUnique({
      where: { id },
      include: { customer: true, opportunity: true, },
    });
  }

  async getQuotationByNumber(quotationNumber: string) {
    return prisma.quotation.findUnique({
      where: { quotationNumber, },
    });
  }

  async createQuotation(data: CreateQuotationDto) {
    return prisma.quotation.create({ data, });
  }

  async updateQuotation(id: string,data: UpdateQuotationDto) {
    return prisma.quotation.update({
      where: { id },
      data,
    });
  }

  async deleteQuotation(id: string) {
    return prisma.quotation.delete({
      where: { id },
    });
  }
}

export default new QuotationRepository();