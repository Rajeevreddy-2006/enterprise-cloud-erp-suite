import { useState } from "react";

import { Plus } from "lucide-react";
import { toast } from "sonner";

import { Button } from "@/components/ui/button";

import LeaveTable from "@/components/leave/LeaveTable";
import LeaveDialog from "@/components/leave/LeaveDialog";
import LeaveBalanceCards from "@/components/leave/LeaveBalanceCards";

import { useEmployeeLeaves } from "@/hooks/leave_hooks/useEmployeeLeaves";
import { useLeaveBalance } from "@/hooks/leave_hooks/useLeaveBalance";
import { useCreateLeave } from "@/hooks/leave_hooks/useCreateLeave";

import type { CreateLeaveDto } from "@/types/leave.types";

interface Props {
    employeeId: string;
}

function EmployeeLeaves({
    employeeId
}: Props) {

    const [open, setOpen] = useState(false);

    const {
        data: leaves = [],
        refetch: refetchLeaves
    } = useEmployeeLeaves(employeeId);

    const {
        data: balance,
        refetch: refetchBalance
    } = useLeaveBalance(employeeId);

    const createLeave = useCreateLeave();

    const handleSubmit = (
        data: CreateLeaveDto
    ) => {

        createLeave.mutate(

            data,

            {

                onSuccess() {

                    toast.success(
                        "Leave Applied Successfully"
                    );

                    refetchLeaves();

                    refetchBalance();

                    setOpen(false);

                },

                onError() {

                    toast.error(
                        "Failed to apply leave"
                    );

                }

            }

        );

    };

    return (

        <div className="space-y-6">

            <div className="flex justify-between items-center">

                <h2
                    className="
                    text-2xl
                    font-semibold
                    text-white
                    "
                >
                    Leave Management
                </h2>

                <Button className="text-white"
                    onClick={() => setOpen(true)}
                >

                    <Plus
                        className="
                        h-4
                        w-4
                        mr-2 text-white
                        "
                    />

                    Apply Leave

                </Button>

            </div>

            <LeaveBalanceCards

                balance={balance}

            />

            <LeaveTable

                leaves={leaves}

            />

            <LeaveDialog

                open={open}

                onOpenChange={setOpen}

                employeeId={employeeId}

                loading={

                    createLeave.isPending

                }

                onSubmit={

                    handleSubmit

                }

            />

        </div>

    );

}

export default EmployeeLeaves;