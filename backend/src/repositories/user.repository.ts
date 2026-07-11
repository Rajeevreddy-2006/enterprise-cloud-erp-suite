import prisma from "../config/database";
import { CreateUserDto, UpdateUserDto, UpdateProfileDto } from "../types/user.types";
import { RoleType } from "../generated/prisma/enums";

class UserRepository {

  async getAllUsers(tenantId: string, role: RoleType) {
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

  async getUsers(tenantId: string) {
    return prisma.user.findMany({
      where: { tenantId },
      select: {
        id: true,
        name: true,
        email: true,
        role: true,
        designation: true,
        isVerified: true,
        createdAt: true
      },
      orderBy: {
        createdAt: "desc"
      }
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

  async updateRefreshToken(userId: string, refreshToken: string | null) {
    return prisma.user.update({
      where: { id: userId, },
      data: { refreshToken, },
    });
  }

  async updateProfile(id: string, data: UpdateProfileDto) {
    return prisma.user.update({
      where: { id },
      data,
      include: { tenant: true }
    });
  }

  async changePassword(userId: string, password: string) {
    return prisma.user.update({
      where: { id: userId },
      data: { password }
    });
  }

  async createInvitedUser(data: any) {
    return prisma.user.create({ data });
  }

  async getUserByInviteToken(token: string) {
    return prisma.user.findFirst({
      where: { inviteToken: token },
      include: { tenant: true }
    });
  }

  async saveResetToken(
    id: string,
    token: string,
    expiry: Date
  ) {
    return prisma.user.update({
      where: { id },
      data: {
        resetToken: token,
        resetTokenExpiresAt: expiry
      }
    });
  }

  async updatePassword(id:string,password:string){
   return prisma.user.update({
      where:{ id },
      data:{
         password,
         resetToken:null,
         resetExpiresAt:null
      }
   });
  }

  async updateInvite(
    id: string,
    token: string,
    expiry: Date
  ) {
    return prisma.user.update({
      where: { id },
      data: {
        inviteToken: token,
        inviteExpiresAt: expiry
      }
    });
  }

  async activateUser(userId: string, password: string) {
    return prisma.user.update({
      where: { id: userId },
      data: {
        password,
        isVerified: true,
        inviteToken: null,
        inviteExpiresAt: null
      }
    });
  }

  async updateUser(id: string, data: UpdateUserDto) {
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