import { useQuery } from "@tanstack/react-query";
import salaryService from "@/services/salary.service";

export function useSalaryStructures(){
    return useQuery({
        queryKey:[ "salaryStructures" ],
        queryFn: salaryService.getSalaryStructures
    });
}