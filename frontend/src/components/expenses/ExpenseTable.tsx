import {
    Badge
} from "@/components/ui/badge";

import {
    Button
} from "@/components/ui/button";

import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow
} from "@/components/ui/table";

interface Props {

    expenses: any[];

    onEdit: (
        expense: any
    ) => void;

    onDelete: (
        id: string
    ) => void;

}

function ExpenseTable({

    expenses,

    onEdit,

    onDelete

}: Props) {

    const getStatusVariant = (

        status: string

    ) => {

        switch (status) {

            case "APPROVED":

                return "default";

            case "REJECTED":

                return "destructive";

            case "PENDING":

                return "secondary";

            default:

                return "outline";

        }

    };

    return (

        <div className="rounded-lg border">

            <Table>

                <TableHeader>

                    <TableRow>

                        <TableHead>

                            Title

                        </TableHead>

                        <TableHead>

                            Employee

                        </TableHead>

                        <TableHead>

                            Amount

                        </TableHead>

                        <TableHead>

                            Expense Date

                        </TableHead>

                        <TableHead>

                            Status

                        </TableHead>

                        <TableHead>

                            Actions

                        </TableHead>

                    </TableRow>

                </TableHeader>

                <TableBody>

                    {

                        expenses.length === 0 ?

                        (

                            <TableRow>

                                <TableCell

                                    colSpan={6}

                                    className="text-center py-8"

                                >

                                    No Expenses Found

                                </TableCell>

                            </TableRow>

                        )

                        :

                        (

                            expenses.map(

                                (

                                    expense: any

                                ) => (

                                    <TableRow

                                        key={expense.id}

                                    >

                                        <TableCell>

                                            {

                                                expense.title

                                            }

                                        </TableCell>

                                        <TableCell>

                                            {

                                                expense.employee

                                                    ?

                                                    `${expense.employee.firstName} ${expense.employee.lastName}`

                                                    :

                                                    "-"

                                            }

                                        </TableCell>

                                        <TableCell>

                                            ₹

                                            {

                                                Number(

                                                    expense.amount

                                                ).toLocaleString(

                                                    "en-IN",

                                                    {

                                                        minimumFractionDigits: 2,

                                                        maximumFractionDigits: 2

                                                    }

                                                )

                                            }

                                        </TableCell>

                                        <TableCell>

                                            {

                                                new Date(

                                                    expense.expenseDate

                                                ).toLocaleDateString(

                                                    "en-GB"

                                                )

                                            }

                                        </TableCell>

                                        <TableCell>

                                            <Badge

                                                variant={

                                                    getStatusVariant(

                                                        expense.status

                                                    ) as any

                                                }

                                            >

                                                {

                                                    expense.status

                                                }

                                            </Badge>

                                        </TableCell>

                                        <TableCell>

                                            <div className="flex gap-2">

                                                <Button

                                                    size="sm"

                                                    variant="outline"

                                                    onClick={() =>

                                                        onEdit(

                                                            expense

                                                        )

                                                    }

                                                >

                                                    Edit

                                                </Button>

                                                <Button

                                                    size="sm"

                                                    variant="destructive"

                                                    onClick={() =>

                                                        onDelete(

                                                            expense.id

                                                        )

                                                    }

                                                >

                                                    Delete

                                                </Button>

                                            </div>

                                        </TableCell>

                                    </TableRow>

                                )

                            )

                        )

                    }

                </TableBody>

            </Table>

        </div>

    );

}

export default ExpenseTable;