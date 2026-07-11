import { useMutation, useQueryClient } from "@tanstack/react-query";
import * as service from "@/services/stockMovement.service";

export const useUpdateStockMovement=()=>{
    const qc = useQueryClient();
    return useMutation({
        mutationFn:({id,data}:{ id:string;data:any; }) =>
        service.updateStockMovement(
            id,data
        ),
        onSuccess(){
            qc.invalidateQueries({
                queryKey:["stockMovements"]
            });
        }
    });
};