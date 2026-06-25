import notificationService from "./notification.service";
import auditLogService from "./auditLog.service";

class WorkflowService {

  async onLeaveApproved(employeeName: string,tenantId: string) {
    await notificationService.createNotification({
      title: "Leave Approved",
      message: `${employeeName}'s leave approved`,
      tenantId,
    });
  }

  async onInvoicePaid(invoiceNumber: string,tenantId: string) {
    await notificationService.createNotification({
      title: "Invoice Paid",
      message: invoiceNumber,
      tenantId,
    });
  }

  async onPayrollGenerated(employeeName: string,tenantId: string) {
    await notificationService.createNotification({
      title: "Payroll Generated",
      message: employeeName,
      tenantId,
    });
  }

  async onExpenseCreated(expenseTitle: string,tenantId: string) {
    await notificationService.createNotification({
        title: "Expense Created",
        message: expenseTitle,
        tenantId,
    });
  }

  async onExpenseApproved(expenseTitle: string,tenantId: string) {
    await notificationService.createNotification({
        title: "Expense Approved",
        message: expenseTitle,
        tenantId,
    });
  }
}

export default new WorkflowService();