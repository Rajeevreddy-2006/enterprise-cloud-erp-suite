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

import TransactionTable from "@/components/transactions/TransactionTable";
import CreateTransactionDialog from "@/components/transactions/CreateTransactionDialog";
import EditTransactionDialog from "@/components/transactions/EditTransactionDialog";

import {
    useTransactions
} from "@/hooks/transaction_hooks/useTransactions";

import {
    useCreateTransaction
} from "@/hooks/transaction_hooks/useCreateTransaction";

import {
    useUpdateTransaction
} from "@/hooks/transaction_hooks/useUpdateTransaction";

import {
    useDeleteTransaction
} from "@/hooks/transaction_hooks/useDeleteTransaction";

function TransactionPage() {

    const [
        createOpen,
        setCreateOpen
    ] = useState(false);

    const [
        editOpen,
        setEditOpen
    ] = useState(false);

    const [
        selectedTransaction,
        setSelectedTransaction
    ] = useState<any>(null);

    const [
        search,
        setSearch
    ] = useState("");

    const [
        page,
        setPage
    ] = useState(1);

    const pageSize = 10;

    const {
        data,
        isLoading,
        isError,
        refetch
    } = useTransactions();

    const createMutation =
        useCreateTransaction();

    const updateMutation =
        useUpdateTransaction();

    const deleteMutation =
        useDeleteTransaction();

    const transactions =
        data?.data || [];

    const filtered =
        useMemo(

            () =>

                transactions.filter(

                    (transaction: any) =>

                        transaction.description
                            .toLowerCase()
                            .includes(
                                search.toLowerCase()
                            )

                        ||

                        transaction.account?.name
                            ?.toLowerCase()
                            .includes(
                                search.toLowerCase()
                            )

                        ||

                        transaction.type
                            .toLowerCase()
                            .includes(
                                search.toLowerCase()
                            )

                ),

            [

                transactions,

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

            (page - 1) *
            pageSize,

            page *
            pageSize

        );

    const handleCreate = (

        data: any

    ) => {

        createMutation.mutate(

            data,

            {

                onSuccess() {

                    toast.success(
                        "Transaction Created Successfully"
                    );

                    setCreateOpen(false);

                    refetch();

                },

                onError(error: any) {

                    toast.error(

                        error.response?.data?.message ||

                        "Failed to Create Transaction"

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

                id: selectedTransaction.id,

                data

            },

            {

                onSuccess() {

                    toast.success(
                        "Transaction Updated Successfully"
                    );

                    setEditOpen(false);

                    refetch();

                },

                onError(error: any) {

                    toast.error(

                        error.response?.data?.message ||

                        "Failed to Update Transaction"

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

                "Delete this transaction?"

            )

        ) {

            return;

        }

        deleteMutation.mutate(

            id,

            {

                onSuccess() {

                    toast.success(
                        "Transaction Deleted Successfully"
                    );

                    refetch();

                },

                onError(error: any) {

                    toast.error(

                        error.response?.data?.message ||

                        "Failed to Delete Transaction"

                    );

                }

            }

        );

    };

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

                    Failed to load transactions.

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

                            Transactions

                        </h1>

                        <p className="text-slate-400">

                            Manage Financial Transactions

                        </p>

                    </div>

                    <Button

                        className="text-white"

                        onClick={() =>

                            setCreateOpen(true)

                        }

                    >

                        Add Transaction

                    </Button>

                </div>

                <Input

                    placeholder="Search by Description, Account or Type..."

                    value={search}

                    onChange={(e) => {

                        setSearch(
                            e.target.value
                        );

                        setPage(1);

                    }}

                />

                <TransactionTable

                    transactions={paginated}

                    onEdit={(transaction) => {

                        setSelectedTransaction(
                            transaction
                        );

                        setEditOpen(true);

                    }}

                    onDelete={handleDelete}

                />

                {

                    totalPages > 1 && (

                        <div className="flex justify-end gap-2">

                            <Button

                                variant="outline"

                                disabled={
                                    page === 1
                                }

                                onClick={() =>

                                    setPage(
                                        page - 1
                                    )

                                }

                            >

                                Previous

                            </Button>

                            <Button

                                variant="outline"

                                disabled={
                                    page === totalPages
                                }

                                onClick={() =>

                                    setPage(
                                        page + 1
                                    )

                                }

                            >

                                Next

                            </Button>

                        </div>

                    )

                }

                <CreateTransactionDialog

                    open={createOpen}

                    onOpenChange={setCreateOpen}

                    loading={createMutation.isPending}

                    onSubmit={handleCreate}

                />

                {

                    selectedTransaction && (

                        <EditTransactionDialog

                            open={editOpen}

                            onOpenChange={setEditOpen}

                            transaction={selectedTransaction}

                            loading={updateMutation.isPending}

                            onSubmit={handleUpdate}

                        />

                    )

                }

            </div>

        </AppLayout>

    );

}

export default TransactionPage;