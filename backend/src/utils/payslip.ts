export const buildPayslip = (payroll: any) => {
  return {
    employeeName: `${payroll.employee.firstName} ${payroll.employee.lastName}`,
    month: payroll.month,
    year: payroll.year,
    grossSalary: payroll.grossSalary,
    deductions: payroll.deductions,
    netSalary: payroll.netSalary,
    status: payroll.status,
  };
};