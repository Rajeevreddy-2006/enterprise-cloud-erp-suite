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

    accounts: any[];

    onEdit: (account: any) => void;

    onDelete: (id: string) => void;

}

function AccountTable({

    accounts,

    onEdit,

    onDelete

}: Props) {

    const getTypeVariant = (

        type: string

    ) => {

        switch (type) {

            case "ASSET":

                return "default";

            case "LIABILITY":

                return "destructive";

            case "EQUITY":

                return "secondary";

            case "REVENUE":

                return "outline";

            case "EXPENSE":

                return "secondary";

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

                            Code

                        </TableHead>

                        <TableHead>

                            Account Name

                        </TableHead>

                        <TableHead>

                            Type

                        </TableHead>

                        <TableHead>

                            Balance

                        </TableHead>

                        <TableHead>

                            Actions

                        </TableHead>

                    </TableRow>

                </TableHeader>

                <TableBody>

                    {

                        accounts.length === 0 ?

                        (

                            <TableRow>

                                <TableCell

                                    colSpan={5}

                                    className="text-center py-8"

                                >

                                    No Accounts Found

                                </TableCell>

                            </TableRow>

                        )

                        :

                        (

                            accounts.map(

                                (

                                    account: any

                                ) => (

                                    <TableRow

                                        key={account.id}

                                    >

                                        <TableCell className="font-medium">

                                            {

                                                account.code

                                            }

                                        </TableCell>

                                        <TableCell>

                                            {

                                                account.name

                                            }

                                        </TableCell>

                                        <TableCell>

                                            <Badge

                                                variant={

                                                    getTypeVariant(

                                                        account.type

                                                    ) as any

                                                }

                                            >

                                                {

                                                    account.type

                                                }

                                            </Badge>

                                        </TableCell>

                                        <TableCell>

                                            ₹

                                            {

                                                Number(

                                                    account.balance

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

                                                            account

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

                                                            account.id

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

export default AccountTable;