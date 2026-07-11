import {
Dialog,
DialogContent,
DialogHeader,
DialogTitle
} from "@/components/ui/dialog";
import InvoiceForm from "./InvoiceForm";

function InvoiceDialog({
open,
onOpenChange,
loading,
defaultValues,
onSubmit
}:any){
    return(
        <Dialog open={open} onOpenChange={onOpenChange}>
        <DialogContent>
            <DialogHeader>
                <DialogTitle> { defaultValues?"Edit Invoice":"Create Invoice" } </DialogTitle>
            </DialogHeader>
            <InvoiceForm onSubmit={onSubmit} loading={loading} defaultValues={defaultValues}/>
        </DialogContent>
        </Dialog>
    );
}

export default InvoiceDialog;