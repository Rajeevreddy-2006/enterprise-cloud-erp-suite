import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle
} from "@/components/ui/dialog";
import PaymentForm from "./PaymentForm";

function PaymentDialog({
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
                    <DialogTitle> { defaultValues?"Edit Payment":"Create Payment" } </DialogTitle>
                </DialogHeader>
                <PaymentForm
                    onSubmit={onSubmit}
                    loading={loading}
                    defaultValues={defaultValues}
                />
            </DialogContent>
        </Dialog>
    );
}

export default PaymentDialog;