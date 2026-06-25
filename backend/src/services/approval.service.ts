import approvalRepository from "../repositories/approval.repository";
import AppError from "../utils/AppError";

class ApprovalService {

  async getAllRequests() {
    return approvalRepository.getAllRequests();
  }

  async getRequestById(id: string) {
    const request = await approvalRepository.getRequestById(id);
    if (!request) {
      throw new AppError("Approval request not found",404);
    }
    return request;
  }

  async createRequest(data: any) {
    return approvalRepository.createRequest(data);
  }

  async approveRequest(id: string,approvedById: string,remarks?: string) {
    await this.getRequestById(id);
    return approvalRepository.updateRequest(id,{ status: "APPROVED", approvedById, remarks, });
  }

  async rejectRequest(id: string,approvedById: string,remarks?: string) {
    await this.getRequestById(id);
    return approvalRepository.updateRequest(id,{ status: "REJECTED", approvedById, remarks, });
  }
}

export default new ApprovalService();