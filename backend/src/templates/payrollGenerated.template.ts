export const payrollGeneratedTemplate = (employeeName: string,month: number,year: number) =>
 `
<h2>Payroll Generated</h2>

<p>Hello ${employeeName},</p>

<p>Your payroll for ${month}/${year} has been generated.</p>

<p>Please login to Amdox ERP to view details.</p>

<p>Regards,<br/>Amdox ERP</p>
`;