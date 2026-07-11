import {
    useMemo,
    useState
} from "react";

import AppLayout from "@/components/layout/AppLayout";

import {
    Button
} from "@/components/ui/button";

import {
    Input
} from "@/components/ui/input";

import {
    toast
} from "sonner";

import InvoiceTable from "@/components/invoice/InvoiceTable";

import CreateInvoiceDialog from "@/components/invoice/CreateInvoiceDialog";

import EditInvoiceDialog from "@/components/invoice/EditInvoiceDialog";

import {
    useInvoices
} from "@/hooks/invoice_hooks/useInvoices";

import {
    useCreateInvoice
} from "@/hooks/invoice_hooks/useCreateInvoice";

import {
    useUpdateInvoice
} from "@/hooks/invoice_hooks/useUpdateInvoice";

import {
    useDeleteInvoice
} from "@/hooks/invoice_hooks/useDeleteInvoice";

import { useSendInvoice } from "@/hooks/invoice_hooks/useSendInvoice";

function InvoicePage() {

    const [createOpen, setCreateOpen] =
        useState(false);

    const [editOpen, setEditOpen] =
        useState(false);

    const [selectedInvoice, setSelectedInvoice] =
        useState<any>(null);

    const [search, setSearch] =
        useState("");

    const [page, setPage] =
        useState(1);

    const pageSize = 10;

    const {

        data,

        isLoading,

        isError,

        refetch

    } = useInvoices();

    const createMutation =
        useCreateInvoice();

    const updateMutation =
        useUpdateInvoice();

    const deleteMutation =
        useDeleteInvoice();

    const { mutate: sendInvoice, } = useSendInvoice();

    const invoices =
        data || [];

    const filtered =
        useMemo(
            () =>
                invoices.filter(
                    (invoice: any) =>
                        invoice.invoiceNumber
                            ?.toLowerCase()
                            .includes(search.toLowerCase())

                        ||
                        invoice.salesOrder?.orderNumber
                            ?.toLowerCase()
                            .includes(search.toLowerCase())

                        ||
                        invoice.salesOrder?.customer?.name
                            ?.toLowerCase()
                            .includes(search.toLowerCase())
                ),
            [
                invoices,
                search
            ]
        );
    const totalPages =
        Math.ceil(
            filtered.length /
            pageSize
        );
    const paginated =
        filtered.slice(
            (page - 1) * pageSize,
            page * pageSize
        );
    const handleCreate = (
        data: any
    ) => {
        createMutation.mutate(
            data,
            {
                onSuccess() {
                    toast.success(
                        "Invoice Created"
                    );
                    setCreateOpen(false);
                    refetch();
                },
                onError(error: any) {
                    toast.error(
                        error.response?.data?.message ||
                        "Creation Failed"
                    );
                }
            }
        );
    };
    const handleUpdate = (
        data: any
    ) => {
        updateMutation.mutate(
            {
                id: selectedInvoice.id,
                data
            },
            {
                onSuccess() {
                    toast.success(
                        "Invoice Updated"
                    );
                    setEditOpen(false);
                    refetch();
                },
                onError(error: any) {
                    toast.error(
                        error.response?.data?.message ||
                        "Update Failed"
                    );
                }
            }
        );
    };
    const handleDelete = (
        id: string
    ) => {
        if (
            !window.confirm(
                "Delete Invoice?"
            )
        ) {
            return;
        }
        deleteMutation.mutate(
            id,
            {
                onSuccess() {
                    toast.success(
                        "Invoice Deleted"
                    );
                    refetch();
                },
                onError(error: any) {
                    toast.error(
                        error.response?.data?.message ||
                        "Delete Failed"
                    );
                }
            }
        );
    };
    function handleSend(
        id: string
    ) {
        sendInvoice(
            id,
            {
                onSuccess() {
                    toast.success(
                        "Invoice email sent successfully."
                    );
                },
                onError(error: any) {
                    toast.error(
                        error?.response?.data?.message ??
                        "Unable to send invoice."
                    );
                },
            }
        );
    }
    if (isLoading) {
        return (
            <AppLayout>
                <div className="py-10 text-center">
                    Loading...
                </div>
            </AppLayout>
        );
    }
    if (isError) {
        return (
            <AppLayout>
                <div className="py-10 text-center text-red-500">
                    Failed to load invoices.
                </div>
            </AppLayout>
        );
    }
    return (
        <AppLayout>
            <div className="space-y-6">
                <div className="flex items-center justify-between">
                    <div>
                        <h1 className="text-3xl font-bold text-white">
                            Invoices
                        </h1>
                        <p className="text-slate-400">
                            Manage Customer Invoices
                        </p>
                    </div>
                    <Button
                        className="text-white"
                        onClick={() =>
                            setCreateOpen(true)
                        }
                    >
                        Add Invoice
                    </Button>
                </div>
                <Input
                    placeholder="Search by Invoice Number, Sales Order or Customer..."
                    value={search}
                    onChange={(e) => {
                        setSearch(
                            e.target.value
                        );
                        setPage(1);
                    }}
                />
                <InvoiceTable
                    invoices={paginated}
                    onEdit={(invoice) => {
                        setSelectedInvoice(invoice);
                        setEditOpen(true);
                    }}
                    onDelete={handleDelete}
                    onSend={handleSend}
                />
                {
                    totalPages > 1 && (
                        <div className="flex justify-end gap-2">
                            <Button
                                className="text-white"
                                variant="outline"
                                disabled={page === 1}
                                onClick={() =>
                                    setPage(page - 1)
                                }
                            >
                                Previous
                            </Button>
                            <Button
                                className="text-white"
                                variant="outline"
                                disabled={page === totalPages}
                                onClick={() =>
                                    setPage(page + 1)
                                }
                            >
                                Next
                            </Button>
                        </div>
                    )
                }
                <CreateInvoiceDialog
                    open={createOpen}
                    onOpenChange={setCreateOpen}
                    loading={createMutation.isPending}
                    onSubmit={handleCreate}
                />
                {
                    selectedInvoice && (
                        <EditInvoiceDialog
                            open={editOpen}
                            onOpenChange={setEditOpen}
                            invoice={selectedInvoice}
                            loading={updateMutation.isPending}
                            onSubmit={handleUpdate}
                        />
                    )
                }
            </div>
        </AppLayout>
    );
}

export default InvoicePage;