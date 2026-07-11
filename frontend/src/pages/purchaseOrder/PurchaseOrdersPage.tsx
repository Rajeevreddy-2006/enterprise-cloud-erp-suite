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

import PurchaseOrderTable from "@/components/purchaseOrder/PurchaseTable";

import CreatePurchaseOrderDialog from "@/components/purchaseOrder/CreatePurchaseOrderDialog";

import EditPurchaseOrderDialog from "@/components/purchaseOrder/EditPurchaseOrderDialog";

import {
    usePurchaseOrders
} from "@/hooks/purchaseOrder_hooks/usePurchaseOrders";

import {
    useCreatePurchaseOrder
} from "@/hooks/purchaseOrder_hooks/useCreatePurchaseOrder";

import {
    useUpdatePurchaseOrder
} from "@/hooks/purchaseOrder_hooks/useUpdatePurchaseOrder";

import {
    useDeletePurchaseOrder
} from "@/hooks/purchaseOrder_hooks/useDeletePurchaseOrder";

function PurchaseOrderPage() {

    const [

        createOpen,

        setCreateOpen

    ] = useState(false);

    const [

        editOpen,

        setEditOpen

    ] = useState(false);

    const [

        selectedPurchaseOrder,

        setSelectedPurchaseOrder

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

    } = usePurchaseOrders();

    const createMutation =
        useCreatePurchaseOrder();

    const updateMutation =
        useUpdatePurchaseOrder();

    const deleteMutation =
        useDeletePurchaseOrder();

    const purchaseOrders =
        data?.data || [];

    const filtered =
        useMemo(

            () =>

                purchaseOrders.filter(

                    (order: any) =>

                        order.orderNumber

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

                        ||

                        order.supplier?.name

                            ?.toLowerCase()

                            .includes(

                                search.toLowerCase()

                            )

                        ||

                        order.status

                            ?.toLowerCase()

                            .includes(

                                search.toLowerCase()

                            )

                ),

            [

                purchaseOrders,

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

                        "Purchase Order Created Successfully"

                    );

                    setCreateOpen(false);

                    refetch();

                },

                onError(error: any) {

                    toast.error(

                        error.response?.data?.message ||

                        "Failed to create Purchase Order"

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

                id: selectedPurchaseOrder.id,

                data

            },

            {

                onSuccess() {

                    toast.success(

                        "Purchase Order Updated Successfully"

                    );

                    setEditOpen(false);

                    refetch();

                },

                onError(error: any) {

                    toast.error(

                        error.response?.data?.message ||

                        "Failed to update Purchase Order"

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

                "Delete this Purchase Order?"

            )

        ) {

            return;

        }

        deleteMutation.mutate(

            id,

            {

                onSuccess() {

                    toast.success(

                        "Purchase Order Deleted Successfully"

                    );

                    refetch();

                },

                onError(error: any) {

                    toast.error(

                        error.response?.data?.message ||

                        "Failed to delete Purchase Order"

                    );

                }

            }

        );

    };

    if (

        isLoading

    ) {

        return (

            <AppLayout>

                <div className="py-10 text-center">

                    Loading...

                </div>

            </AppLayout>

        );

    }

    if (

        isError

    ) {

        return (

            <AppLayout>

                <div className="py-10 text-center text-red-500">

                    Failed to load Purchase Orders.

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

                            Purchase Orders

                        </h1>

                        <p className="text-slate-400">

                            Manage Purchase Orders

                        </p>

                    </div>

                    <Button

                        className="text-white"

                        onClick={() =>

                            setCreateOpen(true)

                        }

                    >

                        Add Purchase Order

                    </Button>

                </div>

                <Input

                    placeholder="Search Purchase Orders..."

                    value={search}

                    onChange={(e) => {

                        setSearch(

                            e.target.value

                        );

                        setPage(1);

                    }}

                />

                <PurchaseOrderTable

                    purchaseOrders={paginated}

                    onEdit={(purchaseOrder) => {

                        setSelectedPurchaseOrder(

                            purchaseOrder

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

                <CreatePurchaseOrderDialog

                    open={createOpen}

                    onOpenChange={setCreateOpen}

                    loading={createMutation.isPending}

                    onSubmit={handleCreate}

                />

                {

                    selectedPurchaseOrder && (

                        <EditPurchaseOrderDialog

                            open={editOpen}

                            onOpenChange={setEditOpen}

                            purchaseOrder={selectedPurchaseOrder}

                            loading={updateMutation.isPending}

                            onSubmit={handleUpdate}

                        />

                    )

                }

            </div>

        </AppLayout>

    );

}

export default PurchaseOrderPage;