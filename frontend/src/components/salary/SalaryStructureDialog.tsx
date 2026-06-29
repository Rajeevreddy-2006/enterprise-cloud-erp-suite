import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle
} from "@/components/ui/dialog";
import SalaryStructureForm from "./SalaryStructureForm";
import type { SalaryStructure } from "@/types/salary.types";
import type { SalaryFormData } from "@/schemas/salary.schema";

interface Props {
    open: boolean;
    onOpenChange: (open: boolean) => void;
    loading: boolean;
    defaultValues?: SalaryStructure | null;
    onSubmit: (data: SalaryFormData) => void;
}

function SalaryStructureDialog({ open,onOpenChange,loading,defaultValues,onSubmit }: Props) {
    return (
        <Dialog open={open} onOpenChange={onOpenChange}>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>
                        Salary Structure
                    </DialogTitle>
                </DialogHeader>
                <SalaryStructureForm onSubmit={onSubmit} loading={loading} defaultValues={defaultValues as any} />
            </DialogContent>
        </Dialog>
    );
}

export default SalaryStructureDialog;