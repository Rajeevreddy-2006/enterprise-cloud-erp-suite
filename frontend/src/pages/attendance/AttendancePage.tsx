import { useMemo, useState } from "react";

import AppLayout from "@/components/layout/AppLayout";

import AttendanceStats from "@/components/attendance/AttendanceStats";
import AttendanceTable from "@/components/attendance/AttendanceTable";
import AttendanceDialog from "@/components/attendance/AttendanceDialog";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Plus } from "lucide-react";
import { toast } from "sonner";

import type { AttendanceFormData } from "@/schemas/attendance.schema";
import type { Attendance } from "@/types/attendance.types";

import { useAttendance } from "@/hooks/attendance_hooks/useAttendance";
import { useCreateAttendance } from "@/hooks/attendance_hooks/useCreateAttendance";
import { useUpdateAttendance } from "@/hooks/attendance_hooks/useUpdateAttendance";
import { useDeleteAttendance } from "@/hooks/attendance_hooks/useDeleteAttendance"
import type { AttendanceSummary } from "@/types/attendance.types";
import { useEffect } from "react";
import attendanceService from "@/services/attendance.service";


function AttendancePage(){
    const {
        data,
        isLoading,
        isError
    } = useAttendance();
    const createAttendance = useCreateAttendance();
    const updateAttendance = useUpdateAttendance();
    const deleteAttendance = useDeleteAttendance();
    const attendance:Attendance[] = data?.data || [];
    const [ open,setOpen ] = useState(false);
    const [ selected,setSelected ] = useState<Attendance | null>(null);
    const [ search,setSearch ] = useState("");
    const [ date,setDate ] = useState("");
    const [ page,setPage ] = useState(1);
    const [summary,setSummary] = useState<AttendanceSummary[]>([]);
    const limit = 10;
    useEffect(() => {
        attendanceService.getSummary(
                new Date().getMonth() + 1,
                new Date().getFullYear()
            )
            .then((res) => { setSummary(res.data.data); })
            .catch(() => {
                toast.error(
                    "Unable to load summary"
                );
            });
    }, []);
    const filteredAttendance = useMemo(() => {
            return attendance.filter((item:any)=>{
                const nameMatch = item.employee?.name?.toLowerCase().includes(search.toLowerCase());
                const dateMatch = date?item.date.slice(0,10) === date:true;
                return (nameMatch && dateMatch);
            });
        },
        [
            attendance,
            search,
            date
        ]
    );
    const start = (page - 1)*limit;
    const end = start+limit;
    const paginatedAttendance = filteredAttendance.slice(start,end);
    const handleSubmit=(values:AttendanceFormData)=>{
        if(selected){
            updateAttendance.mutate(
                {
                    id: selected.id,
                    data: values
                },
                {
                    onSuccess(){
                        toast.success(
                            "Attendance updated successfully"
                        );
                    },
                    onError(){
                        toast.error(
                            "Unable to update attendance"
                        );
                    }
                }
            );
        }else{
            createAttendance.mutate(
                values,
                {
                    onSuccess(){
                        toast.success(
                            "Attendance created successfully"
                        );
                    },
                    onError(){
                        toast.error(
                            "Unable to create attendance"
                        );
                    }
                }
            );
        }
        setOpen(false);
        setSelected(null);
    };
    const handleDelete=(id:string)=>{
        deleteAttendance.mutate(
            id,
            {
                onSuccess(){
                    toast.success(
                        "Attendance deleted successfully"
                    );
                },
                onError(){
                    toast.error(
                        "Unable to delete attendance"
                    );
                }
            }
        );
    };
    // if(isLoading){
    //     return(
    //         <AppLayout>
    //             <div className="text-white text-center py-20">
    //                 Loading Attendance...
    //             </div>
    //         </AppLayout>
    //     );
    // }
    // if(isError){
    //     return(
    //         <AppLayout>
    //             <div className="text-red-500 text-center py-20">
    //                 Failed to load attendance
    //             </div>
    //         </AppLayout>
    //     );
    // }
    return(
        <AppLayout>
            <div className="space-y-6">
                <div className="flex justify-between items-center">
                    <h1 className="text-3xl font-bold text-white">
                        Attendance
                    </h1>
                    <Button className="text-white" onClick={()=>{ setSelected(null); setOpen(true); }}>
                        <Plus size={16}/>
                        Mark Attendance
                    </Button>
                </div>
                <AttendanceStats attendance={attendance} />
                <div className="flex gap-4">
                    <Input placeholder="Search Employee" value={search} onChange={(e) => setSearch(e.target.value)}/>
                    <Input type="date" value={date} onChange={(e) => setDate(e.target.value)}/>
                </div>
                {
                    filteredAttendance.length===0?
                    (
                        <div className="text-center text-slate-400 py-10">
                            No Attendance Found
                        </div>
                    ):
                        (
                            <div className="space-y-6">
                                {/* <AttendanceSummaryTable
                                    summary={summary}
                                /> */}
                                <AttendanceTable
                                    attendance={paginatedAttendance}
                                    onEdit={(attendance: Attendance) => {
                                        setSelected(attendance);
                                        setOpen(true);
                                    }}
                                    onDelete={handleDelete}
                                />
                            </div>
                        )
                }
                <div className="flex gap-4">
                    <Button className="text-white" disabled={page===1} onClick={() => setPage(page-1)}>
                        Previous
                    </Button>
                    <Button className="text-white" disabled={end>=filteredAttendance.length} onClick={() => setPage(page+1)}>
                        Next
                    </Button>
                </div>
                {/* <AttendanceDialog
                    open={open}
                    onOpenChange={setOpen}
                    employeeId={employeeId}
                    defaultValues={selected ?? undefined}
                    loading={
                        createAttendance.isPending ||
                        updateAttendance.isPending
                    }
                    onSubmit={handleSubmit}
                /> */}
            </div>
        </AppLayout>
    );
}

export default AttendancePage;