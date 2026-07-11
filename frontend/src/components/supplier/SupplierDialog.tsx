import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle
} from "@/components/ui/dialog";
import SupplierForm from "./SupplierForm";
import type { SupplierFormData } from "@/schemas/supplier.schema";

interface Props {
    open: boolean;
    onOpenChange: (open: boolean) => void;
    loading: boolean; 
    defaultValues?: Partial<SupplierFormData>;
    onSubmit: ( data: SupplierFormData ) => void;
}

function SupplierDialog({
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
                        {
                            defaultValues? "Edit Supplier" : "Create Supplier"
                        }
                    </DialogTitle>
                </DialogHeader>
                <SupplierForm
                    onSubmit={onSubmit}
                    loading={loading}
                    defaultValues={defaultValues}
                />
            </DialogContent>
        </Dialog>
    );
}

export default SupplierDialog;