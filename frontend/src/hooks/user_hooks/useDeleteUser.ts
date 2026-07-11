import {useMutation,useQueryClient} from "@tanstack/react-query";
import service from "@/services/user.service";

export const useDeleteUser=()=>{
   const qc = useQueryClient();
   return useMutation({
      mutationFn:(id:string)=>
        service.deleteUser(
            id
        ),
      onSuccess(){
         qc.invalidateQueries({
            queryKey:["users"]
         });
      }
   });
};