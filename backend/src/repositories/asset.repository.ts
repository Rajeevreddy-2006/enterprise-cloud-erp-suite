import prisma from "../config/database";
import { CreateAssetDto, UpdateAssetDto, } from "../types/asset.types";
import { AssetStatus } from "../generated/prisma/enums";

class AssetRepository {

  async getAllAssets() {
    return prisma.asset.findMany({
      include: { assignments: true, tenant: true, },
    });
  }

  async getAssetById(id: string) {
    return prisma.asset.findUnique({
      where: { id },
      include: { assignments: true, tenant: true, },
    });
  }

  async createAsset(data: CreateAssetDto) {
    return prisma.asset.create({data,});
  }

  async updateAsset(id: string,data: UpdateAssetDto) {
    return prisma.asset.update({
      where: { id },
      data,
    });
  }

  async deleteAsset(id: string) {
    return prisma.asset.delete({
      where: { id },
    });
  }

  async getEmployeeById(employeeId: string) {
    return prisma.employee.findUnique({
        where: { id: employeeId },
    });
  }

  async getActiveAssignment(assetId: string) {
    return prisma.assetAssignment.findFirst({
        where: { assetId, returnedAt: null, },
    });
  }

  async assignAsset(assetId: string,employeeId: string,tenantId: string) {
    return prisma.assetAssignment.create({
        data: { assetId, employeeId, tenantId,},
    });
  }

  async returnAsset(assignmentId: string) {
    return prisma.assetAssignment.update({
        where: { id: assignmentId, },
        data: { returnedAt: new Date(), },
    });
  }

  async getAssignmentById(id: string) {
    return prisma.assetAssignment.findUnique({
        where: { id },
    });
  }

  async updateAssetStatus(id: string, status: AssetStatus) {
    return prisma.asset.update({
        where: { id },
        data: { status },
    });
  }

  async getAssetAssignments(assetId: string) {
    return prisma.assetAssignment.findMany({
        where: { assetId },
        include: { employee: true, },
        orderBy: { assignedAt: "desc", },
    });
  }
}

export default new AssetRepository();