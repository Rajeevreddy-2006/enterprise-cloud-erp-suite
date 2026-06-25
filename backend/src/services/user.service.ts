import userRepository from "../repositories/user.repository";
import { CreateUserDto, UpdateUserDto, } from "../types/user.types";
import { RoleType } from "../generated/prisma/enums";
import bcrypt from "bcrypt";

class UserService {

  async getAllUsers(tenantId: string,role: RoleType) {
    return userRepository.getAllUsers(tenantId,role);
  }

  async getUserById(id: string) {
    return userRepository.getUserById(id);
  }

  async createUser(data: CreateUserDto) {
    const hashedPassword = await bcrypt.hash(data.password,10);
    return userRepository.createUser({
        ...data,
        password: hashedPassword,
    });
  }

  async updateUser(id: string,data: UpdateUserDto) {
    return userRepository.updateUser(id, data);
  }

  async deleteUser(id: string) {
    return userRepository.deleteUser(id);
  }
}

export default new UserService();