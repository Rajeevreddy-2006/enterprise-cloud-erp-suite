import {
    useMemo,
    useState
}
from "react";

import AppLayout
from "@/components/layout/AppLayout";

import {
    Button
}
from "@/components/ui/button";

import {
    Input
}
from "@/components/ui/input";

import {
    toast
}
from "sonner";

import SalesOrderTable
from "@/components/salesOrder/SalesOrderTable";

import CreateSalesOrderDialog
from "@/components/salesOrder/CreateSalesOrderDialog";

import EditSalesOrderDialog
from "@/components/salesOrder/EditSalesOrderDialog";

import {
    useSalesOrders
}
from "@/hooks/salesOrder_hooks/useSalesOrders";

import {
    useCreateSalesOrder
}
from "@/hooks/salesOrder_hooks/useCreateSalesOrder";

import {
    useUpdateSalesOrder
}
from "@/hooks/salesOrder_hooks/useUpdateSalesOrder";

import {
    useDeleteSalesOrder
}
from "@/hooks/salesOrder_hooks/useDeleteSalesOrder";

import {
    useConfirmSalesOrder
} from "@/hooks/salesOrder_hooks/useConfirmSalesOrder";

import {
    useCompleteSalesOrder
} from "@/hooks/salesOrder_hooks/useCompleteSalesOrder";

import {
    useCancelSalesOrder
} from "@/hooks/salesOrder_hooks/useCancelSalesOrder";

function SalesOrderPage() {

    const [

        createOpen,

        setCreateOpen

    ] = useState(false);

    const [

        editOpen,

        setEditOpen

    ] = useState(false);

    const [

        selectedOrder,

        setSelectedOrder

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

        refetch,

        isLoading,

        isError

    } = useSalesOrders();

    const create =
        useCreateSalesOrder();

    const update =
        useUpdateSalesOrder();

    const del =
        useDeleteSalesOrder();

    const confirms =
        useConfirmSalesOrder();

    const complete =
        useCompleteSalesOrder();

    const cancel =
        useCancelSalesOrder();

    const salesOrders =
        data?.data || [];

    const filtered =
        useMemo(
            () =>
                salesOrders.filter(
                    (order: any) =>
                        order.orderNumber
                            ?.toLowerCase()
                            .includes(
                                search.toLowerCase()
                            )
                        ||
                        order.customer?.name
                            ?.toLowerCase()
                            .includes(
                                search.toLowerCase()
                            )
                        ||
                        order.inventoryItem?.name
                            ?.toLowerCase()
                            .includes(
                                search.toLowerCase()
                            )
                ),
            [
                salesOrders,
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
            (
                page - 1
            ) *
            pageSize,
            page *
            pageSize
        );

    const handleCreate = (
        data: any
    ) => {

        create.mutate(
            data,
            {

                onSuccess() {

                    toast.success(
                        "Sales Order Created"
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

        update.mutate(
            {

                id:
                    selectedOrder.id,

                data

            },
            {

                onSuccess() {

                    toast.success(
                        "Sales Order Updated"
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
            !confirm(
                "Delete this Sales Order?"
            )
        )
            return;

        del.mutate(
            id,
            {

                onSuccess() {

                    toast.success(
                        "Deleted Successfully"
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

    const handleConfirm = (

        id: string

    ) => {

        if (
            !confirm(
                "Confirm this Sales Order?"
            )
        )
            return;

        confirms.mutate(

            id,

            {

                onSuccess() {

                    toast.success(

                        "Sales Order Confirmed"

                    );

                    refetch();

                },

                onError(error: any) {

                    toast.error(

                        error.response?.data?.message ||

                        "Confirmation Failed"

                    );

                }

            }

        );

    };

    const handleComplete = (

        id: string

    ) => {

        if (
            !confirm(
                "Complete this Sales Order?"
            )
        )
            return;

        complete.mutate(

            id,

            {

                onSuccess() {

                    toast.success(

                        "Sales Order Completed"

                    );

                    refetch();

                },

                onError(error: any) {

                    toast.error(

                        error.response?.data?.message ||

                        "Completion Failed"

                    );

                }

            }

        );

    };

    const handleCancel = (

        id: string

    ) => {

        if (

            !confirm(

                "Cancel this Sales Order?"

            )

        ) {

            return;

        }

        cancel.mutate(

            id,

            {

                onSuccess() {

                    toast.success(

                        "Sales Order Cancelled"

                    );

                    refetch();

                },

                onError(error: any) {

                    toast.error(

                        error.response?.data?.message ||

                        "Cancellation Failed"

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

                    Failed to load sales orders.

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

                            Sales Orders

                        </h1>

                        <p className="text-slate-400">

                            Manage Customer Sales Orders

                        </p>

                    </div>

                    <Button

                        className="text-white"

                        onClick={() =>
                            setCreateOpen(true)
                        }

                    >

                        Add Sales Order

                    </Button>

                </div>

                <Input

                    placeholder="Search Sales Orders..."

                    value={search}

                    onChange={(e) => {

                        setSearch(
                            e.target.value
                        );

                        setPage(1);

                    }}

                />

                <SalesOrderTable

                    salesOrders={paginated}

                    onEdit={(order) => {

                        setSelectedOrder(order);

                        setEditOpen(true);

                    }}

                    onDelete={handleDelete}

                    onConfirm={handleConfirm}

                    onComplete={handleComplete}

                    onCancel={handleCancel}

                />
                {

                    totalPages > 1 && (

                        <div className="flex justify-end gap-2">

                            <Button

                                variant="outline"

                                disabled={page === 1}

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

                                disabled={page === totalPages}

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

                <CreateSalesOrderDialog

                    open={createOpen}

                    onOpenChange={setCreateOpen}

                    loading={create.isPending}

                    onSubmit={handleCreate}

                />

                {

                    selectedOrder && (

                        <EditSalesOrderDialog

                            open={editOpen}

                            onOpenChange={setEditOpen}

                            salesOrder={selectedOrder}

                            loading={update.isPending}

                            onSubmit={handleUpdate}

                        />

                    )

                }

            </div>

        </AppLayout>

    );

}

export default SalesOrderPage;