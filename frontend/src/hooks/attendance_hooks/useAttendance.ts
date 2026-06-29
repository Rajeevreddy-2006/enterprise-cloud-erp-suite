import { useQuery } from "@tanstack/react-query";
import attendanceService from "@/services/attendance.service";

export function useAttendance(){
    return useQuery({
        queryKey:[ "attendance" ],
        queryFn: attendanceService.getAttendance
    });
}