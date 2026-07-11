import { useQuery } from "@tanstack/react-query";
import * as service from "@/services/report.service";

export const useReports = () => {
    return useQuery({
        queryKey:["reports"],
        queryFn:async()=>{
            const {data}=await service.getReports();
            return data;
        }
    });
};