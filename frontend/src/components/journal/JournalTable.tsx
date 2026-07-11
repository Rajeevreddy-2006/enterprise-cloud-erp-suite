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

    journalEntries: any[];

    onEdit: (
        journalEntry: any
    ) => void;

    onDelete: (
        id: string
    ) => void;

}

function JournalEntryTable({

    journalEntries,

    onEdit,

    onDelete

}: Props) {

    return (

        <div className="rounded-lg border">

            <Table>

                <TableHeader>

                    <TableRow>

                        <TableHead>

                            Amount

                        </TableHead>

                        <TableHead>

                            Debit Account

                        </TableHead>

                        <TableHead>

                            Credit Account

                        </TableHead>

                        <TableHead>

                            Transaction

                        </TableHead>

                        <TableHead>

                            Created At

                        </TableHead>

                        <TableHead>

                            Actions

                        </TableHead>

                    </TableRow>

                </TableHeader>

                <TableBody>

                    {

                        journalEntries.length === 0 ?

                        (

                            <TableRow>

                                <TableCell

                                    colSpan={6}

                                    className="text-center py-8"

                                >

                                    No Journal Entries Found

                                </TableCell>

                            </TableRow>

                        )

                        :

                        (

                            journalEntries.map(

                                (

                                    entry: any

                                ) => (

                                    <TableRow

                                        key={entry.id}

                                    >

                                        <TableCell>

                                            ₹{

                                                Number(

                                                    entry.amount

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

                                                entry.debitAccount?.code

                                            }

                                            {" - "}

                                            {

                                                entry.debitAccount?.name

                                            }

                                        </TableCell>

                                        <TableCell>

                                            {

                                                entry.creditAccount?.code

                                            }

                                            {" - "}

                                            {

                                                entry.creditAccount?.name

                                            }

                                        </TableCell>

                                        <TableCell>

                                            {

                                                entry.transaction?.description

                                            }

                                        </TableCell>

                                        <TableCell>

                                            {

                                                new Date(

                                                    entry.createdAt

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

                                                            entry

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

                                                            entry.id

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

export default JournalEntryTable;