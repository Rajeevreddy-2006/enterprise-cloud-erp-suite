import bcrypt from "bcryptjs";
import { generateAccessToken,generateRefreshToken,verifyRefreshToken, } from "../utils/jwt";
import userRepository from "../repositories/user.repository";
import { LoginDto,RegisterDto } from "../types/auth.types";
import AppError from "../utils/AppError";
import authRepository from "../repositories/auth.repository";
import tenantService from "./tenant.service";
import userService from "./user.service";
import { RoleType } from "../generated/prisma/enums";
import crypto from "crypto";
import { ForgotPasswordDto, ResetPasswordDto } from "../types/auth.types";

class AuthService {
  async login(data: LoginDto) {
    const user = await userRepository.getUserByEmail(data.email);
    if (!user) {
        throw new AppError("Invalid email or password",401);
    }
    const isPasswordValid = await bcrypt.compare(data.password,user.password);
    if (!isPasswordValid) {
        throw new AppError("Invalid email or password",401);
    }
    const accessToken = generateAccessToken({ id: user.id,email: user.email, role: user.role, tenantId: user.tenantId, });
    const refreshToken = generateRefreshToken({ id: user.id, });
    await userRepository.updateRefreshToken( user.id, refreshToken );
    return {
        user: {
        id: user.id,
        name: user.name,
        email: user.email,
        role: user.role,
        tenantId: user.tenantId,
        },
        accessToken,
        refreshToken,
    };
  }

  async register(data:RegisterDto){
    const existingUser = await authRepository.getUserByEmail(data.email);
    if(existingUser){
      throw new AppError("User already exists",409);
    }
    const existingTenant = await authRepository.getTenantBySlug(data.companySlug);
    if(existingTenant){
      throw new AppError("Tenant slug already exists",409);
    }
    const tenant = await tenantService.createTenant({
      name: data.companyName,
      slug: data.companySlug
    });
    const hashedPassword = await bcrypt.hash(data.password,10);
    const user = await userService.createUser({
      name: data.adminName,
      email: data.email,
      password: hashedPassword,
      tenantId: tenant.id,
      role: RoleType.SUPER_ADMIN
    });
    return {
      tenantId: tenant.id,
      userId: user.id,
      email: user.email,
      role: user.role
    };
  }

  async refreshAccessToken(refreshToken: string) {
    const payload = verifyRefreshToken(refreshToken) as { id: string; };
    const user = await userRepository.getUserById(payload.id);
    if (!user || user.refreshToken !== refreshToken) {
        throw new AppError("Invalid refresh token",401);
    }
    const accessToken = generateAccessToken({ id: user.id, email: user.email, role: user.role, tenantId: user.tenantId, });
    return { accessToken, };
  }

  async forgotPassword(email:string){
    const user = await authRepository.getUserByEmail(email);
    if(!user){
      throw new AppError("User not found",404);
    }
    const token = crypto.randomBytes(32).toString("hex");
    await authRepository.updateResetToken( user.id, token );
    return{ token };
  }

  async resetPassword(data:ResetPasswordDto){
    const user = await authRepository.getUserByResetToken(data.token);
    if(!user){
      throw new AppError("Invalid token",400);
    }
    const hashedPassword = await bcrypt.hash(data.password,10);
    await authRepository.updatePassword(user.id,hashedPassword);
    return{ success:true };
  }

  async logout(userId: string) {
    await userRepository.updateRefreshToken(userId,null);
    return { message: "Logout successful", };
  }
}

export default new AuthService();