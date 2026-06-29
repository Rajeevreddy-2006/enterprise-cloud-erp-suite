import assetRepository from "../repositories/asset.repository";
import notificationService from "./notification.service";
import auditLogService from "./auditLog.service";
import AppError from "../utils/AppError";
import { CreateAssetDto, UpdateAssetDto, AssignAssetDto, ReturnAssetDto, } from "../types/asset.types";

class AssetService {

  async getAllAssets() {
    return assetRepository.getAllAssets();
  }

  async getAssetById(id: string) {
    const asset = await assetRepository.getAssetById(id);
    if (!asset) {
      throw new AppError("Asset not found",404);
    }
    return asset;
  }

  async createAsset(data: CreateAssetDto) {
    const existing = await assetRepository.getAssetBySerialNumber(data.serialNumber);
    if (existing) {
      throw new AppError("Serial number already exists",400);
    }
    const assetCode = `AST-${Date.now()}`;
    const asset = await assetRepository.createAsset({
        assetCode,
        name: data.name,
        serialNumber: data.serialNumber,
        category: data.category,
        purchaseDate: data.purchaseDate,
        purchaseCost: data.purchaseCost,
        currentValue: data.purchaseCost,
        tenantId: data.tenantId,
    });
    await notificationService.createNotification({
      title: "Asset Created",
      message: `${asset.name} created successfully`,
      tenantId: asset.tenantId,
    });
    // await auditLogService.createLog({
    //   action: "CREATE",
    //   entity: "ASSET",
    //   entityId: asset.id,
    //   tenantId: asset.tenantId,
    // });
    return asset;
  }

  async updateAsset(id: string,data: UpdateAssetDto) {
    await this.getAssetById(id);
    if ( data.purchaseCost !== undefined && data.currentValue === undefined) {
      data.currentValue = data.purchaseCost;
    }
    return assetRepository.updateAsset(id,data);
  }

  async deleteAsset(id: string) {
    const asset = await this.getAssetById(id);
    // await auditLogService.createLog({
    //   action: "DELETE",
    //   entity: "ASSET",
    //   entityId: asset.id,
    //   tenantId: asset.tenantId,
    // });
    return assetRepository.deleteAsset(id);
  }

  async assignAsset(data: AssignAssetDto) {
    const asset = await assetRepository.getAssetById(data.assetId);
    if (!asset) {
      throw new AppError("Asset not found",404);
    }
    if (asset.status !== "AVAILABLE") {
      throw new AppError("Asset is not available for assignment",400);
    }
    const employee = await assetRepository.getEmployeeById(data.employeeId);
    if (!employee) {
      throw new AppError("Employee not found",404);
    }
    const activeAssignment = await assetRepository.getActiveAssignment(asset.id);
    if (activeAssignment) {
      throw new AppError("Asset already assigned",400);
    }
    const assignment = await assetRepository.assignAsset(asset.id,employee.id,asset.tenantId);
    await assetRepository.updateAssetStatus(asset.id,"ASSIGNED");
    await notificationService.createNotification({
      title: "Asset Assigned",
      message: `${asset.name} assigned to ${employee.firstName}`,
      tenantId: asset.tenantId,
    });
    // await auditLogService.createLog({
    //   action: "ASSIGN",
    //   entity: "ASSET",
    //   entityId: asset.id,
    //   tenantId: asset.tenantId,
    // });
    return assignment;
  }

  async returnAsset(data: ReturnAssetDto) {
    const assignment = await assetRepository.getAssignmentById(data.assignmentId);
    if (!assignment) {
      throw new AppError("Assignment not found",404);
    }
    const returnedAssignment = await assetRepository.returnAsset(assignment.id);
    await assetRepository.updateAssetStatus(assignment.assetId,"AVAILABLE");
    await notificationService.createNotification({
      title: "Asset Returned",
      message: "Asset returned successfully",
      tenantId: assignment.tenantId,
    });
    // await auditLogService.createLog({
    //   action: "RETURN",
    //   entity: "ASSET",
    //   entityId: assignment.assetId,
    //   userId: req.user!.id,
    //   tenantId: assignment.tenantId,
    // });
    return returnedAssignment;
  }

  async getAssetHistory(assetId: string) {
    await this.getAssetById(assetId);
    return assetRepository.getAssetAssignments(assetId);
  }
}

export default new AssetService();