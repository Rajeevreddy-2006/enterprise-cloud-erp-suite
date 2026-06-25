import prisma from "../config/database";
import { CreatePaymentDto, UpdatePaymentDto, } from "../types/payment.types";

class PaymentRepository {

  async getAllPayments() {
    return prisma.payment.findMany({
      include: { invoice: true, tenant: true, },
    });
  }

  async getPaymentById(id: string) {
    return prisma.payment.findUnique({
      where: { id },
      include: { invoice: true, tenant: true, },
    });
  }

  async createPayment(data: any) {
    return prisma.payment.create({ data, });
  }

  async updatePayment(id: string,data: UpdatePaymentDto) {
    return prisma.payment.update({
      where: { id },
      data,
    });
  }

  async deletePayment(id: string) {
    return prisma.payment.delete({
      where: { id },
    });
  }
}

export default new PaymentRepository();