import { useMutation,useQueryClient } from "@tanstack/react-query";
import attendanceService from "@/services/attendance.service";

export function useUpdateAttendance(){
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn:({ id,data }:{ id:string; data:any; }) => attendanceService.updateAttendance( id,data ),
        onSuccess(){
            queryClient.invalidateQueries({
                queryKey:[ "attendance" ]
            });
        }
    });
}