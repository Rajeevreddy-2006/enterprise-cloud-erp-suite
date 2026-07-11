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
    invoices: any[];
    onEdit: (invoice: any) => void;
    onDelete: (id: string) => void;
    onSend: (id: string) => void;
}

function InvoiceTable({
    invoices,
    onEdit,
    onDelete,
    onSend,
}: Props) {
    const getStatusVariant = (
        status: string
    ) => {
        switch (status) {
            case "DRAFT":
                return "secondary";
            case "SENT":
                return "default";
            case "PAID":
                return "default";
            case "FAILED":
                return "bg-red-600";
            case "OVERDUE":
                return "destructive";
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
                            Invoice No
                        </TableHead>
                        <TableHead>
                            Sales Order
                        </TableHead>
                        <TableHead>
                            Customer
                        </TableHead>
                        <TableHead>
                            Amount
                        </TableHead>
                        <TableHead>
                            Due Date
                        </TableHead>
                        <TableHead>
                            Payment Date
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
                        invoices.length === 0 ?
                        (
                            <TableRow>
                                <TableCell
                                    colSpan={8}
                                    className="text-center py-8"
                                >
                                    No Invoices Found
                                </TableCell>
                            </TableRow>
                        )
                        :
                        (
                            invoices.map(
                                (
                                    invoice: any
                                ) => (
                                    <TableRow key={invoice.id}>
                                        <TableCell>
                                            {
                                                invoice.invoiceNumber
                                            }
                                        </TableCell>
                                        <TableCell>
                                            {
                                                invoice.salesOrder?.orderNumber ||
                                                "-"
                                            }
                                        </TableCell>
                                        <TableCell>
                                            {
                                                invoice.salesOrder?.customer?.name ||
                                                "-"
                                            }
                                        </TableCell>
                                        <TableCell>
                                            ₹
                                            {
                                                Number(
                                                    invoice.amount
                                                ).toLocaleString(
                                                    "en-IN",
                                                    {
                                                        minimumFractionDigits: 2
                                                    }
                                                )
                                            }
                                        </TableCell>
                                        <TableCell>
                                            {
                                                invoice.dueDate ?
                                                new Date(
                                                    invoice.dueDate
                                                ).toLocaleDateString(
                                                    "en-GB"
                                                )
                                                :
                                                "-"
                                            }
                                        </TableCell>
                                        <TableCell>
                                            {
                                                invoice.paidAt
                                                    ? new Date(
                                                        invoice.paidAt
                                                    ).toLocaleDateString()
                                                    : "-"
                                            }
                                        </TableCell>
                                        <TableCell>
                                            <Badge
                                                variant={
                                                    getStatusVariant(
                                                        invoice.status
                                                    ) as any
                                                }
                                            >
                                                {
                                                    invoice.status
                                                }
                                            </Badge>
                                        </TableCell>
                                        <TableCell>
                                            <div className="flex justify-end gap-2 flex-wrap">
                                                {
                                                    invoice.status === "DRAFT" && (
                                                        <Button
                                                            size="sm"
                                                            onClick={() =>
                                                                onSend(invoice.id)
                                                            }
                                                        >
                                                            Send
                                                        </Button>
                                                    )
                                                }
                                                {
                                                    invoice.status === "FAILED" && (
                                                        <Button
                                                            size="sm"
                                                            onClick={() =>
                                                                onSend(invoice.id)
                                                            }
                                                        >
                                                            Resend
                                                        </Button>

                                                    )
                                                }
                                                {
                                                    invoice.status === "SENT" && (
                                                        <Button
                                                            size="sm"
                                                            variant="secondary"
                                                            onClick={() =>
                                                                onSend(invoice.id)
                                                            }
                                                        >
                                                            Resend
                                                        </Button>
                                                    )
                                                }
                                                {
                                                    invoice.status === "PAID" && (
                                                        <span className="font-semibold text-green-600">
                                                            ✓ Paid
                                                        </span>
                                                    )
                                                }
                                                {
                                                    invoice.status === "OVERDUE" && (
                                                        <span className="font-semibold text-red-600">
                                                            Overdue
                                                        </span>
                                                    )
                                                }
                                                {
                                                    invoice.status === "DRAFT" && (
                                                        <Button
                                                            size="sm"
                                                            variant="outline"
                                                            onClick={() =>
                                                                onEdit(invoice)
                                                            }
                                                        >
                                                            Edit
                                                        </Button>
                                                    )
                                                }
                                                {
                                                    invoice.status === "DRAFT" && (
                                                        <Button
                                                            size="sm"
                                                            variant="destructive"
                                                            onClick={() =>
                                                                onDelete(invoice.id)
                                                            }
                                                        >
                                                            Delete
                                                        </Button>
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

export default InvoiceTable;