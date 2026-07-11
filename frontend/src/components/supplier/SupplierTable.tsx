import {

    Table,

    TableBody,

    TableCell,

    TableHead,

    TableHeader,

    TableRow

}

from "@/components/ui/table";

import {

    Button

}

from "@/components/ui/button";

import {

    Badge

}

from "@/components/ui/badge";

interface Props {

    suppliers: any[];

    onEdit: (

        supplier: any

    ) => void;

    onDelete: (

        supplierId: string

    ) => void;

}

function SupplierTable({

    suppliers,

    onEdit,

    onDelete

}: Props) {

    return (

        <Table>

            <TableHeader>

                <TableRow>

                    <TableHead>

                        Name

                    </TableHead>

                    <TableHead>

                        Email

                    </TableHead>

                    <TableHead>

                        Phone

                    </TableHead>

                    <TableHead>

                        Assets

                    </TableHead>

                    <TableHead>

                        Purchase Orders

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

                    suppliers.length === 0

                    ?

                    (

                        <TableRow>

                            <TableCell

                                colSpan={7}

                                className="text-center py-8"

                            >

                                No Suppliers Found

                            </TableCell>

                        </TableRow>

                    )

                    :

                    (

                        suppliers.map(

                            (

                                supplier: any

                            ) => (

                                <TableRow

                                    key={

                                        supplier.id

                                    }

                                >

                                    <TableCell

                                        className="font-medium"

                                    >

                                        {

                                            supplier.name

                                        }

                                    </TableCell>

                                    <TableCell>

                                        {

                                            supplier.email

                                        }

                                    </TableCell>

                                    <TableCell>

                                        {

                                            supplier.phone ||

                                            "—"

                                        }

                                    </TableCell>

                                    <TableCell>

                                        {

                                            supplier.assets?.length ||

                                            0

                                        }

                                    </TableCell>

                                    <TableCell>

                                        {

                                            supplier.purchaseOrders?.length ||

                                            0

                                        }

                                    </TableCell>

                                    <TableCell>

                                        <Badge

                                            variant={

                                                supplier.isActive

                                                ?

                                                "default"

                                                :

                                                "secondary"

                                            }

                                        >

                                            {

                                                supplier.isActive

                                                ?

                                                "Active"

                                                :

                                                "Inactive"

                                            }

                                        </Badge>

                                    </TableCell>

                                    <TableCell>

                                        <div

                                            className="flex gap-2"

                                        >

                                            <Button

                                                size="sm"

                                                variant="outline"

                                                onClick={() =>

                                                    onEdit(

                                                        supplier

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

                                                        supplier.id

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

    );

}

export default SupplierTable;