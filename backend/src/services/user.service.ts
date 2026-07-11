import userRepository from "../repositories/user.repository";
import { CreateUserDto, UpdateUserDto, UpdateProfileDto } from "../types/user.types";
import { RoleType } from "../generated/prisma/enums";
import bcrypt from "bcrypt";

class UserService {

  async getAllUsers(tenantId: string,role: RoleType) {
    return userRepository.getAllUsers(tenantId,role);
  }

  async getUsers(tenantId:string){
    return userRepository.getUsers(tenantId);
  }

  async getUserById(id: string) {
    return userRepository.getUserById(id);
  }

  async createUser(data: CreateUserDto) {
    return userRepository.createUser({
        ...data,
    });
  }

  async updateProfile(id: string,data: UpdateProfileDto){
    return userRepository.updateProfile(id,data); 
  }

  async updateUser(id: string,data: UpdateUserDto) {
    return userRepository.updateUser(id, data);
  }

  async deleteUser(id: string) {
    return userRepository.deleteUser(id);
  }
}

export default new UserService();