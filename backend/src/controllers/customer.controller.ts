import { Request, Response } from "express";
import customerService from "../services/customer.service";
import { successResponse } from "../utils/apiResponse";
import { asyncHandler } from "../utils/asyncHandler";

class CustomerController {

  getAllCustomers = asyncHandler(
    async (req: Request, res: Response) => {
      const customers = await customerService.getAllCustomers();
      return res.status(200).json(
        successResponse(customers,"Customers fetched successfully")
      );
    }
  );

  getCustomerById = asyncHandler(
    async (req: Request, res: Response) => {
      const customer = await customerService.getCustomerById(req.params.id as string);
      return res.status(200).json(
        successResponse(customer,"Customer fetched successfully")
      );
    }
  );

  createCustomer = asyncHandler(
    async (req: Request, res: Response) => {
      const customer = await customerService.createCustomer(req.body);
      return res.status(201).json(
        successResponse(customer,"Customer created successfully")
      );
    }
  );

  updateCustomer = asyncHandler(
    async (req: Request, res: Response) => {
      const customer = await customerService.updateCustomer(req.params.id as string,req.body);
      return res.status(200).json(
        successResponse(customer,"Customer updated successfully")
      );
    }
  );

  deleteCustomer = asyncHandler(
    async (req: Request, res: Response) => {
      await customerService.deleteCustomer(req.params.id as string);
      return res.status(200).json(
        successResponse(null,"Customer deleted successfully")
      );
    }
  );
}

export default new CustomerController();