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
    currentUser: any;
    onEdit: (salary: SalaryStructure) => void;
    onDelete: (id: string) => void;
}

function SalaryStructureTable({ salaryStructures,currentUser,onEdit,onDelete }: Props) {
    const canManageSalary = (employee: any) => {
        if (!employee?.user?.isVerified)
            return false;
        if (currentUser?.role === "SUPER_ADMIN")
            return true;
        if (currentUser?.role === "HR") {
            return (
                employee.user.role !== "HR"
                &&
                employee.user.role !== "SUPER_ADMIN"
            );
        }
        return false;
    };
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
                                {
                                    canManageSalary(salary.employee) ? (
                                        <div className="flex gap-2">
                                            <Button
                                                variant="ghost"
                                                size="icon"
                                                onClick={() => onEdit(salary)}
                                            >
                                                <Pencil className="h-4 w-4" />
                                            </Button>
                                            <Button
                                                variant="ghost"
                                                size="icon"
                                                onClick={() => onDelete(salary.id)}
                                            >
                                                <Trash2
                                                    className="h-4 w-4 text-red-500"
                                                />
                                            </Button>
                                        </div>
                                    ) : (
                                        <span className="text-slate-500">
                                            —
                                        </span>
                                    )
                                }
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