export interface SalaryStructure{
    id:string;
    employeeId:string;
    tenantId:string;
    basicSalary:number;
    hra:number;
    bonus:number;
    pfPercentage:number;
    taxPercentage:number;
    employee?:{
    id:string;
    firstName:string;
    lastName:string;
    };
    createdAt:string;
    updatedAt:string;
}

export interface CreateSalaryStructureDto{
    employeeId:string;
    basicSalary:number;
    hra:number;
    bonus:number;
    pfPercentage:number;
    taxPercentage:number;
}

export interface UpdateSalaryStructureDto{
    basicSalary?:number;
    hra?:number;
    bonus?:number;
    pfPercentage?:number;
    taxPercentage?:number;
}