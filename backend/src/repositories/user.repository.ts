import prisma from "../config/database";
import { CreateUserDto, UpdateUserDto, } from "../types/user.types";
import { RoleType } from "../generated/prisma/enums";

class UserRepository {

  async getAllUsers(tenantId: string,role: RoleType) {
    if (role === "SUPER_ADMIN") {
        return prisma.user.findMany({
            include: { tenant: true, },
        });
    }
    return prisma.user.findMany({
        where: { tenantId, },
        include: { tenant: true, },
    });
  }

  async getUserById(id: string) {
    return prisma.user.findUnique({
      where: { id },
      include: { tenant: true, },
    });
  }

  async getUserByEmail(email: string) {
    return prisma.user.findUnique({
        where: { email },
        include: { tenant: true, },
    });
  }

  async createUser(data: CreateUserDto) {
    return prisma.user.create({
      data,
      include: { tenant: true, },
    });
  }

  async updateRefreshToken(userId: string,refreshToken: string | null) {
    return prisma.user.update({
        where: { id: userId, },
        data: { refreshToken, },
    });
  }

  async updateUser(id: string,data: UpdateUserDto) {
    return prisma.user.update({
      where: { id },
      data,
      include: { tenant: true, },
    });
  }

  async deleteUser(id: string) {
    return prisma.user.delete({
      where: { id },
    });
  }
}

export default new UserRepository();