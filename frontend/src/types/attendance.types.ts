export enum AttendanceStatus {
    PRESENT = "PRESENT",
    ABSENT = "ABSENT",
    HALF_DAY = "HALF_DAY",
    LEAVE = "LEAVE"
}


export interface Attendance{
    id:string;
    employeeId:string;
    date:string;
    status:AttendanceStatus;
    createdAt?:string;
    updatedAt?:string;
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

export interface AttendanceSummary{
present:number;
absent:number;
leave:number;
halfDay:number;
paidDays:number;
}