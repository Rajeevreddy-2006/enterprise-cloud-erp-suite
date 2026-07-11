// import type { Department } from "@/types/department.types";
// import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
// import { Button } from "@/components/ui/button";
// import { Pencil, Trash2 } from "lucide-react";

// interface Props{
//     departments:Department[];
//     onEdit:(department:Department)=>void;
//     onDelete:(id:string)=>void;
// }

// function DepartmentTable({ departments,onEdit,onDelete }:Props){
//     return(
//         <Table className="text-white">
//             <TableHeader>
//                 <TableRow className="border-slate-800">
//                     <TableHead className="text-slate-300">Name</TableHead>
//                     <TableHead className="text-slate-300">Created</TableHead>
//                     <TableHead className="text-slate-300">Actions</TableHead>
//                 </TableRow>
//             </TableHeader>
//         <TableBody>
//         {
//         departments.map(department=>(
//             <TableRow key={department.id}>
//                 <TableCell className="text-white"> {department.name} </TableCell>
//                 <TableCell className="text-slate-400"> { new Date( department.createdAt ).toLocaleDateString() } </TableCell>
//                 <TableCell>
//                     <div className="flex gap-2">
//                         <Button size="icon" variant="ghost" className="text-slate-300 hover:text-white" onClick={ ()=>onEdit(department) } > 
//                             <Pencil size={16}/>
//                         </Button>
//                         <Button size="icon" variant="ghost" className="text-slate-300 hover:text-white" onClick={ ()=>onDelete(department.id)} >
//                             <Trash2 size={16} />
//                         </Button>
//                     </div>
//                 </TableCell>
//             </TableRow>
//         ))}
//         </TableBody>
//         </Table>
//     )
// }

// export default DepartmentTable;
import type { Department } from "@/types/department.types";
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow
} from "@/components/ui/table";

import { Button } from "@/components/ui/button";
import { Pencil, Trash2 } from "lucide-react";

interface Props {
    departments: Department[];
    onEdit: (department: Department) => void;
    onDelete: (id: string) => void;
}

function DepartmentTable({
    departments,
    onEdit,
    onDelete
}: Props) {

    return (
        <Table className="text-white">
            <TableHeader>
                <TableRow className="border-slate-800">
                    <TableHead className="text-slate-300">
                        Name
                    </TableHead>

                    <TableHead className="text-slate-300">
                        Employees
                    </TableHead>

                    <TableHead className="text-slate-300">
                        Created
                    </TableHead>

                    <TableHead className="text-slate-300">
                        Actions
                    </TableHead>
                </TableRow>
            </TableHeader>

            <TableBody>

                {departments.map((department) => (

                    <TableRow key={department.id}>

                        <TableCell className="text-white">
                            {department.name}
                        </TableCell>

                        <TableCell className="text-slate-300">
                            {department._count?.employees ?? 0}
                        </TableCell>

                        <TableCell className="text-slate-400">
                            {new Date(
                                department.createdAt
                            ).toLocaleDateString()}
                        </TableCell>

                        <TableCell>

                            <div className="flex gap-2">

                                <Button
                                    size="icon"
                                    variant="ghost"
                                    className="text-slate-300 hover:text-white"
                                    onClick={() =>
                                        onEdit(department)
                                    }
                                >
                                    <Pencil size={16} />
                                </Button>

                                <Button
                                    size="icon"
                                    variant="ghost"
                                    className="text-slate-300 hover:text-white"
                                    onClick={() =>
                                        onDelete(department.id)
                                    }
                                >
                                    <Trash2 size={16} />
                                </Button>

                            </div>

                        </TableCell>

                    </TableRow>

                ))}

            </TableBody>
        </Table>
    );
}

export default DepartmentTable;