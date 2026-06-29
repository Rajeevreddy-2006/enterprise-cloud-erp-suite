import type { Payroll } from "@/types/payroll.types";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Pencil, Trash2 } from "lucide-react";
const colors={
    PENDING: "bg-yellow-500/20 text-yellow-400",
    PROCESSED: "bg-blue-500/20 text-blue-400",
    PAID: "bg-green-500/20 text-green-400"
};

interface Props{
    payrolls:Payroll[];
    onEdit:(payroll:Payroll)=>void;
    onDelete:(id:string)=>void;
}

function PayrollTable({payrolls,onEdit,onDelete }:Props){
    return(
        <Table>
        <TableHeader>
            <TableRow>
                <TableHead> Employee </TableHead>
                <TableHead> Month </TableHead>
                <TableHead> Year </TableHead>
                <TableHead> Gross </TableHead>
                <TableHead> Deductions </TableHead>
                <TableHead> Net </TableHead>
                <TableHead> Status </TableHead>
                <TableHead> Actions </TableHead>
            </TableRow>
        </TableHeader>
        <TableBody>
        {
            payrolls.map((payroll)=>(
            <TableRow key={payroll.id}>
                <TableCell> { payroll.employee?.firstName }{" "}{ payroll.employee?.lastName } </TableCell>
                <TableCell> { payroll.month } </TableCell>
                <TableCell> { payroll.year } </TableCell>
                <TableCell> ₹{ payroll.grossSalary } </TableCell>
                <TableCell> ₹{ payroll.deductions } </TableCell>
                <TableCell> ₹{ payroll.netSalary } </TableCell>
                <TableCell> <span className={`px-2 py-1 rounded-full text-xs ${colors[payroll.status]}` }> { payroll.status } </span> </TableCell>
                <TableCell>
                    <div className="flex gap-2">
                        <Button size="icon" variant="ghost" onClick={()=>onEdit(payroll)}> <Pencil size={16}/> </Button>
                        <Button size="icon" variant="ghost" onClick={()=>onDelete(payroll.id)}> <Trash2 size={16}/> </Button>
                    </div>
                </TableCell>
            </TableRow>
            ))
            }
        </TableBody>
        </Table>
    );
}

export default PayrollTable;