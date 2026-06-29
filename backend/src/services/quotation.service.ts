import quotationRepository from "../repositories/quotation.repository";
import customerRepository from "../repositories/customer.repository";
import opportunityRepository from "../repositories/opportunity.repository";
import AppError from "../utils/AppError";
import { CreateQuotationDto, UpdateQuotationDto, } from "../types/quotation.types";

class QuotationService {

  async getAllQuotations() {
    return quotationRepository.getAllQuotations();
  }

  async getQuotationById(id: string) {
    const quotation = await quotationRepository.getQuotationById(id);
    if (!quotation) {
      throw new AppError("Quotation not found",404);
    }
    return quotation;
  }

  async createQuotation(data: CreateQuotationDto) {
    const existing = await quotationRepository.getQuotationByNumber(data.quotationNumber);
    if (existing) {
      throw new AppError("Quotation number already exists",400);
    }
    const customer = await customerRepository.getCustomerById(data.customerId);
    if (!customer) {
      throw new AppError("Customer not found",404);
    }
    if (data.opportunityId) {
      const opportunity = await opportunityRepository.getOpportunityById(data.opportunityId);
      if (!opportunity) {
        throw new AppError("Opportunity not found",404);
      }
    }
    if (data.validUntil < new Date()) {
      throw new AppError("Valid until date cannot be in the past",400);
    }
    return quotationRepository.createQuotation(data);
  }

  async updateQuotation(id: string,data: UpdateQuotationDto) {
    await this.getQuotationById(id);
    return quotationRepository.updateQuotation(id,data);
  }

  async deleteQuotation(id: string) {
    await this.getQuotationById(id);
    return quotationRepository.deleteQuotation(id);
  }
}

export default new QuotationService();