export const payrollPaidTemplate = (employeeName: string,month: number,year: number) =>
 `
<h2>Salary Credited</h2>

<p>Hello ${employeeName},</p>

<p>Your salary for ${month}/${year} has been processed successfully.</p>

<p>Regards,<br/>Amdox ERP</p>
`;