export enum PayrollStatus{
    PENDING="PENDING",
    PROCESSED="PROCESSED",
    PAID="PAID"
}

export interface Payroll{
    id:string;
    employeeId:string;
    tenantId:string;
    month:number;
    year:number;
    grossSalary:number;
    deductions:number;
    netSalary:number;
    status:PayrollStatus;
    createdAt:string;
    updatedAt:string;
    employee?:{
        id:string;
        firstName:string;
        lastName:string;
    };
}

export interface CreatePayrollDto{
    employeeId:string;
    month:number;
    year:number;
    grossSalary:number;
    deductions:number;
    netSalary:number;
    status?:PayrollStatus;
}

export interface UpdatePayrollDto{
    grossSalary?:number;
    deductions?:number;
    netSalary?:number;
    status?:PayrollStatus;
}