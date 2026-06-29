import type { Department } from "@/types/department.types";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Pencil, Trash2 } from "lucide-react";

interface Props{
    departments:Department[];
    onEdit:(department:Department)=>void;
    onDelete:(id:string)=>void;
}

function DepartmentTable({ departments,onEdit,onDelete }:Props){
    return(
    <Table>
        <TableHeader>
            <TableRow>
                <TableHead>Name</TableHead>
                <TableHead>Created</TableHead>
                <TableHead>Actions</TableHead>
            </TableRow>
        </TableHeader>
    <TableBody>
    {
    departments.map(department=>(
        <TableRow key={department.id}>
            <TableCell> {department.name} </TableCell>
            <TableCell> { new Date( department.createdAt ).toLocaleDateString() } </TableCell>
            <TableCell>
                <div className="flex gap-2">
                    <Button size="icon" variant="ghost" onClick={ ()=>onEdit(department) } > 
                        <Pencil size={16}/>
                    </Button>
                    <Button size="icon" variant="ghost" onClick={ ()=>onDelete(department.id)} >
                        <Trash2 size={16} />
                    </Button>
                </div>
            </TableCell>
        </TableRow>
    ))}
    </TableBody>
    </Table>
    )
}

export default DepartmentTable;