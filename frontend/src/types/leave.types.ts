export enum LeaveType{
    SICK="SICK",
    CASUAL="CASUAL",
    EARNED="EARNED",
    UNPAID="UNPAID"
}

export enum LeaveStatus{
    PENDING="PENDING",
    APPROVED="APPROVED",
    REJECTED="REJECTED"
}

export interface Leave{
    id:string;
    employeeId:string;
    tenantId:string;
    leaveType:LeaveType;
    startDate:string;
    endDate:string;
    reason?:string;
    status:LeaveStatus;
    createdAt:string;
    updatedAt:string;
    employee?:{
        id:string;
        firstName:string;
        lastName:string;
    };
}

export interface CreateLeaveDto{
    employeeId:string;
    leaveType:LeaveType;
    startDate:string;
    endDate:string;
    reason?:string;
}

export interface UpdateLeaveDto{
    leaveType?:LeaveType;
    startDate?:string;
    endDate?:string;
    reason?:string;
    status?:LeaveStatus;
}

export interface LeaveFormData {
    employeeId: string;
    leaveType: LeaveType;
    startDate: string;
    endDate: string;
    reason?: string;
}