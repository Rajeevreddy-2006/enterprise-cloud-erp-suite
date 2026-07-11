import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow
} from "@/components/ui/table";

import {
    Button
} from "@/components/ui/button";

import {
    Badge
} from "@/components/ui/badge";

import payrollService
    from "@/services/payroll.service";

interface Props {

    payrolls: any[];

    showActions?: boolean;

    showDelete?: boolean;

    canDelete?: boolean;

    onPay?: (
        id: string
    ) => void;

    onDelete?: (
        id: string
    ) => void;

}

const monthNames = [

    "January",

    "February",

    "March",

    "April",

    "May",

    "June",

    "July",

    "August",

    "September",

    "October",

    "November",

    "December"

];

function PayrollTable({

    payrolls,

    showActions = false,

    showDelete = false,

    canDelete = false,

    onPay,

    onDelete

}: Props) {

    return (

        <Table>

            <TableHeader>

                <TableRow>

                    <TableHead>

                        Profile

                    </TableHead>

                    <TableHead>

                        Month

                    </TableHead>

                    <TableHead>

                        Year

                    </TableHead>

                    <TableHead>

                        Gross Salary

                    </TableHead>

                    <TableHead>

                        Deductions

                    </TableHead>

                    <TableHead>

                        Net Salary

                    </TableHead>

                    <TableHead>

                        Status

                    </TableHead>

                    <TableHead>

                        Payslip

                    </TableHead>

                    {

                        (showActions ||

                            (showDelete && canDelete))

                        &&

                        (

                            <TableHead>

                                Actions

                            </TableHead>

                        )

                    }

                </TableRow>

            </TableHeader>

            <TableBody>

                {

                    payrolls.length === 0

                        ?

                        (

                            <TableRow>

                                <TableCell

                                    colSpan={

                                        (showActions ||

                                            (showDelete && canDelete))

                                            ?

                                            9

                                            :

                                            8

                                    }

                                    className="text-center py-10"

                                >

                                    No Payroll Generated

                                </TableCell>

                            </TableRow>

                        )

                        :

                        (

                            payrolls.map(

                                (payroll: any) => (

                                    <TableRow

                                        key={payroll.id}

                                    >

                                        <TableCell>

                                            <Button

                                                size="sm"

                                                variant="outline"

                                                onClick={() => {

                                                    window.open(

                                                        `/employees/${payroll.employeeId}`,

                                                        "_blank"

                                                    );

                                                }}

                                            >

                                                Profile

                                            </Button>

                                        </TableCell>

                                        <TableCell>

                                            {

                                                monthNames[

                                                payroll.month - 1

                                                ]

                                            }

                                        </TableCell>

                                        <TableCell>

                                            {

                                                payroll.year

                                            }

                                        </TableCell>

                                        <TableCell>

                                            ₹{

                                                Number(

                                                    payroll.grossSalary

                                                )

                                                    .toLocaleString()

                                            }

                                        </TableCell>

                                        <TableCell>

                                            ₹{

                                                Number(

                                                    payroll.deductions

                                                )

                                                    .toLocaleString()

                                            }

                                        </TableCell>

                                        <TableCell>

                                            ₹{

                                                Number(

                                                    payroll.netSalary

                                                )

                                                    .toLocaleString()

                                            }

                                        </TableCell>

                                        <TableCell>

                                            <Badge

                                                variant={

                                                    payroll.status === "PAID"

                                                        ?

                                                        "default"

                                                        :

                                                        payroll.status === "PENDING"

                                                            ?

                                                            "secondary"

                                                            :

                                                            "outline"

                                                }

                                            >

                                                {

                                                    payroll.status

                                                }

                                            </Badge>

                                        </TableCell>

                                        <TableCell>

                                            {

                                                payroll.status === "PAID"

                                                    ?

                                                    (

                                                        <Button

                                                            size="sm"

                                                            onClick={() => {

                                                                payrollService

                                                                    .downloadPayslip(

                                                                        payroll.id

                                                                    );

                                                            }}

                                                        >

                                                            Download

                                                        </Button>

                                                    )

                                                    :

                                                    (

                                                        <span>

                                                            —

                                                        </span>

                                                    )

                                            }

                                        </TableCell>

                                        {

                                            (showActions ||

                                                (showDelete && canDelete))

                                            &&

                                            (

                                                <TableCell>

                                                    <div

                                                        className="

flex

gap-2

"

                                                    >

                                                        {

                                                            showActions

                                                            &&

                                                            payroll.status === "PENDING"

                                                            &&

                                                            (

                                                                <Button

                                                                    size="sm"

                                                                    onClick={() => {

                                                                        onPay?.(

                                                                            payroll.id

                                                                        );

                                                                    }}

                                                                >

                                                                    Approve Payment

                                                                </Button>

                                                            )

                                                        }

                                                        {
                                                            (showDelete
                                                            &&
                                                            canDelete)?
                                                            // &&
                                                            (
                                                                payroll.status === "PAID"

                                                                    ?

                                                                    <span
                                                                        className="text-xs text-muted-foreground"
                                                                    >
                                                                        Locked
                                                                    </span>

                                                                    :

                                                                    <Button
                                                                        size="sm"
                                                                        variant="destructive"
                                                                        onClick={() =>
                                                                            onDelete?.(
                                                                                payroll.id
                                                                            )
                                                                        }
                                                                    >
                                                                        Delete
                                                                    </Button>
                                                            )
                                                            : <span className="ml-4">--</span>
                                                        }

                                                    </div>

                                                </TableCell>

                                            )

                                        }

                                    </TableRow>

                                )

                            )

                        )

                }

            </TableBody>

        </Table>

    );

}

export default PayrollTable;