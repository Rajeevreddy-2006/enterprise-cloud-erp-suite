import type { Quotation } from "@/types/quotation.types";

import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table";

import { Button } from "@/components/ui/button";

interface Props {
    quotations: Quotation[];
    onEdit: (quotation: Quotation) => void;
    onDelete: (id: string) => void;
    onSend: (id: string) => void;
}

function QuotationTable({
    quotations,
    onEdit,
    onDelete,
    onSend,
}: Props) {

    function getStatusColor(status: string) {

        switch (status) {

            case "DRAFT":
                return "bg-slate-600";

            case "SENT":
                return "bg-blue-600";

            case "ACCEPTED":
                return "bg-green-600";

            case "REJECTED":
                return "bg-red-600";

            case "EXPIRED":
                return "bg-orange-600";

            default:
                return "bg-slate-600";
        }

    }

    return (

        <Table>

            <TableHeader>

                <TableRow>

                    <TableHead>
                        Quotation No
                    </TableHead>

                    <TableHead>
                        Customer
                    </TableHead>

                    <TableHead>
                        Price / Unit
                    </TableHead>

                    <TableHead>
                        Qty
                    </TableHead>

                    <TableHead>
                        Total
                    </TableHead>

                    <TableHead>
                        Valid Until
                    </TableHead>

                    <TableHead>
                        Status
                    </TableHead>

                    <TableHead className="text-right">
                        Actions
                    </TableHead>

                </TableRow>

            </TableHeader>

            <TableBody>

                {quotations.map((quotation) => {

                    const quantity =
                        quotation.requestedQuantity;

                    const total =
                        quantity != null
                            ? Number(quotation.amount) * quantity
                            : null;

                    return (

                        <TableRow
                            key={quotation.id}
                        >

                            <TableCell className="font-medium">
                                {quotation.quotationNumber}
                            </TableCell>

                            <TableCell>
                                {quotation.customer.name}
                            </TableCell>

                            <TableCell>
                                ₹
                                {Number(
                                    quotation.amount
                                ).toLocaleString()}
                            </TableCell>

                            <TableCell>

                                {quantity == null
                                    ? "-"
                                    : quantity}

                            </TableCell>

                            <TableCell>

                                {total == null
                                    ? "-"
                                    : `₹${total.toLocaleString()}`}

                            </TableCell>

                            <TableCell>

                                {new Date(
                                    quotation.validUntil
                                ).toLocaleDateString()}

                            </TableCell>

                            <TableCell>

                                <span
                                    className={`rounded-md px-2 py-1 text-xs font-semibold text-white ${getStatusColor(
                                        quotation.status
                                    )}`}
                                >
                                    {quotation.status}
                                </span>

                            </TableCell>

                            <TableCell>

                                <div className="flex flex-wrap justify-end gap-2">

                                    <Button
                                        size="sm"
                                        variant="outline"
                                        onClick={() =>
                                            onEdit(
                                                quotation
                                            )
                                        }
                                    >
                                        Edit
                                    </Button>

                                    {quotation.status ===
                                        "DRAFT" && (

                                        <Button
                                            size="sm"
                                            onClick={() =>
                                                onSend(
                                                    quotation.id
                                                )
                                            }
                                        >
                                            Send
                                        </Button>

                                    )}

                                    <Button
                                        size="sm"
                                        variant="destructive"
                                        onClick={() =>
                                            onDelete(
                                                quotation.id
                                            )
                                        }
                                    >
                                        Delete
                                    </Button>

                                </div>

                            </TableCell>

                        </TableRow>

                    );

                })}

            </TableBody>

        </Table>

    );

}

export default QuotationTable;