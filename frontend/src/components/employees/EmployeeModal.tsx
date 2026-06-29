import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import EmployeeForm from "./EmployeeForm";

interface Props{
    open:boolean;
    setOpen:(value:boolean)=>void;
    onSubmit:(data:any)=>void;
    employee?:any;
}

function EmployeeModal({ open,setOpen,onSubmit,employee }:Props){
    return(
        <Dialog open={open} onOpenChange={setOpen} >
        <DialogContent>
        <DialogHeader>
            <DialogTitle>
                { employee?"Edit Employee":"Create Employee" }
            </DialogTitle>
        </DialogHeader>
        <EmployeeForm onSubmit={onSubmit} defaultValues={employee} />
        </DialogContent>
        </Dialog>
    )
}

export default EmployeeModal;
