import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle
} from "@/components/ui/dialog";
import LeadForm from "./LeadForm";
import type { Lead } from "@/types/lead.types";
import type { LeadFormData } from "@/schemas/lead.schema";

interface Props {
    open: boolean;
    onOpenChange: (open: boolean) => void;
    loading: boolean;
    defaultValues?: Lead;
    onSubmit: (data: LeadFormData) => void;
}

function LeadDialog({
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
                        { defaultValues?"Edit Lead":"Create Lead" }
                    </DialogTitle>
                </DialogHeader>
                <LeadForm
                    onSubmit={onSubmit}
                    loading={loading}
                    defaultValues={defaultValues}
                />
            </DialogContent>
        </Dialog>
    );
}

export default LeadDialog;