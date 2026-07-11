import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import EmployeeForm from "./EmployeeForm";
import type { Employee } from "@/types/employee.types";

interface Props {
    open: boolean;
    setOpen: (open: boolean) => void;
    onSubmit: (data: any) => void;
    loading?: boolean;
    employee?: Employee | null;
}

function EmployeeModal({
    open,
    setOpen,
    onSubmit,
    loading,
    employee
}: Props) {
    return (
        <Dialog
            open={open}
            onOpenChange={setOpen}
        >
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>
                        {
                            employee?"Edit Employee":"Create Employee"
                        }
                    </DialogTitle>
                </DialogHeader>
                <EmployeeForm
                    onSubmit={onSubmit}
                    loading={loading}
                    defaultValues={employee}
                />
            </DialogContent>
        </Dialog>
    );
}

export default EmployeeModal;
