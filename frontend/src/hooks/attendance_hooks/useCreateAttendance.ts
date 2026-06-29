import { useMutation,useQueryClient } from "@tanstack/react-query";
import attendanceService from "@/services/attendance.service";

export function useCreateAttendance(){
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: attendanceService.createAttendance,
        onSuccess(){
            queryClient.invalidateQueries({
            queryKey:[ "attendance" ]
        });
        }
    });
}