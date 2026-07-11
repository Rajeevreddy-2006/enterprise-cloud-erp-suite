import {
Dialog,
DialogContent,
DialogHeader,
DialogTitle
} from "@/components/ui/dialog";
import SalesOrderForm from "./SalesOrderForm";

function SalesOrderDialog({ open,onOpenChange,loading,defaultValues,onSubmit }:any){
    return(
    <Dialog open={open} onOpenChange={onOpenChange} >
    <DialogContent>
        <DialogHeader>
            <DialogTitle>
                { defaultValues?"Edit Sales Order":"Create Sales Order" }
            </DialogTitle>
        </DialogHeader>
        <SalesOrderForm onSubmit={onSubmit} loading={loading} defaultValues={defaultValues} />
    </DialogContent>
    </Dialog>
    );
}

export default SalesOrderDialog;