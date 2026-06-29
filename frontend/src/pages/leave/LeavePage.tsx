import { useState } from "react";
import AppLayout from "@/components/layout/AppLayout";
import LeaveStats from "@/components/leave/LeaveStats";
import LeaveTable from "@/components/leave/LeaveTable";
import LeaveDialog from "@/components/leave/LeaveDialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Plus } from "lucide-react";
import { toast } from "sonner";
import { useLeaves } from "@/hooks/leave_hooks/useLeaves";
import { useCreateLeave } from "@/hooks/leave_hooks/useCreateLeave";
import { useUpdateLeave } from "@/hooks/leave_hooks/useUpdateLeave";
import { useDeleteLeave } from "@/hooks/leave_hooks/useDeleteLeave";
import type { Leave } from "@/types/leave.types";
import type { LeaveFormData } from "@/schemas/leave.schema";

function LeavePage(){
    const { data } = useLeaves();
    const createLeave = useCreateLeave();
    const updateLeave = useUpdateLeave();
    const deleteLeave = useDeleteLeave();
    const [open,setOpen] = useState(false);
    const [search,setSearch] = useState("");
    const [date,setDate] = useState("");
    const [selected,setSelected] = useState<Leave | null>(null);
    const leaves:Leave[] = data?.data || [];
    const filteredLeaves = leaves.filter((leave)=>{
        const employeeName = `${leave.employee?.firstName || ""} ${leave.employee?.lastName || ""}`.toLowerCase();
        const nameMatch = employeeName.includes(
            search.toLowerCase()
        );
        const dateMatch = date?leave.startDate.slice(0,10) === date:true;
        return nameMatch && dateMatch;
    });
    const handleSubmit=(values:LeaveFormData)=>{
        if(selected){
            updateLeave.mutate(
                { id:selected.id, data:values },
                {
                    onSuccess(){
                        toast.success("Leave updated");
                        setOpen(false);
                    }
                }
            );
        }else{
            createLeave.mutate(
                values,
                {
                    onSuccess(){
                        toast.success("Leave created");
                        setOpen(false);
                    }
                }
            );
        }
    };
    const handleEdit = (leave: Leave) => {
        setSelected(leave);
        setOpen(true);
    };
    const handleDelete=(id:string)=>{
        deleteLeave.mutate(
            id,
            {
                onSuccess(){
                    toast.success("Leave deleted");
                }
            }
        );
    };
    const handleApprove = (id:string)=>{
        updateLeave.mutate({id,data:{ status:"APPROVED" }},{
            onSuccess(){
                toast.success("Leave approved");
            }
        });
    };
    const handleReject=(id:string)=>{
        updateLeave.mutate({id,data:{ status:"REJECTED" }},{
            onSuccess(){
                toast.success("Leave rejected");
            }
        });
    };
    return(
        <AppLayout>
            <div className="space-y-6">
                <div className="flex justify-between">
                    <h1 className="text-3xl font-bold text-white"> Leave Management </h1>
                    <Button onClick={()=>{ setSelected(null); setOpen(true);}}> <Plus size={16}/> Request Leave </Button>
                </div>
                <LeaveStats leaves={leaves}/>
                <div className="flex gap-4">
                    <Input placeholder="Search Employee" value={search} onChange={ (e) => setSearch(e.target.value) }/>
                    <Input type="date" value={date} onChange={ (e) => setDate(e.target.value) }/>
                </div>
                <LeaveTable
                    leaves={filteredLeaves}
                    onEdit={handleEdit} onDelete={handleDelete}
                    onApprove={handleApprove} onReject={handleReject} />
                <LeaveDialog
                    open={open}
                    onOpenChange={setOpen}
                    defaultValues={selected ?? undefined}
                    loading={ createLeave.isPending || updateLeave.isPending } 
                    onSubmit={handleSubmit}/>
            </div>
        </AppLayout>
    );
}

export default LeavePage;