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

    payments: any[];

    onEdit: (payment: any) => void;

    onDelete: (id: string) => void;

    onComplete: (id: string) => void;

    onFail: (id: string) => void;

}

function PaymentTable({

    payments,

    onEdit,

    onDelete,

    onComplete,

    onFail

}: Props) {

    const getStatusVariant = (

        status: string

    ) => {

        switch (status) {

            case "PENDING":

                return "secondary";

            case "COMPLETED":

                return "default";

            case "FAILED":

                return "destructive";

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

                            Payment No

                        </TableHead>

                        <TableHead>

                            Invoice

                        </TableHead>

                        <TableHead>

                            Customer

                        </TableHead>

                        <TableHead>

                            Amount

                        </TableHead>

                        <TableHead>

                            Payment Date

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

                        payments.length === 0 ?

                        (

                            <TableRow>

                                <TableCell

                                    colSpan={7}

                                    className="text-center py-8"

                                >

                                    No Payments Found

                                </TableCell>

                            </TableRow>

                        )

                        :

                        (

                            payments.map(

                                (

                                    payment: any

                                ) => (

                                    <TableRow

                                        key={payment.id}

                                    >

                                        <TableCell>

                                            {

                                                payment.paymentNumber

                                            }

                                        </TableCell>

                                        <TableCell>

                                            {

                                                payment.invoice?.invoiceNumber ||

                                                "-"

                                            }

                                        </TableCell>

                                        <TableCell>

                                            {

                                                payment.invoice?.salesOrder?.customer?.name ||

                                                "-"

                                            }

                                        </TableCell>

                                        <TableCell>

                                            ₹

                                            {

                                                Number(

                                                    payment.amount

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

                                                payment.paymentDate ?

                                                new Date(

                                                    payment.paymentDate

                                                ).toLocaleDateString(

                                                    "en-GB"

                                                )

                                                :

                                                "-"

                                            }

                                        </TableCell>

                                        <TableCell>

                                            <Badge

                                                variant={

                                                    getStatusVariant(

                                                        payment.status

                                                    ) as any

                                                }

                                            >

                                                {

                                                    payment.status

                                                }

                                            </Badge>

                                        </TableCell>

                                        <TableCell>

                                            <div className="flex flex-wrap gap-2">

                                                {

                                                    payment.status === "PENDING" && (

                                                        <>

                                                            <Button

                                                                size="sm"

                                                                className="text-white"

                                                                onClick={() =>

                                                                    onComplete(payment.id)

                                                                }

                                                            >

                                                                Complete

                                                            </Button>

                                                            <Button

                                                                size="sm"

                                                                variant="destructive"

                                                                onClick={() =>

                                                                    onFail(payment.id)

                                                                }

                                                            >

                                                                Fail

                                                            </Button>

                                                            <Button

                                                                size="sm"

                                                                variant="outline"

                                                                onClick={() =>

                                                                    onEdit(payment)

                                                                }

                                                            >

                                                                Edit

                                                            </Button>

                                                        </>

                                                    )

                                                }

                                                {

                                                    payment.status === "COMPLETED" && (

                                                        <span className="text-green-600 font-semibold">

                                                            ✓ Completed

                                                        </span>

                                                    )

                                                }

                                                {

                                                    payment.status === "FAILED" && (

                                                        <span className="text-red-600 font-semibold">

                                                            ✕ Failed

                                                        </span>

                                                    )

                                                }

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

export default PaymentTable;