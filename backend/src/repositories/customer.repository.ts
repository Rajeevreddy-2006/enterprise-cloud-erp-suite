import prisma from "../config/database";
import { CreateCustomerDto, UpdateCustomerDto, } from "../types/customer.types";

class CustomerRepository {

  async getAllCustomers(tenantId: string) {
    return prisma.customer.findMany({
      where: { tenantId, },
      include: { leads: true, opportunities: true, },
    });
  }

  async getCustomerById(id: string) {
    return prisma.customer.findUnique({
      where: { id },
      include: { leads: true, opportunities: true, },
    });
  }

  async getCustomerByEmail(email: string) {
    return prisma.customer.findFirst({
        where: {
            email,
        },
    });
  }

  async createCustomerFromInvitation(data: {
    name: string;
    email: string;
    phone: string;
    address: string;
    tenantId: string;
  }) {
    return prisma.customer.create({
      data: {
        name: data.name,
        email: data.email,
        phone: data.phone,
        address: data.address,
        tenantId: data.tenantId,
      },
    });
  }

  async createCustomer(data: CreateCustomerDto) {
    const {
        tenantId,
        ...customerData
    } = data;
    return prisma.customer.create({
        data: {
            ...customerData,
            tenant: {
                connect: {
                    id: tenantId!
                }
            }
        }
    });
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