import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import LeaveForm from "./LeaveForm";
import type { Leave } from "@/types/leave.types";
import type { LeaveFormData } from "@/schemas/leave.schema";

interface Props{
    open:boolean;
    onOpenChange:(open:boolean)=>void;
    loading:boolean;
    defaultValues?:Leave;
    onSubmit:(data:LeaveFormData)=>void;
}

function LeaveDialog({ open, onOpenChange, loading, defaultValues, onSubmit }:Props){
    return(
        <Dialog open={open} onOpenChange={onOpenChange}>
        <DialogContent>
            <DialogHeader>
                <DialogTitle> Leave Request </DialogTitle>
            </DialogHeader>
            <LeaveForm onSubmit={onSubmit} loading={loading} defaultValues={defaultValues}/>
        </DialogContent>
        </Dialog>
    );
}

export default LeaveDialog;