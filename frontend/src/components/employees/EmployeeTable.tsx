import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow
} from "@/components/ui/table";

import {
    Pencil,
    Trash2,
    Mail
} from "lucide-react";

import { Badge } from "@/components/ui/badge";

import { Button } from "@/components/ui/button";

import { useNavigate } from "react-router-dom";

interface Props {
    employees: any[];
    currentUser: any;

    onResend: (id: string) => void;
    onDelete: (id: string) => void;
    onEdit: (employee: any) => void;
    onSalary: (employee: any) => void;
}

function EmployeeTable({
    employees,
    currentUser,
    onResend,
    onDelete,
    onEdit,
    onSalary
}: Props) {
    const navigate = useNavigate();
    const canDelete = (employee: any) => {
        // SUPER_ADMIN
        if (currentUser?.role === "SUPER_ADMIN") {
            return employee.user?.role !== "SUPER_ADMIN";
        }
        // HR
        if (currentUser?.role === "HR") {
            return (
                employee.user?.role !== "HR" &&
                employee.user?.role !== "SUPER_ADMIN"
            );
        }
        return false;
    };
    const canAssignSalary = (employee: any) => {
        if (!employee.user?.isVerified)
            return false;
        // SUPER_ADMIN can assign salary to everyone
        if (currentUser?.role === "SUPER_ADMIN")
            return true;
        // HR cannot modify HR or SUPER_ADMIN salaries
        if (currentUser?.role === "HR") {
            return (
                employee.user?.role !== "HR" &&
                employee.user?.role !== "SUPER_ADMIN"
            );
        }
        return false;
    };
    const canEdit = (employee: any) => {
        // SUPER_ADMIN
        if (currentUser?.role === "SUPER_ADMIN") {
            return employee.user?.role !== "SUPER_ADMIN";
        }
        // HR
        if (currentUser?.role === "HR") {
            return (
                employee.user?.role !== "HR" &&
                employee.user?.role !== "SUPER_ADMIN"
            );
        }
        return false;
    };
    return (
        <Table>
            <TableHeader>
                <TableRow>
                    <TableHead>
                        Name
                    </TableHead>
                    <TableHead>
                        Email
                    </TableHead>
                    <TableHead>
                        Role
                    </TableHead>
                    <TableHead>
                        Designation
                    </TableHead>
                    <TableHead>
                        Department
                    </TableHead>
                    <TableHead>
                        Status
                    </TableHead>
                    <TableHead>
                        Joined
                    </TableHead>
                    <TableHead>
                        Actions
                    </TableHead>
                    <TableHead>
                        Salary
                    </TableHead>
                    <TableHead>
                        View Profile
                    </TableHead>
                </TableRow>
            </TableHeader>
            <TableBody>
                {
                    employees.map((employee) => (
                        <TableRow key={employee.id}>
                            <TableCell>
                                {employee.user?.name ?? "--"}
                            </TableCell>
                            <TableCell>
                                {employee.user?.email ?? "--"}
                            </TableCell>
                            <TableCell>
                                {employee.user?.role ?? "--"}
                            </TableCell>
                            <TableCell>
                                {employee.user?.designation ?? "--"}
                            </TableCell>
                            {/* <TableCell>
                                {employee.user?.role === "SUPER_ADMIN"
                                    ? "N/A"
                                    : employee.department?.name ?? "--"}
                            </TableCell> */}
                            <TableCell>
                                { employee.department?.name ?? "--"}
                            </TableCell>
                            <TableCell>
                                <Badge
                                    variant={
                                        employee.user?.isVerified?
                                            "default"
                                            :
                                            "secondary"
                                    }
                                >
                                    {employee.user?.isVerified?  
                                        "Active": "Pending"}
                                </Badge>
                            </TableCell>
                            <TableCell>
                                {
                                    employee.createdAt
                                        ?
                                        new Date(
                                            employee.createdAt
                                        )
                                            .toLocaleDateString()
                                        :
                                        <span className="text-slate-500 ml-3">
                                            —
                                        </span>
                                }
                            </TableCell>
                            <TableCell>
                                <div className="flex gap-2">
                                    {
                                        employee.user?.isVerified ?
                                            (
                                                <Button variant="ghost" size="icon" onClick={() => onEdit(employee)}>
                                                    <Pencil className="h-4 w-4"/>
                                                </Button>
                                            ):
                                            (
                                                <Button variant="ghost" size="icon" onClick={() => onResend(employee.id)}>
                                                    <Mail className="h-4 w-4"/>
                                                </Button>
                                            )
                                    }
                                    {
                                        canDelete(employee) && (
                                            <Button
                                                variant="ghost"
                                                size="icon"
                                                onClick={() => onDelete(employee.id)}
                                            >
                                                <Trash2 className="h-4 w-4 text-red-500" />
                                            </Button>
                                        )
                                    }
                                </div>
                            </TableCell>
                            <TableCell>
                                {
                                    canAssignSalary(employee) ? (
                                        <Button
                                            size="sm"
                                            variant="outline"
                                            onClick={() => onSalary(employee)}
                                        >
                                            Salary
                                        </Button>
                                    ) : (
                                        <span className="text-slate-500 ml-3">
                                            —
                                        </span>
                                    )
                                }
                            </TableCell>
                            {/* <TableCell>
                                {
                                    currentUser?.id === employee.userId
                                        ?
                                        <Button
                                            size="sm"
                                            onClick={() =>
                                                navigate(`/employees/${employee.id}`)
                                            }
                                        >
                                            Profile
                                        </Button>
                                        :
                                        <span className="text-slate-500 ml-5">
                                            —
                                        </span>
                                }

                            </TableCell> */}
                            <TableCell>
                                {
                                    (
                                        currentUser?.role === "SUPER_ADMIN"
                                        ||
                                        (
                                            currentUser?.role === "HR"
                                            &&
                                            employee.user?.role !== "SUPER_ADMIN"
                                        )
                                        ||
                                        currentUser?.id === employee.userId
                                    )?
                                    (
                                            <Button
                                                size="sm"
                                                onClick={() =>
                                                    navigate(
                                                        `/employees/${employee.id}`
                                                    )
                                                }
                                            >
                                                Profile
                                            </Button>
                                        )
                                        :
                                        (
                                            <span
                                                className="text-slate-500 ml-5"
                                            >
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

export default EmployeeTable;