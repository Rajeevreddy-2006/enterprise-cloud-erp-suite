export interface Department {
    id: string;
    name: string;

    createdAt: string;
    updatedAt: string;

    _count?: {
        employees: number;
    };
}

export interface CreateDepartmentDto {
    name:string;
    description?:string;
    tenantId:string;
}

export interface UpdateDepartmentDto {
    name?:string;
    description?:string;
}