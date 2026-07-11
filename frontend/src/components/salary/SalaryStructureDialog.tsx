import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle
} from "@/components/ui/dialog";
import SalaryStructureForm
    from "./SalaryStructureForm";

interface Props {
    open: boolean;
    onOpenChange:
    (v: boolean) => void;
    employee: any;
    loading: boolean;
    defaultValues?: any;
    onSubmit: (data: any) => void;
}

function SalaryStructureDialog({
    open,
    onOpenChange,
    employee,
    loading,
    defaultValues,
    onSubmit
}: Props) {
    return (
        <Dialog open={open} onOpenChange={onOpenChange}>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>
                        Salary Structure
                    </DialogTitle>
                </DialogHeader>
                <SalaryStructureForm
                    employee={employee}
                    loading={loading}
                    defaultValues={
                        defaultValues
                    }
                    onSubmit={ onSubmit }
                />
            </DialogContent>
        </Dialog>
    );
}

export default SalaryStructureDialog;