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

    purchaseOrders: any[];

    onEdit: (
        purchaseOrder: any
    ) => void;

    onDelete: (
        id: string
    ) => void;

}

function PurchaseOrderTable({

    purchaseOrders,

    onEdit,

    onDelete

}: Props) {

    const getStatusVariant = (

        status: string

    ) => {

        switch (status) {

            case "APPROVED":

                return "default";

            case "RECEIVED":

                return "secondary";

            case "CANCELLED":

                return "destructive";

            case "PENDING":

                return "outline";

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

                            Order No.

                        </TableHead>

                        <TableHead>

                            Inventory Item

                        </TableHead>

                        <TableHead>

                            Supplier

                        </TableHead>

                        <TableHead>

                            Quantity

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

                            Created

                        </TableHead>

                        <TableHead>

                            Actions

                        </TableHead>

                    </TableRow>

                </TableHeader>

                <TableBody>

                    {

                        purchaseOrders.length === 0 ?

                        (

                            <TableRow>

                                <TableCell

                                    colSpan={9}

                                    className="text-center py-8"

                                >

                                    No Purchase Orders Found

                                </TableCell>

                            </TableRow>

                        )

                        :

                        (

                            purchaseOrders.map(

                                (

                                    order: any

                                ) => (

                                    <TableRow

                                        key={order.id}

                                    >

                                        <TableCell>

                                            {

                                                order.orderNumber

                                            }

                                        </TableCell>

                                        <TableCell>

                                            {

                                                order.inventoryItem?.name ||

                                                "-"

                                            }

                                        </TableCell>

                                        <TableCell>

                                            {

                                                order.supplier?.name ||

                                                "-"

                                            }

                                        </TableCell>

                                        <TableCell>

                                            {

                                                order.quantity

                                            }

                                        </TableCell>

                                        <TableCell>

                                            ₹{

                                                Number(

                                                    order.unitPrice

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

                                            ₹{

                                                (

                                                    Number(

                                                        order.quantity

                                                    )

                                                    *

                                                    Number(

                                                        order.unitPrice

                                                    )

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

                                            {

                                                new Date(

                                                    order.createdAt

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

                                                            order

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

                                                            order.id

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

export default PurchaseOrderTable;