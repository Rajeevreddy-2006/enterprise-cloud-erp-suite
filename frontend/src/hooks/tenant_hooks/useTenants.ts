import { useQuery } from "@tanstack/react-query";
import * as service from "@/services/tenant.service";

export const useTenants = () => {
    return useQuery({
        queryKey:["tenants"],
        queryFn:async()=>{
        const { data } =
            await service.getTenants();
            return data;
        }
    });
};