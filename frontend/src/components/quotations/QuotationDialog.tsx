import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle
} from "@/components/ui/dialog";
import QuotationForm from "./QuotationForm";
import type { Quotation } from "@/types/quotation.types";
import type { QuotationFormData } from "@/schemas/quotation.schema";

interface Props {
    open: boolean;
    onOpenChange: (open: boolean) => void;
    loading: boolean;
    defaultValues?: Quotation;
    onSubmit: (data: QuotationFormData) => void;
}

function QuotationDialog({
    open,
    onOpenChange,
    loading,
    defaultValues,
    onSubmit
}: Props) {
    return (
        <Dialog open={open} onOpenChange={onOpenChange}>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>
                        { defaultValues?"Edit Quotation":"Create Quotation" }
                    </DialogTitle>
                </DialogHeader>
                <QuotationForm
                    onSubmit={onSubmit}
                    loading={loading}
                    defaultValues={defaultValues}
                />
            </DialogContent>
        </Dialog>
    );
}

export default QuotationDialog;