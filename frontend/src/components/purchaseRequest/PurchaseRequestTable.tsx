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

    requests: any[];

    onEdit: (
        request: any
    ) => void;

    onDelete: (
        id: string
    ) => void;

    onApprove: (
        id: string
    ) => void;

    onReject: (
        id: string
    ) => void;

    onCreatePO: (
        id: string
    ) => void;

}

function PurchaseRequestTable({

    requests,

    onEdit,

    onDelete,

    onApprove,

    onReject,

    onCreatePO

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

                            Inventory Item

                        </TableHead>

                        <TableHead>

                            Quantity

                        </TableHead>

                        <TableHead>

                            Requested By

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

                        requests.length === 0 ?

                        (

                            <TableRow>

                                <TableCell

                                    colSpan={6}

                                    className="text-center py-8"

                                >

                                    No Purchase Requests Found

                                </TableCell>

                            </TableRow>

                        )

                        :

                        (

                            requests.map(

                                (

                                    request: any

                                ) => (

                                    <TableRow

                                        key={request.id}

                                    >

                                        <TableCell>

                                            {

                                                request.title

                                            }

                                        </TableCell>

                                        <TableCell>

                                            {

                                                request.inventoryItem?.name ||

                                                "-"

                                            }

                                        </TableCell>

                                        <TableCell>

                                            {

                                                request.quantity

                                            }

                                        </TableCell>

                                        <TableCell>

                                            {

                                                request.requestedBy?.name ||

                                                request.requestedBy?.email ||

                                                "-"

                                            }

                                        </TableCell>

                                        <TableCell>

                                            <Badge

                                                variant={

                                                    getStatusVariant(

                                                        request.status

                                                    ) as any

                                                }

                                            >

                                                {

                                                    request.status

                                                }

                                            </Badge>

                                        </TableCell>

                                        <TableCell>

                                            <div className="flex flex-wrap gap-2">

                                                {

                                                    request.status === "PENDING" && (

                                                        <>

                                                            <Button

                                                                size="sm"

                                                                variant="outline"

                                                                onClick={() =>

                                                                    onEdit(

                                                                        request

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

                                                                        request.id

                                                                    )

                                                                }

                                                            >

                                                                Delete

                                                            </Button>

                                                            <Button

                                                                size="sm"

                                                                onClick={() =>

                                                                    onApprove(

                                                                        request.id

                                                                    )

                                                                }

                                                            >

                                                                Approve

                                                            </Button>

                                                            <Button

                                                                size="sm"

                                                                variant="secondary"

                                                                onClick={() =>

                                                                    onReject(

                                                                        request.id

                                                                    )

                                                                }

                                                            >

                                                                Reject

                                                            </Button>

                                                        </>

                                                    )

                                                }

                                                {

                                                    request.status === "APPROVED"

                                                    &&

                                                    !request.purchaseOrderId

                                                    && (

                                                        <Button

                                                            size="sm"

                                                            onClick={() =>

                                                                onCreatePO(

                                                                    request.id

                                                                )

                                                            }

                                                        >

                                                            Create PO

                                                        </Button>

                                                    )

                                                }

                                                {

                                                    request.status === "APPROVED"

                                                    &&

                                                    request.purchaseOrderId

                                                    && (

                                                        <Badge>

                                                            PO Created

                                                        </Badge>

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

export default PurchaseRequestTable;