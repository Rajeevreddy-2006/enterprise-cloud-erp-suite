import {

    Dialog,

    DialogContent,

    DialogHeader,

    DialogTitle

}

    from "@/components/ui/dialog";

import LeaveForm

    from "./LeaveForm";

function LeaveDialog({

    open,

    onOpenChange,

    employeeId,

    loading,

    onSubmit

}: any) {

    return (

        <Dialog

            open={open}

            onOpenChange={onOpenChange}

        >

            <DialogContent>

                <DialogHeader>

                    <DialogTitle>

                        Apply Leave

                    </DialogTitle>

                </DialogHeader>

                <LeaveForm

                    employeeId={employeeId}

                    loading={loading}

                    onSubmit={onSubmit}

                />

            </DialogContent>

        </Dialog>

    );

}

export default LeaveDialog;