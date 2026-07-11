import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle
} from "@/components/ui/dialog";

import DepartmentForm from "./DepartmentForm";

interface Props{
    open:boolean;
    onOpenChange:(open:boolean)=>void;
    onSubmit:(data:any)=>void;
    loading:boolean;
    defaultValues?:{
        name?:string;
        description?:string;
    };
}

function DepartmentDialog({
    open,
    onOpenChange,
    onSubmit,
    loading,
    defaultValues
}:Props){
    return(
        <Dialog
            open={open}
            onOpenChange={onOpenChange}
        >
            <DialogContent
                className="bg-slate-900 border-slate-800"
            >
                <DialogHeader>
                    <DialogTitle>
                        Department
                    </DialogTitle>
                </DialogHeader>
                <DepartmentForm
                    onSubmit={onSubmit}
                    loading={loading}
                    defaultValues={defaultValues}
                />
            </DialogContent>
        </Dialog>
    );
}

export default DepartmentDialog;