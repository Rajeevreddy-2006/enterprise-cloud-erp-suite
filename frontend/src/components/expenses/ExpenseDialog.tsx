import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle
} from "@/components/ui/dialog";
import ExpenseForm from "./ExpenseForm";
import type { Expense } from "@/types/expense.types";
import type { ExpenseFormData } from "@/schemas/expense.schema";

interface Props {
    open: boolean;
    onOpenChange: (open: boolean) => void;
    loading: boolean;
    defaultValues?: Expense;
    onSubmit: (data: ExpenseFormData) => void;
}

function ExpenseDialog({
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
                        { defaultValues?"Edit Expense":"Create Expense" }
                    </DialogTitle>
                </DialogHeader>
                <ExpenseForm
                    onSubmit={onSubmit}
                    loading={loading}
                    defaultValues={defaultValues}
                />
            </DialogContent>
        </Dialog>
    );
}

export default ExpenseDialog;