import { useQuery } from "@tanstack/react-query";
import attendanceService from "@/services/attendance.service";

export function useEmployeeAttendance(id: string) {

    return useQuery({

        queryKey: [

            "employeeAttendance",

            id

        ],

        queryFn: () => attendanceService.employeeAttendance(id),

        enabled: !!id

    });

}