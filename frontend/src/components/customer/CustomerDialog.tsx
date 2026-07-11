import {
Dialog,
DialogContent,
DialogHeader,
DialogTitle
} from "@/components/ui/dialog";
import CustomerForm from "./CustomerForm";

function CustomerDialog({
open,
onOpenChange,
loading,
defaultValues,
onSubmit
}:any){
    return(
        <Dialog open={open} onOpenChange={onOpenChange}>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle> 
                        { defaultValues?"Edit Customer":"Create Customer" }
                    </DialogTitle>
                </DialogHeader>
                <CustomerForm onSubmit={onSubmit} loading={loading} defaultValues={defaultValues}/>
            </DialogContent>
        </Dialog>
    );
}

export default CustomerDialog;