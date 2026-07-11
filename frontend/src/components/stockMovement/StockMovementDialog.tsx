import {
Dialog,
DialogContent,
DialogHeader,
DialogTitle
} from "@/components/ui/dialog";
import StockMovementForm from "./StockMovementForm";

function StockMovementDialog({
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
                <DialogTitle> 
                    { defaultValues?"Edit Movement":"Create Movement" }
                </DialogTitle>
            </DialogHeader>
            <StockMovementForm 
                onSubmit={onSubmit}
                loading={loading}
                defaultValues={defaultValues}
            />
        </DialogContent>
        </Dialog>
    );
}

export default StockMovementDialog;