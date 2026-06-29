import type { Attendance } from "@/types/attendance.types";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Pencil,Trash2 } from "lucide-react";

const colors={
    PRESENT: "bg-green-500/20 text-green-400",
    ABSENT: "bg-red-500/20 text-red-400",
    HALF_DAY: "bg-yellow-500/20 text-yellow-400",
    LEAVE: "bg-purple-500/20 text-purple-400"
};

function AttendanceTable({ attendance,onEdit,onDelete }:any){
    return(
        <Table>
        <TableHeader>
            <TableRow>
                <TableHead> Employee </TableHead>
                <TableHead> Date </TableHead>
                <TableHead> Status </TableHead>
                <TableHead> Check In </TableHead>
                <TableHead> Check Out </TableHead>
                <TableHead> Actions </TableHead>
            </TableRow>
        </TableHeader>
        <TableBody>
        {
            attendance.map((item:Attendance)=>(
                <TableRow key={item.id}>
                    <TableCell> { item.employee?.name } </TableCell>
                    <TableCell> { new Date( item.date ).toLocaleDateString() } </TableCell>
                    <TableCell> <span className={`px-2 py-1 rounded-full text-xs font-medium ${colors[item.status]}` }> { item.status } </span> </TableCell>
                    <TableCell> { item.checkIn || "--" } </TableCell>
                    <TableCell> { item.checkOut || "--" } </TableCell>
                    <TableCell> 
                        <Button variant="ghost" size="icon" onClick={()=>onEdit(item)}> <Pencil size={16}/> </Button> 
                        <Button variant="ghost" size="icon" onClick={()=>onDelete(item.id)}> <Trash2 size={16} /> </Button>
                    </TableCell>
                </TableRow>
            ))
        }
        </TableBody>
        </Table>
    )
}

export default AttendanceTable;