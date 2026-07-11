import { useMemo, useState } from "react";

import { toast } from "sonner";

import AppLayout from "@/components/layout/AppLayout";

import CreateQuotationDialog from "@/components/quotations/CreateQuotationDialog";
import EditQuotationDialog from "@/components/quotations/EditQuotationDialog";
import QuotationTable from "@/components/quotations/QuotationTable";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

import { useQuotations } from "@/hooks/quotation_hooks/useQuotations";
import { useCreateQuotation } from "@/hooks/quotation_hooks/useCreateQuotation";
import { useUpdateQuotation } from "@/hooks/quotation_hooks/useUpdateQuotation";
import { useDeleteQuotation } from "@/hooks/quotation_hooks/useDeleteQuotation";
import { useSendQuotation } from "@/hooks/quotation_hooks/useSendQuotation";

import { useCustomers } from "@/hooks/customer_hooks/useCustomers";

import type { Quotation } from "@/types/quotation.types";
import type { QuotationFormOutput } from "@/schemas/quotation.schema";

function QuotationPage() {

    const [search, setSearch] = useState("");

    const [page, setPage] = useState(1);

    const pageSize = 10;

    const [createOpen, setCreateOpen] = useState(false);

    const [editOpen, setEditOpen] = useState(false);

    const [selectedQuotation, setSelectedQuotation] =
        useState<Quotation | null>(null);

    const {
        data: quotations = [],
        isLoading,
        isError,
    } = useQuotations() as {
        data: Quotation[];
        isLoading: boolean;
        isError: boolean;
    };

    // const {
    //     data: customers = [],
    // } = useCustomers();
    const { data } = useCustomers();

    const {
        mutate: createQuotation,
        isPending: creating,
    } = useCreateQuotation();

    const {
        mutate: updateQuotation,
        isPending: updating,
    } = useUpdateQuotation();

    const {
        mutate: deleteQuotation,
    } = useDeleteQuotation();

    const {
        mutate: sendQuotation,
    } = useSendQuotation();

    function handleCreate(
        data: QuotationFormOutput
    ) {

        createQuotation(
            data,
            {
                onSuccess() {

                    toast.success(
                        "Quotation created successfully."
                    );

                    setCreateOpen(false);

                },

                onError(error: any) {

                    toast.error(
                        error?.response?.data?.message ??
                        "Unable to create quotation."
                    );

                },
            }
        );

    }

    function handleEdit(
        quotation: Quotation
    ) {

        setSelectedQuotation(quotation);

        setEditOpen(true);

    }

    function handleUpdate(
        id: string,
        data: QuotationFormOutput
    ) {

        updateQuotation(
            {
                id,
                data,
            },
            {
                onSuccess() {

                    toast.success(
                        "Quotation updated successfully."
                    );

                    setEditOpen(false);

                },

                onError(error: any) {

                    toast.error(
                        error?.response?.data?.message ??
                        "Unable to update quotation."
                    );

                },
            }
        );

    }

    function handleDelete(id: string) {

        if (!window.confirm("Delete quotation?")) {
            return;
        }

        deleteQuotation(
            id,
            {
                onSuccess() {

                    toast.success(
                        "Quotation deleted successfully."
                    );

                },

                onError(error: any) {

                    toast.error(
                        error?.response?.data?.message ??
                        "Unable to delete quotation."
                    );

                },
            }
        );

    }

    function handleSend(id: string) {

        sendQuotation(
            id,
            {
                onSuccess() {

                    toast.success(
                        "Quotation emailed successfully."
                    );

                },

                onError(error: any) {

                    toast.error(
                        error?.response?.data?.message ??
                        "Unable to send quotation."
                    );

                },
            }
        );

    }

    const filteredQuotations =
        useMemo(() => {

            return quotations.filter(
                quotation =>
                    quotation.customer.name
                        .toLowerCase()
                        .includes(search.toLowerCase())
            );

        }, [
            quotations,
            search,
        ]);

    const paginatedQuotations =
        useMemo(() => {

            const start =
                (page - 1) * pageSize;

            return filteredQuotations.slice(
                start,
                start + pageSize
            );

        }, [
            filteredQuotations,
            page,
        ]);

    const totalPages =
        Math.max(
            1,
            Math.ceil(
                filteredQuotations.length /
                pageSize
            )
        );
    // console.log("customers =", customers);
    // console.log("isArray =", Array.isArray(customers));

    return (
        <AppLayout>
            <div className="space-y-6">
                <div className="flex items-center justify-between">
                    <div>
                        <h1 className="text-3xl font-bold text-white">
                            Quotations
                        </h1>
                        <p className="text-muted-foreground text-slate-400">
                            Manage quotations
                        </p>
                    </div>
                    <Button
                        className="text-white"
                        onClick={() =>
                            setCreateOpen(true)
                        }
                    >
                        Create Quotation
                    </Button>
                </div>
                <Input
                    className="text-white"
                    placeholder="Search customer..."
                    value={search}
                    onChange={e =>
                        setSearch(e.target.value)
                    }
                />
                {
                    isLoading ? (
                        <p>
                            Loading...
                        </p>
                    ) : isError ? (
                        <p>
                            Failed to load quotations.
                        </p>
                    ) : (
                        <QuotationTable
                            quotations={paginatedQuotations}
                            onEdit={handleEdit}
                            onDelete={handleDelete}
                            onSend={handleSend}
                        />
                    )
                }
                <div className="flex justify-end gap-2">
                    <Button
                        className="text-white"
                        variant="outline"
                        disabled={page === 1}
                        onClick={() =>
                            setPage(prev => prev - 1)
                        }
                    >
                        Previous
                    </Button>
                    <Button
                    className="text-white"
                        variant="outline"
                        disabled={page >= totalPages}
                        onClick={() =>
                            setPage(prev => prev + 1)
                        }
                    >
                        Next
                    </Button>
                </div>
            </div>
            <CreateQuotationDialog
                open={createOpen}
                onOpenChange={setCreateOpen}
                customers={data?.data ?? []}
                loading={creating}
                onSubmit={handleCreate}
            />
            <EditQuotationDialog
                open={editOpen}
                onOpenChange={setEditOpen}
                quotation={selectedQuotation}
                customers={data?.data ?? []}
                loading={updating}
                onSubmit={handleUpdate}
            />
        </AppLayout>
    );
}

export default QuotationPage;