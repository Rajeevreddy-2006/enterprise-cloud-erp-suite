import { useMemo, useState } from "react";

import AppLayout from "@/components/layout/AppLayout";
import LeaveStats from "@/components/leave/LeaveStats";
import LeaveTable from "@/components/leave/LeaveTable";
import LeaveDialog from "@/components/leave/LeaveDialog";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

import { Card, CardContent } from "@/components/ui/card";

import { Plus } from "lucide-react";
import { toast } from "sonner";

import { useLeaves } from "@/hooks/leave_hooks/useLeaves";
import { useCreateLeave } from "@/hooks/leave_hooks/useCreateLeave";
import { useUpdateLeave } from "@/hooks/leave_hooks/useUpdateLeave";
import { useDeleteLeave } from "@/hooks/leave_hooks/useDeleteLeave";

import type { Leave } from "@/types/leave.types";

import type { LeaveFormData } from "@/schemas/leave.schema";

function LeavePage() {
    const {
        data,
        isLoading,
        isError
    } = useLeaves();
    const createLeave = useCreateLeave();
    const updateLeave = useUpdateLeave();
    const deleteLeave = useDeleteLeave();
    const leaves: Leave[] = data?.data || [];
    const [open, setOpen] = useState(false);
    const [selected, setSelected] = useState<Leave | null>(null);
    const [search, setSearch] = useState("");
    const [date, setDate] = useState("");
    const filteredLeaves = useMemo(() => {
            return leaves.filter(
                (leave) => {
                    const employeeName = `${leave.employee?.firstName || ""} ${leave.employee?.lastName || ""}`.toLowerCase();
                    const nameMatch = employeeName.includes(search.toLowerCase());
                    const dateMatch = date? leave.startDate.slice(0,10) === date: true;
                    return ( nameMatch && dateMatch);
                }
            );
        }, [
            leaves,
            search,
            date
        ]);

    const handleSubmit = (values: LeaveFormData) => {
        if (selected) {
            updateLeave.mutate(
                {
                    id: selected.id,
                    data: values
                },
                {
                    onSuccess() {
                        toast.success(
                            "Leave updated successfully"
                        );
                        setOpen(false);
                        setSelected(null);
                    },
                    onError() {
                        toast.error(
                            "Unable to update leave"
                        );
                    }
                }
            );
        } else {
            createLeave.mutate(
                values,
                {
                    onSuccess() {
                        toast.success(
                            "Leave created successfully"
                        );
                        setOpen(false);
                        setSelected(null);
                    },
                    onError() {
                        toast.error(
                            "Unable to create leave"
                        );
                    }
                }
            );
        }
    };
    const handleEdit = (leave: Leave) => {
        setSelected(leave);
        setOpen(true);
    };
    const handleDelete = (id: string) => {
        deleteLeave.mutate(
            id,
            {
                onSuccess() {
                    toast.success(
                        "Leave deleted successfully"
                    );
                },
                onError() {
                    toast.error(
                        "Unable to delete leave"
                    );
                }
            }
        );
    };
    const handleApprove = (id: string) => {
        updateLeave.mutate(
            {
                id,
                data: { status: "APPROVED" }
            },
            {
                onSuccess() {
                    toast.success(
                        "Leave approved"
                    );
                }
            }
        );
    };
    const handleReject = (id: string) => {
        updateLeave.mutate(
            {
                id,
                data: { status: "REJECTED" }
            },
            {
                onSuccess() {
                    toast.success(
                        "Leave rejected"
                    );
                }
            }
        );
    };
    // if (isLoading) {
    //     return (
    //         <AppLayout>
    //             <div className="text-white text-center py-20">
    //                 Loading Leave Requests...
    //             </div>
    //         </AppLayout>
    //     );
    // }
    // if (isError) {
    //     return (
    //         <AppLayout>
    //             <div className="text-red-500 text-center py-20">
    //                 Failed to load leaves
    //             </div>
    //         </AppLayout>
    //     );
    // }
    return (
        <AppLayout>
            <div className="space-y-6">
                <div className="flex justify-between items-center">
                    <h1 className="text-3xl font-bold text-white">
                        Leave Management
                    </h1>
                    <Button className="text-white" onClick={() => { setSelected(null); setOpen(true); }}>
                        <Plus size={16}/>
                        Request Leave
                    </Button>
                </div>
                <LeaveStats leaves={leaves}/>
                <div className="flex gap-4">
                    <Input placeholder="Search Employee" value={search} onChange={(e)=> setSearch(e.target.value) }/>
                    <Input type="date" value={date} onChange={(e)=> setDate(e.target.value)}/>
                </div>
                <Card>
                    <CardContent>
                        {
                            filteredLeaves.length===0?
                            (
                                <div className="text-center text-slate-400 py-10">
                                    No Leave Requests Found
                                </div>
                            ):
                            (
                                <LeaveTable
                                    leaves={filteredLeaves}
                                    onEdit={handleEdit}
                                    onDelete={handleDelete}
                                    onApprove={handleApprove}
                                    onReject={handleReject}
                                />
                            )
                        }
                    </CardContent>
                </Card>
                <LeaveDialog
                    open={open}
                    onOpenChange={setOpen}
                    defaultValues={
                        selected ?? undefined
                    }
                    loading={
                        createLeave.isPending ||
                        updateLeave.isPending
                    }
                    onSubmit={handleSubmit}
                />
            </div>
        </AppLayout>
    );
}

export default LeavePage;