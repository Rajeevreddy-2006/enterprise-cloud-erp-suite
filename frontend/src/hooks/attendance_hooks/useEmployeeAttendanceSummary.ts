import {
    useQuery
} from "@tanstack/react-query";
import attendanceService from "@/services/attendance.service";

export function useEmployeeAttendanceSummary(id: string) {
    return useQuery({
        queryKey: [
            "employeeSummary",
            id
        ],
        queryFn: () => attendanceService.employeeAttendanceSummary(id),
        enabled: !!id
    });
}