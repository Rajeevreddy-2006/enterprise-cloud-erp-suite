export interface Employee {
    id:string;
    employeeId:string;
    firstName:string;
    lastName:string;
    email:string;
    phone:string;
    designation:string;
    departmentId:string;
    tenantId:string;
    createdAt:string;
}

export interface CreateEmployeeDto{
    firstName:string;
    lastName:string;
    email:string;
    phone:string;
    designation:string;
    departmentId:string;
}

export interface UpdateEmployeeDto{
    firstName?:string;
    lastName?:string;
    email?:string;
    phone?:string;
    designation?:string;
    departmentId?:string;
}