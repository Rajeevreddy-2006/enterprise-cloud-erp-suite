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

    stockMovements: any[];

    onDelete: (
        id: string
    ) => void;

}

function StockMovementTable({

    stockMovements,

    onDelete

}: Props) {

    const getBadgeVariant = (

        type: string

    ) => {

        switch (type) {

            case "PURCHASE":

                return "default";

            case "GRN":

                return "secondary";

            case "SALE":

                return "destructive";

            case "ASSET_ASSIGNMENT":

                return "outline";

            case "ADJUSTMENT":

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

                            Inventory Item

                        </TableHead>

                        <TableHead>

                            Movement Type

                        </TableHead>

                        <TableHead>

                            Quantity

                        </TableHead>

                        <TableHead>

                            Remarks

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

                        stockMovements.length === 0 ?

                        (

                            <TableRow>

                                <TableCell

                                    colSpan={6}

                                    className="text-center py-8"

                                >

                                    No Stock Movements Found

                                </TableCell>

                            </TableRow>

                        )

                        :

                        (

                            stockMovements.map(

                                (

                                    movement: any

                                ) => (

                                    <TableRow

                                        key={movement.id}

                                    >

                                        <TableCell>

                                            {

                                                movement.inventoryItem?.name ||

                                                "-"

                                            }

                                        </TableCell>

                                        <TableCell>

                                            <Badge

                                                variant={

                                                    getBadgeVariant(

                                                        movement.movementType

                                                    ) as any

                                                }

                                            >

                                                {

                                                    movement.movementType

                                                }

                                            </Badge>

                                        </TableCell>

                                        <TableCell>

                                            {

                                                movement.quantity

                                            }

                                        </TableCell>

                                        <TableCell>

                                            {

                                                movement.remarks ||

                                                "-"

                                            }

                                        </TableCell>

                                        <TableCell>

                                            {

                                                new Date(

                                                    movement.createdAt

                                                ).toLocaleDateString(

                                                    "en-GB"

                                                )

                                            }

                                        </TableCell>

                                        <TableCell>

                                            <Button

                                                size="sm"

                                                variant="destructive"

                                                onClick={() =>

                                                    onDelete(

                                                        movement.id

                                                    )

                                                }

                                            >

                                                Delete

                                            </Button>

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

export default StockMovementTable;