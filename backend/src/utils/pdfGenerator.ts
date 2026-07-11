// import PDFDocument from "pdfkit";

// export const generatePayslipPdf = (payroll: any) => {
//   const doc = new PDFDocument({size:"A4",margin:50});
//   const buffers: Buffer[] = [];
//   doc.on("data", buffers.push.bind(buffers));
//   return new Promise<Buffer>((resolve) => {
//     doc.on("end", () => {
//       resolve(Buffer.concat(buffers));
//     });
//     doc.fontSize(20).text("AMDOX ERP PAYSLIP");
//     doc.moveDown();
//     doc.fontSize(12)
//       .text( `Employee:${payroll.employee.user.name}` );
//     doc.text(`Month: ${payroll.month}/${payroll.year}`);
//     doc.moveDown();
//     doc.text(`Gross Salary: ₹${Number(payroll.grossSalary).toLocaleString()}`);
//     doc.text(`Deductions: ₹${Number(payroll.deductions).toLocaleString()}`);
//     doc.text(`Net Salary: ₹${Number(payroll.netSalary).toLocaleString()}`);
//     doc.text( `Status: ${payroll.status}` );
//     doc.end();
//   });
// };

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
        doc.text( `${index + 1}.${employee.user.name}` );
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
import PDFDocument from "pdfkit";

export async function generatePayrollPdf(payroll: any): Promise<Buffer> {
    return new Promise((resolve, reject) => {
        try {
            const doc = new PDFDocument({
                size: "A4",
                margin: 50
            });
            const buffers: Buffer[] = [];
            doc.on(
                "data",
                chunk => buffers.push(chunk)
            );
            doc.on(
                "end",
                () => resolve(
                    Buffer.concat(buffers)
                )
            );
            const months = [
                "January",
                "February",
                "March",
                "April",
                "May",
                "June",
                "July",
                "August",
                "September",
                "October",
                "November",
                "December"
            ];
            const monthName =
                months[
                    payroll.month - 1
                ];
            const gross =
                Number(
                    payroll.grossSalary
                ).toLocaleString();
            const deductions =
                Number(
                    payroll.deductions
                ).toLocaleString();
            const net =
                Number(
                    payroll.netSalary
                ).toLocaleString();
            /*
            =======================
            Header
            =======================
            */
            doc
                .fontSize(30)
                .font("Helvetica-Bold")
                .text(
                    "AMDOX ERP",
                    {
                        align:
                        "center"
                    }
                );
            doc.moveDown(0.4);
            doc.moveTo(
                50,
                90
            )
            .lineTo(
                545,
                90
            )
            .stroke();
            doc.moveDown(1);
            doc
                .fontSize(22)
                .font(
                    "Helvetica-Bold"
                )
                .text(
                    "PAYSLIP",
                    {
                        align:
                        "center"
                    }
                );
            doc.moveDown(2);
            /*
            =======================
            Employee Details
            =======================
            */
            doc
                .fontSize(16)
                .font(
                    "Helvetica-Bold"
                )
                .text(
                    "Employee Details"
                );
            doc.moveDown(0.5);
            doc
                .fontSize(12)
                .font(
                    "Helvetica"
                );
            doc.text(
                `Employee Name : ${payroll.employee.firstName} ${payroll.employee.lastName}`
            );
            doc.moveDown(0.3);
            doc.text(
                `Email : ${payroll.employee.email}`
            );
            doc.moveDown(0.3);
            doc.text(
                `Month : ${monthName}`
            );
            doc.moveDown(0.3);
            doc.text(
                `Year : ${payroll.year}`
            );
            doc.moveDown(2);
            /*
            =======================
            Salary Details
            =======================
            */
            doc
                .fontSize(16)
                .font(
                    "Helvetica-Bold"
                )
                .text(
                    "Salary Details"
                );
            doc.moveDown();
            const startX = 60;
            const startY =
                doc.y;
            const rowHeight =
                35;
            const col1 =
                320;
            const col2 =
                170;
            const rows = [
                [
                    "Gross Salary",
                    gross
                ],
                [
                    "Deductions",
                    deductions
                ],
                [
                    "Net Salary",
                    net
                ],
                [
                    "Status",
                    payroll.status
                ]
            ];
            doc.rect(
                startX,
                startY,
                col1 + col2,
                rowHeight
            )
            .stroke();
            doc.text(
                "DESCRIPTION",
                startX + 10,
                startY + 10
            );
            doc.text(
                "AMOUNT (INR)",
                startX + col1 + 20,
                startY + 10
            );
            rows.forEach(
                (row, index) => {
                    const y =
                        startY +
                        rowHeight *
                        (index + 1);
                    doc.rect(
                        startX,
                        y,
                        col1 + col2,
                        rowHeight
                    )
                    .stroke();
                    doc.text(
                        row[0],
                        startX + 10,
                        y + 10
                    );
                    doc.text(
                        String(
                            row[1]
                        ),
                        startX +
                        col1 +
                        20,
                        y + 10
                    );
                }
            );
            doc.moveDown(10);
            doc
                .fontSize(11)
                .fillColor(
                    "#555"
                )
                .text(
                    "This is a system generated payslip.",
                    {
                        align:
                        "center"
                    }
                );
            doc.end();
        } catch (error) {
            reject(
                error
            );
        }
    });
}