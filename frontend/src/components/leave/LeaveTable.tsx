import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow
} from "@/components/ui/table";

import { Button } from "@/components/ui/button";

import type { Leave } from "@/types/leave.types";

import { useNavigate } from "react-router-dom";

interface Props {

    leaves: Leave[];

    showActions?: boolean;

    onApprove?: (id: string) => void;

    onReject?: (id: string) => void;

}

function LeaveTable({

    leaves,

    showActions = false,

    onApprove,

    onReject

}: Props) {
    
    const navigate = useNavigate();

    return (

        <Table>

            <TableHeader>

                <TableRow>

                    <TableHead>
                        Employee
                    </TableHead>

                    <TableHead>
                        Profile
                    </TableHead>

                    <TableHead>
                        Type
                    </TableHead>

                    <TableHead>
                        From
                    </TableHead>

                    <TableHead>
                        To
                    </TableHead>

                    <TableHead>
                        Status
                    </TableHead>

                    <TableHead>
                        Reason
                    </TableHead>

                    {

                        showActions && (

                            <TableHead>

                                Actions

                            </TableHead>

                        )

                    }

                </TableRow>

            </TableHeader>

            <TableBody>

                {

                    leaves.map(

                        (

                            leave

                        ) => (

                            <TableRow

                                key={leave.id}

                            >
                                <TableCell>

                                    {
                                        leave.employee
                                            ?

                                            `${leave.employee.firstName} ${leave.employee.lastName}`

                                            :

                                            "--"
                                    }

                                </TableCell>

                                <TableCell>

                                <Button

                                size="sm"

                                variant="outline"

                                onClick={() =>

                                navigate(

                                `/employees/${leave.employeeId}`

                                )

                                }

                                >

                                Profile

                                </Button>

                                </TableCell>

                                <TableCell>

                                    {

                                        leave.leaveType

                                    }

                                </TableCell>

                                <TableCell>

                                    {

                                        new Date(

                                            leave.startDate

                                        )

                                            .toLocaleDateString()

                                    }

                                </TableCell>

                                <TableCell>

                                    {

                                        new Date(

                                            leave.endDate

                                        )

                                            .toLocaleDateString()

                                    }

                                </TableCell>

                                <TableCell>

                                    <span

                                        className={

                                            leave.status === "APPROVED"

                                                ?

                                                "text-green-500 font-semibold"

                                                :

                                                leave.status === "REJECTED"

                                                    ?

                                                    "text-red-500 font-semibold"

                                                    :

                                                    "text-yellow-500 font-semibold"

                                        }

                                    >

                                        {

                                            leave.status

                                        }

                                    </span>

                                </TableCell>

                                <TableCell>

                                    {

                                        leave.reason ||

                                        "--"

                                    }

                                </TableCell>

                                {

                                    showActions

                                    &&

                                    (

                                        <TableCell>

                                            {
                                                leave.status === "PENDING"

                                                    ?

                                                    (

                                                        <div className="flex gap-2">

                                                            <Button
                                                                size="sm"
                                                                onClick={() =>
                                                                    onApprove?.(leave.id)
                                                                }
                                                            >
                                                                Approve
                                                            </Button>

                                                            <Button
                                                                size="sm"
                                                                variant="destructive"
                                                                onClick={() =>
                                                                    onReject?.(leave.id)
                                                                }
                                                            >
                                                                Reject
                                                            </Button>

                                                        </div>

                                                    )

                                                    :

                                                    (

                                                        <span className="text-slate-500 ml-4">

                                                            —

                                                        </span>

                                                    )

                                            }

                                        </TableCell>

                                    )

                                }

                            </TableRow>

                        )

                    )

                }

            </TableBody>

        </Table>

    );

}

export default LeaveTable;