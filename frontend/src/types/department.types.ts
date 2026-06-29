export interface Department{
    id:string;
    name:string;
    tenantId:string;
    createdAt:string;
    updatedAt:string;
}

export interface CreateDepartmentDto{
    name:string;
}