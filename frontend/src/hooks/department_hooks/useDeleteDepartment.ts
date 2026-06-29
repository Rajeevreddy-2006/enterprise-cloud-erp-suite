import { useMutation, useQueryClient } from "@tanstack/react-query";
import departmentService from "@/services/department.service";

export function useDeleteDepartment(){
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: departmentService.deleteDepartment,
        onSuccess(){
            queryClient.invalidateQueries({
                queryKey:[ "departments" ]
            });
        }
    });
}