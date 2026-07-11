import {
Dialog,
DialogContent,
DialogHeader,
DialogTitle
} from "@/components/ui/dialog";
import InventoryForm from "./InventoryForm";
import type { InventoryFormData } from "@/schemas/inventory.schema";

interface Props{
    open:boolean;
    onOpenChange:(open:boolean)=>void;
    loading:boolean;
    defaultValues?:Partial<InventoryFormData>;
    onSubmit:(data:InventoryFormData)=>void;
}

function InventoryDialog({ open,onOpenChange,loading,defaultValues,onSubmit }:Props){
    return(
        <Dialog open={open} onOpenChange={onOpenChange}>
        <DialogContent>
            <DialogHeader>
                <DialogTitle> { defaultValues?"Edit Item":"Create Item"} </DialogTitle>
            </DialogHeader>
            <InventoryForm
                onSubmit={onSubmit}
                loading={loading}
                defaultValues={defaultValues}
                />
        </DialogContent>
        </Dialog>
    );
}

export default InventoryDialog;