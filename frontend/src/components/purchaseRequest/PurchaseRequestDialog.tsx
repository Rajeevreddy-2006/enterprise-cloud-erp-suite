import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle
} from "@/components/ui/dialog";
import PurchaseRequestForm from "./PurchaseRequestForm";

function PurchaseRequestDialog({
    open,
    onOpenChange,
    loading,
    defaultValues,
    onSubmit
}: any) {
    return (
        <Dialog open={open} onOpenChange={onOpenChange}>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>
                        {
                            defaultValues?"Edit Request":"Create Request"
                        }
                    </DialogTitle>
                </DialogHeader>
                <PurchaseRequestForm
                    onSubmit={onSubmit}
                    loading={loading}
                    defaultValues={defaultValues}
                />
            </DialogContent>
        </Dialog>
    );
}

export default PurchaseRequestDialog;