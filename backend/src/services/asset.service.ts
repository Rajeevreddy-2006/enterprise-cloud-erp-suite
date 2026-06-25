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
        const asset = await assetRepository.createAsset(data);
        await notificationService.createNotification({
            title: "Asset Created",
            message: `${asset.name} created`,
            tenantId: asset.tenantId,
        });
        return asset;
    }

    async updateAsset(id: string,data: UpdateAssetDto) {
        await this.getAssetById(id);
        return assetRepository.updateAsset(id,data);
    }

    async deleteAsset(id: string) {
        await this.getAssetById(id);
        return assetRepository.deleteAsset(id);
    }

    async assignAsset(data: AssignAssetDto) {
        const asset = await assetRepository.getAssetById(data.assetId);
        if (!asset) {
            throw new AppError("Asset not found",404);
        }
        const employee = await assetRepository.getEmployeeById(data.employeeId);
        if (!employee) {
            throw new AppError("Employee not found",404);
        }
        const activeAssignment = await assetRepository.getActiveAssignment(data.assetId);
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
        return assignment;
    }

    async returnAsset(data: ReturnAssetDto) {
        const assignment = await assetRepository.getAssignmentById(data.assignmentId);
        if (!assignment) {
            throw new AppError("Assignment not found",404);
        }
        const returnedAssignment = await assetRepository.returnAsset(assignment.id);
        await assetRepository.updateAssetStatus(assignment.assetId,"AVAILABLE");
        return returnedAssignment;
    }

    async getAssetHistory(assetId: string) {
        await this.getAssetById(assetId);
        return assetRepository.getAssetAssignments(assetId);
    }
}

export default new AssetService();