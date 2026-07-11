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

    salesOrders: any[];

    onEdit: (salesOrder: any) => void;

    onDelete: (id: string) => void;

    onConfirm: (id: string) => void;

    onComplete: (id: string) => void;

    onCancel: (id: string) => void;

}

function SalesOrderTable({

    salesOrders,

    onEdit,

    onDelete,

    onConfirm,

    onComplete,

    onCancel

}: Props) {

    const getStatusVariant = (

        status: string

    ) => {

        switch (status) {

            case "PENDING":

                return "secondary";

            case "CONFIRMED":

                return "default";

            case "COMPLETED":

                return "default";

            case "CANCELLED":

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

                            Order No

                        </TableHead>

                        <TableHead>

                            Customer

                        </TableHead>

                        <TableHead>

                            Inventory Item

                        </TableHead>

                        <TableHead>

                            Qty

                        </TableHead>

                        <TableHead>

                            Unit Price

                        </TableHead>

                        <TableHead>

                            Total

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

                        salesOrders.length === 0 ?

                        (

                            <TableRow>

                                <TableCell

                                    colSpan={8}

                                    className="text-center py-8 text-muted-foreground"

                                >

                                    No Sales Orders Found

                                </TableCell>

                            </TableRow>

                        )

                        :

                        (

                            salesOrders.map(

                                (

                                    order: any

                                ) => (

                                    <TableRow

                                        key={order.id}

                                    >

                                        <TableCell className="font-medium">

                                            {

                                                order.orderNumber

                                            }

                                        </TableCell>

                                        <TableCell>

                                            {

                                                order.customer?.name

                                                ||

                                                "-"

                                            }

                                        </TableCell>

                                        <TableCell>

                                            {

                                                order.inventoryItem?.name

                                                ||

                                                "-"

                                            }

                                        </TableCell>

                                        <TableCell>

                                            {

                                                order.quantity

                                            }

                                        </TableCell>

                                        <TableCell>

                                            ₹

                                            {

                                                parseFloat(

                                                    order.unitPrice ?? "0"

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

                                            ₹

                                            {

                                                parseFloat(

                                                    order.totalAmount ?? "0"

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

                                            <Badge

                                                variant={

                                                    getStatusVariant(

                                                        order.status

                                                    ) as any

                                                }

                                            >

                                                {

                                                    order.status

                                                }

                                            </Badge>

                                        </TableCell>
                                        <TableCell>

                                            <div className="flex flex-wrap gap-2">

                                                {

                                                    order.status === "PENDING" && (

                                                        <>

                                                            <Button

                                                                size="sm"

                                                                className="text-white"

                                                                onClick={() =>

                                                                    onConfirm(order.id)

                                                                }

                                                            >

                                                                Confirm

                                                            </Button>

                                                            <Button

                                                                size="sm"

                                                                variant="destructive"

                                                                onClick={() =>

                                                                    onCancel(order.id)

                                                                }

                                                            >

                                                                Cancel

                                                            </Button>

                                                            <Button

                                                                size="sm"

                                                                variant="outline"

                                                                onClick={() =>

                                                                    onEdit(order)

                                                                }

                                                            >

                                                                Edit

                                                            </Button>

                                                        </>

                                                    )

                                                }

                                                {

                                                    order.status === "CONFIRMED" && (

                                                        <>

                                                            <Button

                                                                size="sm"

                                                                className="text-white"

                                                                onClick={() =>

                                                                    onComplete(order.id)

                                                                }

                                                            >

                                                                Complete

                                                            </Button>

                                                            <Button

                                                                size="sm"

                                                                variant="destructive"

                                                                onClick={() =>

                                                                    onCancel(order.id)

                                                                }

                                                            >

                                                                Cancel

                                                            </Button>

                                                        </>

                                                    )

                                                }

                                                {

                                                    order.status === "COMPLETED" && (

                                                        <span className="text-green-600 font-medium">

                                                            ✓ Completed

                                                        </span>

                                                    )

                                                }

                                                {

                                                    order.status === "CANCELLED" && (

                                                        <span className="text-red-600 font-medium">

                                                            ✕ Cancelled

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

export default SalesOrderTable;