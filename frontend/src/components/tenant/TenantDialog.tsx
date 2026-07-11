import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle
} from "@/components/ui/dialog";
import TenantForm from "./TenantForm";
import type { Tenant } from "@/types/tenant.types";
import type { TenantFormData } from "@/schemas/tenant.schema";

interface Props {
    open: boolean;
    onOpenChange: (open: boolean) => void;
    loading: boolean;
    defaultValues?: Tenant;
    onSubmit: (data: TenantFormData) => void;
}

function TenantDialog({
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
                        { defaultValues?"Edit Tenant":"Create Tenant" }
                    </DialogTitle>
                </DialogHeader>
                <TenantForm
                    onSubmit={onSubmit}
                    loading={loading}
                    defaultValues={defaultValues}
                />
            </DialogContent>
        </Dialog>
    );
}

export default TenantDialog;