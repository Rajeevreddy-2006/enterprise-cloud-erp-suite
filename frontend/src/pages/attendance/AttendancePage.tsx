import { useState } from "react";
import AppLayout from "@/components/layout/AppLayout";
import AttendanceStats from "@/components/attendance/AttendanceStats";
import AttendanceTable from "@/components/attendance/AttendanceTable";
import AttendanceDialog from "@/components/attendance/AttendanceDialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Plus } from "lucide-react";
import { toast } from "sonner";
import type { AttendanceFormData } from "@/schemas/attendance.schema";
import { useAttendance } from "@/hooks/attendance_hooks/useAttendance";
import { useCreateAttendance } from "@/hooks/attendance_hooks/useCreateAttendance";
import { useUpdateAttendance } from "@/hooks/attendance_hooks/useUpdateAttendance";
import { useDeleteAttendance } from "@/hooks/attendance_hooks/useDeleteAttendance";
import type { Attendance } from "@/types/attendance.types";

function AttendancePage(){
    const { data, isLoading } = useAttendance();
    const createAttendance = useCreateAttendance();
    const updateAttendance = useUpdateAttendance();
    const deleteAttendance = useDeleteAttendance();
    const [ open,setOpen ] = useState(false);
    const [ date,setDate ] = useState("");
    const [ selected,setSelected ] = useState<Attendance | null>(null);
    const [ search, setSearch ] = useState("");
    const attendance:Attendance[] = data?.data || [];
    const filteredAttendance = attendance.filter((item:any)=>{
        const nameMatch = item.employee?.name?.toLowerCase().includes(search.toLowerCase());
        const dateMatch = date?item.date.slice(0,10) === date :true; 
        return nameMatch && dateMatch; 
    });
    const handleSubmit=( values:AttendanceFormData )=>{
    if(selected){
        updateAttendance.mutate({ id:selected.id, data:values } , {
            onSuccess(){
                toast.success("Attendance udated");
                setOpen(false);
            }
        });
    }else{
        createAttendance.mutate(values,{
            onSuccess(){
                toast.success("Attendance created");
                setOpen(false);
            }
        });
    }};
    const handleDelete=(id:string)=>{ 
        deleteAttendance.mutate(id,{
            onSuccess(){
                toast.success("Attendance deleted");
            }
        });
    };
    return(
        <AppLayout>
        <div className="space-y-6">
            <div className="flex justify-between">
                <h1 className="text-3xl font-bold text-white"> Attendance </h1>
                <Button onClick={()=>{ setSelected(null); setOpen(true); }}> <Plus size={16}/> Mark Attendance </Button>
            </div>
            <AttendanceStats attendance={attendance}/>
            <div className="flex gap-4">
                <Input placeholder="Search Employee" value={search} onChange={ (e) => setSearch(e.target.value) } />
                <Input type="date" value={date} onChange={ (e) => setDate(e.target.value) } />
            </div>
            <AttendanceTable
                attendance={filteredAttendance}
                onEdit={(attendance: Attendance)=>{ setSelected(attendance); setOpen(true); }}
                onDelete={ handleDelete } />
            <AttendanceDialog
                open={open} onOpenChange={setOpen} defaultValues={selected}
                loading={ createAttendance.isPending || updateAttendance.isPending } onSubmit={handleSubmit} />
        </div>
        </AppLayout>
    );
}

export default AttendancePage;