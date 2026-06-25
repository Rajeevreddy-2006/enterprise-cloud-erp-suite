import ExcelJS from "exceljs";

export const generateEmployeeExcel =
  async (employees: any[]) => {
    const workbook = new ExcelJS.Workbook();
    const worksheet = workbook.addWorksheet("Employees");
    worksheet.columns = [
      {
        header: "First Name",
        key: "firstName",
        width: 20,
      },
      {
        header: "Last Name",
        key: "lastName",
        width: 20,
      },
      {
        header: "Email",
        key: "email",
        width: 30,
      },
      {
        header: "Department",
        key: "department",
        width: 25,
      },
    ];
    employees.forEach(
      (employee) => {
        worksheet.addRow({
          firstName: employee.firstName,
          lastName: employee.lastName,
          email: employee.email,
          department: employee.department.name,
        });
      }
    );
    return workbook.xlsx.writeBuffer();
  };

  export const generatePayrollExcel =
  async (payrolls: any[]) => {
    const workbook = new ExcelJS.Workbook();
    const worksheet = workbook.addWorksheet("Payrolls");
    worksheet.columns = [
      {
        header: "Employee",
        key: "employee",
        width: 30,
      },
      {
        header: "Month",
        key: "month",
        width: 10,
      },
      {
        header: "Year",
        key: "year",
        width: 10,
      },
      {
        header: "Net Salary",
        key: "netSalary",
        width: 20,
      },
    ];
    payrolls.forEach(
      (payroll) => {
        worksheet.addRow({
          employee: `${payroll.employee.firstName} ${payroll.employee.lastName}`,
          month: payroll.month,
          year: payroll.year,
          netSalary: payroll.netSalary,
        });
      }
    );
    return workbook.xlsx.writeBuffer();
  };

  export const generateInventoryExcel =
  async (items: any[]) => {
    const workbook = new ExcelJS.Workbook();
    const worksheet = workbook.addWorksheet("Inventory");
    worksheet.columns = [
      {
        header: "Name",
        key: "name",
        width: 30,
      },
      {
        header: "Quantity",
        key: "quantity",
        width: 15,
      },
      {
        header: "Unit Price",
        key: "unitPrice",
        width: 20,
      },
    ];
    items.forEach(
      (item) => {
        worksheet.addRow({
          name: item.name,
          quantity: item.quantity,
          unitPrice: item.unitPrice,
        });
      }
    );
    return workbook.xlsx.writeBuffer();
  };