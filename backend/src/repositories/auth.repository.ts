import prisma from "../config/database";

class AuthRepository {

  async getUserByEmail(email: string) {
    return prisma.user.findUnique({
      where: { email },
    });
  }

  async getUserById(id: string) {
    return prisma.user.findUnique({
      where: { id },
    });
  }

  async getTenantBySlug(slug:string){
    return prisma.tenant.findUnique({
      where:{ slug }
    });
  }

  async updateResetToken(userId:string,resetToken:string){
    return prisma.user.update({
        where:{ id:userId },
        data:{
            resetToken,
            resetTokenExpiresAt: new Date(Date.now()+1000*60*15)
        }
    });
  }

  async getUserByResetToken(token:string){
    return prisma.user.findFirst({
        where:{
            resetToken:token,
            resetTokenExpiresAt:{ gt:new Date() }
        }
    });
  }

  async updatePassword(userId:string,password:string){
    return prisma.user.update({
        where:{ id:userId },
        data:{
            password,
            resetToken:null,
            resetTokenExpiresAt:null
        }
    });
  }

  async updateRefreshToken(userId: string,refreshToken: string | null) {
    return prisma.user.update({
      where: { id: userId },
      data: { refreshToken },
    });
  }
}

export default new AuthRepository();