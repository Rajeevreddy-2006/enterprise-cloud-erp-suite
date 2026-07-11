import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle
} from "@/components/ui/dialog";
import GRNForm from "./GRNForm";
import type { GRNFormData } from "@/schemas/grn.schema";

interface Props {
    open: boolean;
    onOpenChange: (open: boolean) => void;
    loading: boolean;
    defaultValues?:Partial<GRNFormData>;
    onSubmit: (data: GRNFormData) => void;
}

function GRNDialog({
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
                            defaultValues?"Edit GRN":"Create GRN"
                        }
                    </DialogTitle>
                </DialogHeader>
                <GRNForm
                    onSubmit={onSubmit}
                    loading={loading}
                    defaultValues={defaultValues}
                />
            </DialogContent>
        </Dialog>
    );
}

export default GRNDialog;