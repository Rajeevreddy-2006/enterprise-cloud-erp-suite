import { useQuery } from "@tanstack/react-query";
import leaveService from "@/services/leave.service";

export function useLeaves(){

    return useQuery({

        queryKey:["leaves"],

        queryFn:async()=>{

            const res =
                await leaveService.getLeaves();

            console.log(res);

            return res.data;

        }

    });

}