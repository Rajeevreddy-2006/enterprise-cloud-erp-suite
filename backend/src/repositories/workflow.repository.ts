import prisma from "../config/database";

class WorkflowRepository {

    async getPendingNotifications(tenantId: string) {
        return prisma.notification.findMany({
            where: { tenantId, isRead: false, },
        });
    }
}

export default new WorkflowRepository();