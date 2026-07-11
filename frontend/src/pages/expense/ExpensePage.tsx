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

import ExpenseTable from "@/components/expenses/ExpenseTable";
import CreateExpenseDialog from "@/components/expenses/CreateExpenseDialog";
import EditExpenseDialog from "@/components/expenses/EditExpenseDialog";

import {
    useExpenses
} from "@/hooks/expense_hooks/useExpenses";

import {
    useCreateExpense
} from "@/hooks/expense_hooks/useCreateExpense";

import {
    useUpdateExpense
} from "@/hooks/expense_hooks/useUpdateExpense";

import {
    useDeleteExpense
} from "@/hooks/expense_hooks/useDeleteExpense";

function ExpensePage() {

    const [

        createOpen,

        setCreateOpen

    ] = useState(false);

    const [

        editOpen,

        setEditOpen

    ] = useState(false);

    const [

        selectedExpense,

        setSelectedExpense

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

    } = useExpenses();

    const createMutation =
        useCreateExpense();

    const updateMutation =
        useUpdateExpense();

    const deleteMutation =
        useDeleteExpense();

    const expenses =
        data?.data || [];

    const filtered =
        useMemo(

            () =>

                expenses.filter(

                    (expense: any) =>

                        expense.title
                            .toLowerCase()
                            .includes(
                                search.toLowerCase()
                            )

                        ||

                        expense.employee
                            ?.firstName
                            ?.toLowerCase()
                            .includes(
                                search.toLowerCase()
                            )

                        ||

                        expense.employee
                            ?.lastName
                            ?.toLowerCase()
                            .includes(
                                search.toLowerCase()
                            )

                        ||

                        expense.status
                            .toLowerCase()
                            .includes(
                                search.toLowerCase()
                            )

                ),

            [

                expenses,

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

                        "Expense Created Successfully"

                    );

                    setCreateOpen(false);

                    refetch();

                },

                onError(error: any) {

                    toast.error(

                        error.response?.data?.message ||

                        "Failed to Create Expense"

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

                id: selectedExpense.id,

                data

            },

            {

                onSuccess() {

                    toast.success(

                        "Expense Updated Successfully"

                    );

                    setEditOpen(false);

                    refetch();

                },

                onError(error: any) {

                    toast.error(

                        error.response?.data?.message ||

                        "Failed to Update Expense"

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

                "Delete this expense?"

            )

        ) {

            return;

        }

        deleteMutation.mutate(

            id,

            {

                onSuccess() {

                    toast.success(

                        "Expense Deleted Successfully"

                    );

                    refetch();

                },

                onError(error: any) {

                    toast.error(

                        error.response?.data?.message ||

                        "Failed to Delete Expense"

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

                    Failed to load expenses.

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

                            Expenses

                        </h1>

                        <p className="text-slate-400">

                            Manage Employee Expenses

                        </p>

                    </div>

                    <Button

                        className="text-white"

                        onClick={() =>

                            setCreateOpen(true)

                        }

                    >

                        Add Expense

                    </Button>

                </div>

                <Input

                    placeholder="Search Expenses..."

                    value={search}

                    onChange={(e) => {

                        setSearch(

                            e.target.value

                        );

                        setPage(1);

                    }}

                />

                <ExpenseTable

                    expenses={paginated}

                    onEdit={(expense) => {

                        setSelectedExpense(

                            expense

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

                <CreateExpenseDialog

                    open={createOpen}

                    onOpenChange={setCreateOpen}

                    loading={createMutation.isPending}

                    onSubmit={handleCreate}

                />

                {

                    selectedExpense && (

                        <EditExpenseDialog

                            open={editOpen}

                            onOpenChange={setEditOpen}

                            expense={selectedExpense}

                            loading={updateMutation.isPending}

                            onSubmit={handleUpdate}

                        />

                    )

                }

            </div>

        </AppLayout>

    );

}

export default ExpensePage;