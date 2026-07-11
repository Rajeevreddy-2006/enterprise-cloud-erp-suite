import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle
} from "@/components/ui/dialog";
import JournalForm from "./JournalForm";
import type {
    JournalFormData
} from "@/schemas/journal.schema";

interface Props{
    open:boolean;
    onOpenChange:(open:boolean)=>void;
    loading:boolean;
    defaultValues?:Partial<JournalFormData>;
    onSubmit:(data:JournalFormData)=>void;
}

function JournalDialog({
    open,
    onOpenChange,
    loading,
    defaultValues,
    onSubmit
}:Props){
    return(
        <Dialog open={open} onOpenChange={onOpenChange}>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>
                        {
                            defaultValues?"Edit Entry":"Create Entry"
                        }
                    </DialogTitle>
                </DialogHeader>
                <JournalForm
                    onSubmit={onSubmit}
                    loading={loading}
                    defaultValues={defaultValues}
                />
            </DialogContent>
        </Dialog>
    );
}

export default JournalDialog;