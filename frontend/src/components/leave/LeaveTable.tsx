import type { Leave } from "@/types/leave.types";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Pencil, Trash2 } from "lucide-react";

const colors={
    PENDING: "bg-yellow-500/20 text-yellow-400",
    APPROVED: "bg-green-500/20 text-green-400",
    REJECTED: "bg-red-500/20 text-red-400"
};

interface Props{
    leaves:Leave[];
    onEdit:(leave:Leave)=>void;
    onDelete:(id:string)=>void;
    onApprove:(id:string)=>void;
    onReject:(id:string)=>void;
}

function LeaveTable({ leaves, onEdit, onDelete, onApprove, onReject }:Props){
    return(
        <Table>
        <TableHeader>
            <TableRow>
                <TableHead> Employee </TableHead>
                <TableHead> Type </TableHead>
                <TableHead> Start </TableHead>
                <TableHead> End </TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Approval</TableHead>
                <TableHead>Actions</TableHead>
            </TableRow>
        </TableHeader>
        <TableBody>
        {
            leaves.map((leave)=>(
            <TableRow key={leave.id}>
                <TableCell> { leave.employee?.firstName }{" "}{ leave.employee?.lastName } </TableCell>
                <TableCell> { leave.leaveType } </TableCell>
                <TableCell> { leave.startDate.slice(0,10) } </TableCell>
                <TableCell> { leave.endDate.slice(0,10) } </TableCell>
                <TableCell> <span className={`px-2 py-1 rounded-full text-xs ${colors[leave.status]}`}> { leave.status } </span> </TableCell>
                <TableCell>
                    <div className="flex gap-2">
                        <Button size="icon" variant="ghost" onClick={()=>onEdit(leave)}> <Pencil size={16}/> </Button>
                        <Button size="icon" variant="ghost" onClick={()=>onDelete(leave.id)}> <Trash2 size={16}/> </Button>
                    </div>
                </TableCell>
                <TableCell>
                    <div className="flex gap-2">
                        <Button size="sm" className="bg-green-600" onClick={ () => onApprove(leave.id) }> Approve </Button>
                        <Button size="sm" variant="destructive" onClick={ () => onReject(leave.id) }> Reject </Button>
                    </div>
                </TableCell>
            </TableRow>
            ))
        }
        </TableBody>
        </Table>
    );
}

export default LeaveTable;