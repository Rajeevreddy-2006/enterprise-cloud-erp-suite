import {
Dialog,
DialogContent,
DialogHeader,
DialogTitle
} from "@/components/ui/dialog";
import PurchaseForm from "./PurchaseForm";
import type { PurchaseFormData } from "@/schemas/purchase.schema";

interface Props{
    open:boolean;
    onOpenChange:(open:boolean)=>void;
    loading:boolean;
    defaultValues?:Partial<PurchaseFormData>;
    onSubmit:(data:PurchaseFormData)=>void;
}

function PurchaseDialog({ open,onOpenChange,loading,defaultValues,onSubmit }:Props){
    return(
        <Dialog open={open} onOpenChange={onOpenChange}>
        <DialogContent>
        <DialogHeader>
            <DialogTitle> {defaultValues?"Edit Order":"Create Order"}
        </DialogTitle>
        </DialogHeader>
        <PurchaseForm onSubmit={onSubmit} loading={loading} defaultValues={defaultValues}/>
        </DialogContent>
        </Dialog>
    )
}

export default PurchaseDialog;