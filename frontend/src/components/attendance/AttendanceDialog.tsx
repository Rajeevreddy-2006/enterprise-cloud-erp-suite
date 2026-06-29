import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import AttendanceForm from "./AttendanceForm";

function AttendanceDialog({ open,onOpenChange,onSubmit,loading,defaultValues }:any){
    return(
        <Dialog open={open} onOpenChange={onOpenChange}>
        <DialogContent>
            <DialogHeader>
                <DialogTitle> Attendance </DialogTitle>
            </DialogHeader>
            <AttendanceForm onSubmit={onSubmit} loading={loading} defaultValues={defaultValues} />
        </DialogContent>
        </Dialog>
    )
}

export default AttendanceDialog;