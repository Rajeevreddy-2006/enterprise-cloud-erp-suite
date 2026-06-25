import PDFDocument from "pdfkit";

export const generatePayslipPdf = (payroll: any) => {
  const doc = new PDFDocument();
  const buffers: Buffer[] = [];
  doc.on("data", buffers.push.bind(buffers));
  return new Promise<Buffer>((resolve) => {
    doc.on("end", () => {
      resolve(Buffer.concat(buffers));
    });
    doc.fontSize(20).text("AMDOX ERP PAYSLIP");
    doc.moveDown();
    doc.fontSize(12)
      .text( `Employee: ${payroll.employee.firstName} ${payroll.employee.lastName}` );
    doc.text( `Month: ${payroll.month}` );
    doc.text( `Year: ${payroll.year}` );
    doc.moveDown();
    doc.text( `Gross Salary: ₹${payroll.grossSalary}` );
    doc.text( `Deductions: ₹${payroll.deductions}` );
    doc.text( `Net Salary: ₹${payroll.netSalary}` );
    doc.text( `Status: ${payroll.status}` );
    doc.end();
  });
};

export const generateEmployeeReportPdf = (employees: any[]) => {
  const doc = new PDFDocument();
  const buffers: Buffer[] = [];
  doc.on("data",buffers.push.bind(buffers));
  return new Promise<Buffer>(
    (resolve) => {
      doc.on("end",() => resolve(Buffer.concat(buffers)));
      doc.fontSize(20)
        .text("AMDOX ERP EMPLOYEE REPORT");
      doc.moveDown();
      employees.forEach((employee, index) => {
        doc.text( `${index + 1}. ${employee.firstName} ${employee.lastName}` );
        doc.text( `Email: ${employee.email}` );
        doc.text( `Department: ${employee.department.name}` );
        doc.moveDown();
      });
      doc.end();
    }
  );
};

export const generatePayrollReportPdf = (payrolls: any[]) => {
  const doc = new PDFDocument();
  const buffers: Buffer[] = [];
  doc.on("data",buffers.push.bind(buffers));
  return new Promise<Buffer>(
    (resolve) => {
      doc.on("end",() => resolve(Buffer.concat(buffers)));
      doc.fontSize(20)
        .text("AMDOX ERP PAYROLL REPORT");
      doc.moveDown();
      payrolls.forEach(
        (payroll) => {
          doc.text( `${payroll.employee.firstName} ${payroll.employee.lastName}` );
          doc.text( `Month: ${payroll.month}/${payroll.year}` );
          doc.text( `Net Salary: ₹${payroll.netSalary}` );
          doc.moveDown();
        }
      );
      doc.end();
    }
  );
};

export const generateInventoryReportPdf = (items: any[]) => {
  const doc = new PDFDocument();
  const buffers: Buffer[] = [];
  doc.on("data",buffers.push.bind(buffers));
  return new Promise<Buffer>(
    (resolve) => {
      doc.on("end",() => resolve(Buffer.concat(buffers)));
      doc.fontSize(20)
        .text("AMDOX ERP INVENTORY REPORT");
      doc.moveDown();
      items.forEach(
        (item) => {
          doc.text(item.name);
          doc.text( `Quantity: ${item.quantity}` );
          doc.text( `Unit Price: ₹${item.unitPrice}` );
          doc.moveDown();
        }
      );
      doc.end();
    }
  );
};