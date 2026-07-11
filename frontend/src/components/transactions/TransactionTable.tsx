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

interface Props {

    transactions: any[];

    onEdit: (transaction: any) => void;

    onDelete: (id: string) => void;

}

function TransactionTable({

    transactions,

    onEdit,

    onDelete

}: Props) {

    const getTypeVariant = (

        type: string

    ) => {

        switch (type) {

            case "DEBIT":

                return "destructive";

            case "CREDIT":

                return "default";

            default:

                return "secondary";

        }

    };

    return (

        <div className="rounded-lg border">

            <Table>

                <TableHeader>

                    <TableRow>

                        <TableHead>

                            Description

                        </TableHead>

                        <TableHead>

                            Account

                        </TableHead>

                        <TableHead>

                            Type

                        </TableHead>

                        <TableHead>

                            Amount

                        </TableHead>

                        <TableHead>

                            Date

                        </TableHead>

                        <TableHead>

                            Actions

                        </TableHead>

                    </TableRow>

                </TableHeader>

                <TableBody>

                    {

                        transactions.length === 0 ?

                        (

                            <TableRow>

                                <TableCell

                                    colSpan={6}

                                    className="text-center py-8"

                                >

                                    No Transactions Found

                                </TableCell>

                            </TableRow>

                        )

                        :

                        (

                            transactions.map(

                                (

                                    transaction: any

                                ) => (

                                    <TableRow

                                        key={transaction.id}

                                    >

                                        <TableCell>

                                            {

                                                transaction.description

                                            }

                                        </TableCell>

                                        <TableCell>

                                            {

                                                transaction.account?.name ||

                                                "-"

                                            }

                                        </TableCell>

                                        <TableCell>

                                            <Badge

                                                variant={

                                                    getTypeVariant(

                                                        transaction.type

                                                    ) as any

                                                }

                                            >

                                                {

                                                    transaction.type

                                                }

                                            </Badge>

                                        </TableCell>

                                        <TableCell>

                                            ₹

                                            {

                                                Number(

                                                    transaction.amount

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

                                                    transaction.createdAt

                                                ).toLocaleDateString(

                                                    "en-GB"

                                                )

                                            }

                                        </TableCell>

                                        <TableCell>

                                            <div className="flex gap-2">

                                                <Button

                                                    size="sm"

                                                    variant="outline"

                                                    onClick={() =>

                                                        onEdit(

                                                            transaction

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

                                                            transaction.id

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

export default TransactionTable;