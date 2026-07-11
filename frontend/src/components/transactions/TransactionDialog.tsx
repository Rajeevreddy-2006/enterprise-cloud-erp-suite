import {
Dialog,
DialogContent,
DialogHeader,
DialogTitle
} from "@/components/ui/dialog";
import TransactionForm from "./TransactionForm";
import type { TransactionFormData } from "@/schemas/transaction.schema";

interface Props{
    open:boolean;
    onOpenChange:(open:boolean)=>void;
    loading:boolean;
    defaultValues?:Partial<TransactionFormData>;
    onSubmit:(data:TransactionFormData)=>void;
}

function TransactionDialog({ open,onOpenChange,loading,defaultValues,onSubmit }:Props){
    return(
        <Dialog open={open} onOpenChange={onOpenChange}>
        <DialogContent>
            <DialogHeader>
                <DialogTitle>
                    { defaultValues?"Edit Transaction":"New Transaction" }
                </DialogTitle>
            </DialogHeader>
            <TransactionForm onSubmit={onSubmit} loading={loading} defaultValues={defaultValues}/>
        </DialogContent>
        </Dialog>
    );
}

export default TransactionDialog;