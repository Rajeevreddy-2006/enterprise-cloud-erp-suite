import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle
} from "@/components/ui/dialog";
import InteractionForm from "./InteractionForm";
import type { Interaction } from "@/types/interaction.types";
import type { InteractionFormData } from "@/schemas/interaction.schema";

interface Props {
    open: boolean;
    onOpenChange: (open: boolean) => void;
    loading: boolean;
    defaultValues?: Interaction;
    onSubmit: (data: InteractionFormData) => void;
}

function InteractionDialog({
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
                    <DialogTitle> { defaultValues?"Edit Interaction":"Create Interaction" } </DialogTitle>
                </DialogHeader>
                <InteractionForm
                    onSubmit={onSubmit}
                    loading={loading}
                    defaultValues={defaultValues}
                />
            </DialogContent>
        </Dialog>
    );
}

export default InteractionDialog;