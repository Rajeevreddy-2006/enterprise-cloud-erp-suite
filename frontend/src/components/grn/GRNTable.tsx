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

    grns: any[];

    onEdit: (
        grn: any
    ) => void;

    onDelete: (
        id: string
    ) => void;

}

function GRNTable({

    grns,

    onEdit,

    onDelete

}: Props) {

    const getStatusVariant = (

        status: string

    ) => {

        switch (status) {

            case "RECEIVED":

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

                            GRN Number

                        </TableHead>

                        <TableHead>

                            Purchase Order

                        </TableHead>

                        <TableHead>

                            Quantity Received

                        </TableHead>

                        <TableHead>

                            Remarks

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

                        grns.length === 0 ?

                        (

                            <TableRow>

                                <TableCell

                                    colSpan={7}

                                    className="text-center py-8"

                                >

                                    No Goods Receipt Notes Found

                                </TableCell>

                            </TableRow>

                        )

                        :

                        (

                            grns.map(

                                (

                                    grn: any

                                ) => (

                                    <TableRow

                                        key={grn.id}

                                    >

                                        <TableCell>

                                            {

                                                grn.grnNumber

                                            }

                                        </TableCell>

                                        <TableCell>

                                            {

                                                grn.purchaseOrder?.orderNumber ||

                                                "-"

                                            }

                                        </TableCell>

                                        <TableCell>

                                            {

                                                grn.quantityReceived

                                            }

                                        </TableCell>

                                        <TableCell>

                                            {

                                                grn.remarks ||

                                                "-"

                                            }

                                        </TableCell>

                                        <TableCell>

                                            <Badge

                                                variant={

                                                    getStatusVariant(

                                                        grn.status

                                                    ) as any

                                                }

                                            >

                                                {

                                                    grn.status

                                                }

                                            </Badge>

                                        </TableCell>

                                        <TableCell>

                                            {

                                                new Date(

                                                    grn.createdAt

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

                                                            grn

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

                                                            grn.id

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

export default GRNTable;