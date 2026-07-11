import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import AccountForm from "./AccountForm";
import type { AccountFormData } from "@/schemas/account.schema";

interface Props{
    open:boolean;
    onOpenChange:(open:boolean)=>void;
    loading:boolean;
    defaultValues?:Partial<AccountFormData>;
    onSubmit:(data:AccountFormData)=>void;
}

function AccountDialog({open,onOpenChange,loading,defaultValues,onSubmit}:Props){
    return(
        <Dialog open={open} onOpenChange={onOpenChange}>
        <DialogContent>
            <DialogHeader>
                <DialogTitle> { defaultValues?"Edit Account":"Create Account" } </DialogTitle>
            </DialogHeader>
            <AccountForm
                onSubmit={onSubmit}
                loading={loading}
                defaultValues={defaultValues} />
        </DialogContent>
        </Dialog>
    );
}

export default AccountDialog;