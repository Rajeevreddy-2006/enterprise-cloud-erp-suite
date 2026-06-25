import customerRepository from "../repositories/customer.repository";
import notificationService from "./notification.service";
import AppError from "../utils/AppError";
import { CreateCustomerDto, UpdateCustomerDto, } from "../types/customer.types";

class CustomerService {

  async getAllCustomers() {
    return customerRepository.getAllCustomers();
  }

  async getCustomerById(id: string) {
    const customer = await customerRepository.getCustomerById(id);
    if (!customer) {
      throw new AppError("Customer not found",404);
    }
    return customer;
  }

  async createCustomer(data: CreateCustomerDto) {
    const customer = await customerRepository.createCustomer(data);
    await notificationService.createNotification({
      title: "Customer Created",
      message: customer.name,
      tenantId: customer.tenantId,
    });
    return customer;
  }

  async updateCustomer(id: string,data: UpdateCustomerDto) {
    await this.getCustomerById(id);
    return customerRepository.updateCustomer(id,data);
  }

  async deleteCustomer(id: string) {
    await this.getCustomerById(id);
    return customerRepository.deleteCustomer(id);
  }
}

export default new CustomerService();