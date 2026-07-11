import prisma from "../config/database";
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
import emailService from "./email.service";
import { ForgotPasswordDto, ResetPasswordDto , ChangePasswordDto } from "../types/auth.types";
import { InviteUserDto, AcceptInviteDto } from "../types/invite.types";
import employeeRepository from "../repositories/employee.repository";
import departmentRepository from "../repositories/department.repository";

class AuthService {
  async login(data: LoginDto) {
    const user = await userRepository.getUserByEmail(data.email);
    if (!user) {
        throw new AppError("Invalid email or password",401);
    }
    if(!user.isVerified){
      throw new AppError("Account not activated",403);
    }
    if(!user.password){
      throw new AppError("Account not activated",400);
    }
    const isPasswordValid = await bcrypt.compare(data.password,user.password);
    if (!isPasswordValid) {
        throw new AppError(
            "Invalid email or password",
            401
        );
    }
    const accessToken = generateAccessToken({
            id: user.id,
            email: user.email,
            role: user.role,
            tenantId: user.tenantId
        });
    const refreshToken = generateRefreshToken({id: user.id});
    await userRepository.updateRefreshToken(
        user.id,
        refreshToken
    );
    return {
        user: {
            id: user.id,
            name: user.name,
            email: user.email,
            role: user.role,
            tenantId: user.tenantId,
            companyName: user.tenant.name,
            companySlug: user.tenant.slug,
            createdAt: user.createdAt
        },
        accessToken,
        refreshToken
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
      role: RoleType.SUPER_ADMIN,
      isVerified:true
    });
    return {
      tenantId: tenant.id,
      userId: user.id,
      email: user.email,
      role: user.role
    };
  }

  async changePassword(userId: string,data: ChangePasswordDto){
    const user = await userRepository.getUserById(userId);
    if(!user){
      throw new AppError("User not found",404);
    }
    if(!user.password){
      throw new AppError("Account not activated",400);
    }
    const valid = await bcrypt.compare(data.currentPassword,user.password);
    if(!valid){
        throw new AppError("Current password incorrect",400);
    }
    const hash = await bcrypt.hash(data.newPassword,10);
    await userRepository.changePassword(userId,hash);
    return {success:true};
  }

  async inviteUser(tenantId: string,data: InviteUserDto){
    const exists = await userRepository.getUserByEmail(data.email);
    if(exists){
      throw new AppError("User already exists",400);
    }
    const token = crypto.randomBytes(32).toString("hex");
    const expiry = new Date(Date.now()+24*60*60*1000);
    const user = await userRepository
    .createInvitedUser({
        name:data.name,
        email:data.email,
        password:null,
        tenantId,
        role:data.role,
        designation: data.designation,
        inviteToken:token,
        inviteExpiresAt:expiry,
        isVerified:false
    });
    const link = `${process.env.FRONTEND_URL}/accept-invite/${token}`;
    console.log("User created");

    console.log("Sending email...");

    await emailService.sendInvitation(
      data.email,
      data.name,
      link
    );

    console.log("Email sent");
    return{
        success:true
    };
  }

  async acceptInvite(data:AcceptInviteDto){
    const user = await userRepository.getUserByInviteToken(data.token);
    if(!user){
      throw new AppError("Invalid invitation",400);
    }
    if(!user.inviteExpiresAt || user.inviteExpiresAt < new Date()){
      throw new AppError("Invitation expired",400);
    }
    const hash = await bcrypt.hash(data.password,10);
    await userRepository.activateUser(user.id,hash);
    const department = await departmentRepository.getFirstDepartmentByTenantId(user.tenantId);
    if(!department){
      throw new AppError("Department not found",400);
    }
    const existingEmployee = await prisma.employee.findUnique({
      where:{ userId:user.id }
    });
    if(!existingEmployee){
        const names = user.name.split(" ");
        const firstName = names[0];
        const lastName = names.slice(1).join(" ");
        await employeeRepository.createEmployee({
                firstName,
                lastName,
                email:user.email,
                userId:user.id,
                tenantId:user.tenantId,
                departmentId:department.id
            });
    }
    return{ success:true };
}

  async resendInvite(id:string){
    const user = await userRepository.getUserById(id);
    const token = crypto.randomBytes(32).toString("hex");
    const expiry = new Date(Date.now() + 86400000);
    await userRepository.updateInvite(id,token,expiry);
    const link = `${process.env.FRONTEND_URL}/accept-invite/${token}`;
    if(!user){
      throw new AppError("User not found",404);
    }
    await emailService.sendInvitation(user.email,user.name,link);
    return { success: true };
  }

  async refreshAccessToken(refreshToken: string) {
    console.log("refresh token from service");
    console.log(refreshToken);
    const payload = verifyRefreshToken(refreshToken) as { id: string; };
    console.log(payload);
    const user = await userRepository.getUserById(payload.id);
    console.log(user);
    if (!user || user.refreshToken !== refreshToken) {
        throw new AppError("Invalid refresh token",401);
    }
    const accessToken = generateAccessToken({ id: user.id, email: user.email, role: user.role, tenantId: user.tenantId, });
    console.log(accessToken);
    console.log("generated");
    return { accessToken, };
  }

  async forgotPassword(data:ForgotPasswordDto){
   const user = await userRepository.getUserByEmail(data.email);
   if(!user){
    throw new AppError("User not found",404);
   }
   const token = crypto.randomBytes(32).toString("hex");
   const expiry = new Date(Date.now()+1000*60*30);
   await userRepository.saveResetToken(
      user.id,
      token,
      expiry
   );
   const resetLink = `${process.env.FRONTEND_URL}/reset-password/${token}`;
   console.log(resetLink);
   await emailService.sendEmail(
   user.email,
   "Reset Password",
   `
   <h2>Reset Password</h2>
   <p>Click below</p>
   <a href="${resetLink}">
      Reset Password
   </a>
   `
  );
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