import { RoleType } from "../generated/prisma/enums";

declare global {
  namespace Express {
    interface User {
      id: string;
      email: string;
      role: RoleType;
      tenantId: string;
    }

    interface Request {
      user: User;
      file?: any;
    }
  }
}

export {};