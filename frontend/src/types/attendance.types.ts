export enum AttendanceStatus {
    PRESENT = "PRESENT",
    ABSENT = "ABSENT",
    HALF_DAY = "HALF_DAY",
    LEAVE = "LEAVE"
}

export interface Attendance{
    id:string;
    employeeId:string;
    tenantId:string;
    date:string;
    status:AttendanceStatus;
    checkIn?:string;
    checkOut?:string;
    createdAt:string;
    updatedAt:string;
    employee?:{
        id:string;
        name:string;
    };
}

export interface CreateAttendanceDto{
    employeeId:string;
    date:string;
    status:AttendanceStatus;
    checkIn?:string;
    checkOut?:string;
}

export interface UpdateAttendanceDto{
    status?:AttendanceStatus;
    checkIn?:string;
    checkOut?:string;
}