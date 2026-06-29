import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import PayrollForm from "./PayrollForm";
import type { Payroll } from "@/types/payroll.types";
import type { PayrollFormData } from "@/schemas/payroll.schema";

interface Props{
    open:boolean;
    onOpenChange:(open:boolean)=>void;
    loading:boolean;
    defaultValues?:Payroll|null;
    onSubmit:(data:PayrollFormData)=>void;
}

function PayrollDialog({ open,onOpenChange,loading,defaultValues,onSubmit }:Props){
    return(
        <Dialog open={open} onOpenChange={onOpenChange}>
            <DialogContent>
            <DialogHeader>
                <DialogTitle> Payroll </DialogTitle>
            </DialogHeader>
            <PayrollForm onSubmit={onSubmit} loading={loading} defaultValues={defaultValues as any}/>
            </DialogContent>
        </Dialog>
    );
}

export default PayrollDialog;