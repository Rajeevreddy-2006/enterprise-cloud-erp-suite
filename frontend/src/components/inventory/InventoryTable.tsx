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

interface Props {

    inventoryItems: any[];

    onEdit: (
        inventoryItem: any
    ) => void;

    onDelete: (
        id: string
    ) => void;

}

function InventoryTable({

    inventoryItems,

    onEdit,

    onDelete

}: Props) {

    return (

        <div className="rounded-lg border">

            <Table>

                <TableHeader>

                    <TableRow>

                        <TableHead>

                            SKU

                        </TableHead>

                        <TableHead>

                            Item Name

                        </TableHead>

                        <TableHead>

                            Quantity

                        </TableHead>

                        <TableHead>

                            Unit Price

                        </TableHead>

                        <TableHead>

                            Stock Value

                        </TableHead>

                        <TableHead>

                            Actions

                        </TableHead>

                    </TableRow>

                </TableHeader>

                <TableBody>

                    {

                        inventoryItems.length === 0 ?

                        (

                            <TableRow>

                                <TableCell

                                    colSpan={6}

                                    className="text-center py-8 text-muted-foreground"

                                >

                                    No Inventory Items Found

                                </TableCell>

                            </TableRow>

                        )

                        :

                        (

                            inventoryItems.map(

                                (

                                    item: any

                                ) => (

                                    <TableRow

                                        key={item.id}

                                    >

                                        <TableCell className="font-medium">

                                            {

                                                item.sku

                                            }

                                        </TableCell>

                                        <TableCell>

                                            {

                                                item.name

                                            }

                                        </TableCell>

                                        <TableCell>

                                            {

                                                item.quantity

                                            }

                                        </TableCell>

                                        <TableCell>

                                            ₹

                                            {

                                                Number(

                                                    item.unitPrice

                                                ).toLocaleString(

                                                    "en-IN",

                                                    {

                                                        minimumFractionDigits: 2,

                                                        maximumFractionDigits: 2

                                                    }

                                                )

                                            }

                                        </TableCell>

                                        <TableCell className="font-semibold">

                                            ₹

                                            {

                                                (

                                                    Number(

                                                        item.quantity

                                                    )

                                                    *

                                                    Number(

                                                        item.unitPrice

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

                                            <div className="flex gap-2">

                                                <Button

                                                    size="sm"

                                                    variant="outline"

                                                    onClick={() =>

                                                        onEdit(

                                                            item

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

                                                            item.id

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

export default InventoryTable;