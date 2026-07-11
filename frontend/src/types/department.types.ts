export interface Department {
    id: string;
    name: string;

    createdAt: string;
    updatedAt: string;

    _count?: {
        employees: number;
    };
}

export interface CreateDepartmentDto{
    name:string;
}