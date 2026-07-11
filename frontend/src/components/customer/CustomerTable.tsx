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

interface Props {

    customers: any[];

    onEdit: (

        customer: any

    ) => void;

    onDelete: (

        customerId: string

    ) => void;

}

function CustomerTable({

    customers,

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

                        Address

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

                    customers.length === 0

                    ?

                    (

                        <TableRow>

                            <TableCell

                                colSpan={6}

                                className="text-center py-8"

                            >

                                No Customers Found

                            </TableCell>

                        </TableRow>

                    )

                    :

                    (

                        customers.map(

                            (

                                customer: any

                            ) => (

                                <TableRow

                                    key={

                                        customer.id

                                    }

                                >

                                    <TableCell

                                        className="font-medium"

                                    >

                                        {

                                            customer.name

                                        }

                                    </TableCell>

                                    <TableCell>

                                        {

                                            customer.email ||

                                            "—"

                                        }

                                    </TableCell>

                                    <TableCell>

                                        {

                                            customer.phone ||

                                            "—"

                                        }

                                    </TableCell>

                                    <TableCell>

                                        {

                                            customer.address ||

                                            "—"

                                        }

                                    </TableCell>

                                    <TableCell>

                                        {

                                            new Date(

                                                customer.createdAt

                                            ).toLocaleDateString()

                                        }

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

                                                        customer

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

                                                        customer.id

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

export default CustomerTable;