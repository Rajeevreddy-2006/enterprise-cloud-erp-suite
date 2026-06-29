import {Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Button } from "@/components/ui/button";

interface Props{
    employees:any[];
    onEdit:(employee:any)=>void;
    onDelete:(id:string)=>void;
}

function EmployeeTable({employees,onEdit,onDelete}:Props){
    return(
        <Table>
        <TableHeader>
            <TableRow>
                <TableHead> ID </TableHead>
                <TableHead> Name </TableHead>
                <TableHead> Email </TableHead>
                <TableHead> Designation </TableHead>
                <TableHead> Department </TableHead>
                <TableHead> Actions </TableHead>
            </TableRow>
        </TableHeader>
        <TableBody>
        {
            employees.map((employee)=>(
                <TableRow key={employee.id}>
                    <TableCell> {employee.employeeId} </TableCell>
                    <TableCell> {employee.firstName} {" "} {employee.lastName} </TableCell>
                    <TableCell> {employee.email} </TableCell>
                    <TableCell> {employee.designation} </TableCell>
                    <TableCell> {employee.department?.name} </TableCell>
                    <TableCell>
                        <div className="flex gap-2">
                            <Button size="sm" onClick={()=> onEdit(employee) }> Edit </Button>
                            <Button variant="destructive" size="sm" onClick={()=> onDelete(employee.id) }> Delete </Button>
                        </div>
                    </TableCell>
                </TableRow>
            ))
        }
        </TableBody>
        </Table>
    )
}

export default EmployeeTable;