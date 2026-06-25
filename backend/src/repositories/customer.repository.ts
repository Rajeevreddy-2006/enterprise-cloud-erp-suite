import prisma from "../config/database";
import { CreateCustomerDto, UpdateCustomerDto, } from "../types/customer.types";

class CustomerRepository {

  async getAllCustomers() {
    return prisma.customer.findMany({
      include: { leads: true, opportunities: true, },
    });
  }

  async getCustomerById(id: string) {
    return prisma.customer.findUnique({
      where: { id },
      include: { leads: true, opportunities: true, },
    });
  }

  async createCustomer(data: CreateCustomerDto) {
    return prisma.customer.create({ data, });
  }

  async updateCustomer(id: string,data: UpdateCustomerDto) {
    return prisma.customer.update({
      where: { id },
      data,
    });
  }

  async deleteCustomer(id: string) {
    return prisma.customer.delete({
      where: { id },
    });
  }
}

export default new CustomerRepository();