import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle
} from "@/components/ui/dialog";

import AttendanceForm from "./AttendanceForm";

import type {
    Attendance
} from "@/types/attendance.types";

import type {
    AttendanceFormData
} from "@/schemas/attendance.schema";

interface Props {

    open: boolean;

    onOpenChange: (
        open: boolean
    ) => void;

    employeeId: string;

    loading?: boolean;

    defaultValues?: Attendance;

    onSubmit: (
        data: AttendanceFormData
    ) => void;

}

function AttendanceDialog({
    open,
    onOpenChange,
    employeeId,
    loading,
    defaultValues,
    onSubmit
}: Props) {
    return (
        <Dialog
            open={open}
            onOpenChange={onOpenChange}
        >
            <DialogContent
                className="sm:max-w-md"
            >
                <DialogHeader>
                    <DialogTitle>
                        {
                            defaultValues
                                ?
                                "Edit Attendance"
                                :
                                "Mark Attendance"
                        }
                    </DialogTitle>
                </DialogHeader>
                <AttendanceForm
                    employeeId={employeeId}
                    loading={loading}
                    onSubmit={onSubmit}
                    defaultValues={
                        defaultValues
                            ?
                            {
                                employeeId:
                                    defaultValues.employeeId,
                                date:
                                    defaultValues.date
                                       .slice(0, 10),
                                status:
                                    defaultValues.status
                            }
                            :
                            undefined
                    }
                />
            </DialogContent>
        </Dialog>
    );
}

export default AttendanceDialog;