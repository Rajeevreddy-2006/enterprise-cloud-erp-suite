import type { SalaryStructure } from "@/types/salary.types";
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Pencil,Trash2 } from "lucide-react";

interface Props {
    salaryStructures: SalaryStructure[];
    onEdit: (salary: SalaryStructure) => void;
    onDelete: (id: string) => void;
}

function SalaryStructureTable({ salaryStructures,onEdit,onDelete }: Props) {
    return (
        <Table>
            <TableHeader>
                <TableRow>
                    <TableHead> Employee </TableHead>
                    <TableHead> Basic </TableHead>
                    <TableHead> HRA </TableHead>
                    <TableHead> Bonus </TableHead>
                    <TableHead> PF % </TableHead>
                    <TableHead> Tax % </TableHead>
                    <TableHead> Gross </TableHead>
                    <TableHead> Net </TableHead>
                    <TableHead> Actions </TableHead>
                </TableRow>
            </TableHeader>
            <TableBody>
                {
                    salaryStructures.map((salary) => (
                            <TableRow key={salary.id}>
                                <TableCell> { salary.employee?.firstName }{" "}{ salary.employee?.lastName } </TableCell>
                                <TableCell> ₹{ salary.basicSalary } </TableCell>
                                <TableCell> ₹{ salary.hra } </TableCell>
                                <TableCell> ₹{ salary.bonus } </TableCell>
                                <TableCell> { salary.pfPercentage }% </TableCell>
                                <TableCell> { salary.taxPercentage }% </TableCell>
                                <TableCell> ₹{ Number(salary.basicSalary) + Number(salary.hra) + Number(salary.bonus) } </TableCell>
                                <TableCell> ₹{(Number(salary.basicSalary) + Number(salary.hra) + Number(salary.bonus))*
                                            (1 - (Number(salary.pfPercentage) + Number(salary.taxPercentage))/100)}
                                </TableCell>
                                <TableCell>
                                    <div className="flex gap-2">
                                        <Button size="icon" variant="ghost" onClick={() => onEdit(salary)}> <Pencil size={16}/> </Button>
                                        <Button size="icon" variant="ghost" onClick={() => onDelete(salary.id)}> <Trash2 size={16}/> </Button>
                                    </div>
                                </TableCell>
                            </TableRow>
                        )
                    )
                }
            </TableBody>
        </Table>
    );
}

export default SalaryStructureTable;