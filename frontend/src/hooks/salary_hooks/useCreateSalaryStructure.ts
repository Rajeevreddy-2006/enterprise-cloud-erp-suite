// import { useMutation, useQueryClient } from "@tanstack/react-query";
// import salaryService from "@/services/salary.service";

// export function useCreateSalaryStructure(){
//     const queryClient = useQueryClient();
//     return useMutation({
//         mutationFn: salaryService.createSalaryStructure,
//         onSuccess(){
//             queryClient.invalidateQueries({
//                 queryKey:[ "salaryStructures" ]
//             });
//         }
//     });
// }
import { AxiosError } from "axios";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import salaryService from "@/services/salary.service";
import { toast } from "sonner";

export function useCreateSalaryStructure() {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: salaryService.createSalaryStructure,
        onSuccess() {
            queryClient.invalidateQueries({
                queryKey: ["salaryStructures"],
            });
        },
        onError(error) {
            const err = error as AxiosError<{ message: string }>;
            toast.error(
                err.response?.data?.message ??
                "Unable to assign salary"
            );
        },
    });
}