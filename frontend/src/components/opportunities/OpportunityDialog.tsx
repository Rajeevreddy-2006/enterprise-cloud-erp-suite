import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle
} from "@/components/ui/dialog";
import OpportunityForm from "./OpportunityForm";
import type { Opportunity } from "@/types/opportunity.types";
import type { OpportunityFormData } from "@/schemas/opportunity.schema";

interface Props {
    open: boolean;
    onOpenChange: (open: boolean) => void;
    loading: boolean;
    defaultValues?: Opportunity;
    onSubmit: (data: OpportunityFormData) => void;
}

function OpportunityDialog({
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
                        { defaultValues?"Edit Opportunity":"Create Opportunity" }
                    </DialogTitle>
                </DialogHeader>
                <OpportunityForm
                    onSubmit={onSubmit}
                    loading={loading}
                    defaultValues={defaultValues}
                />
            </DialogContent>
        </Dialog>
    );
}

export default OpportunityDialog;