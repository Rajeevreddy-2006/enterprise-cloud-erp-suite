import bcrypt from "bcrypt";
import { generateAccessToken,generateRefreshToken,verifyRefreshToken, } from "../utils/jwt";
import userRepository from "../repositories/user.repository";
import { LoginDto } from "../types/auth.types";
import AppError from "../utils/AppError";

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

  async refreshAccessToken(refreshToken: string) {
    const payload = verifyRefreshToken(refreshToken) as { id: string; };
    const user = await userRepository.getUserById(payload.id);
    if (!user || user.refreshToken !== refreshToken) {
        throw new AppError("Invalid refresh token",401);
    }
    const accessToken = generateAccessToken({ id: user.id, email: user.email, role: user.role, tenantId: user.tenantId, });
    return { accessToken, };
  }

  async logout(userId: string) {
    await userRepository.updateRefreshToken(userId,null);
    return { message: "Logout successful", };
  }
}

export default new AuthService();