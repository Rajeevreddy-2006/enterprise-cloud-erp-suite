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

import StockMovementTable from "@/components/stockMovement/StockMovementTable";

import CreateStockMovementDialog from "@/components/stockMovement/CreateStockMovementDialog";

import {
    useStockMovements
} from "@/hooks/stockMovement_hooks/useStockMovements";

import {
    useCreateStockMovement
} from "@/hooks/stockMovement_hooks/useCreateStockMovement";

import {
    useDeleteStockMovement
} from "@/hooks/stockMovement_hooks/useDeleteStockMovement";

function StockMovementPage() {

    const [

        createOpen,

        setCreateOpen

    ] = useState(false);

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

    } = useStockMovements();

    const createMutation =
        useCreateStockMovement();

    const deleteMutation =
        useDeleteStockMovement();

    const stockMovements =
        data?.data || [];

    const filtered =
        useMemo(

            () =>

                stockMovements.filter(

                    (movement: any) =>

                        movement.inventoryItem?.name

                            ?.toLowerCase()

                            .includes(

                                search.toLowerCase()

                            )

                        ||

                        movement.movementType

                            ?.toLowerCase()

                            .includes(

                                search.toLowerCase()

                            )

                        ||

                        movement.remarks

                            ?.toLowerCase()

                            .includes(

                                search.toLowerCase()

                            )

                ),

            [

                stockMovements,

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

                        "Stock Movement Created Successfully"

                    );

                    setCreateOpen(false);

                    refetch();

                },

                onError(error: any) {

                    toast.error(

                        error.response?.data?.message ||

                        "Failed to create Stock Movement"

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

                "Delete this Stock Movement?"

            )

        ) {

            return;

        }

        deleteMutation.mutate(

            id,

            {

                onSuccess() {

                    toast.success(

                        "Stock Movement Deleted Successfully"

                    );

                    refetch();

                },

                onError(error: any) {

                    toast.error(

                        error.response?.data?.message ||

                        "Failed to delete Stock Movement"

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

                    Failed to load Stock Movements.

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

                            Stock Movements

                        </h1>

                        <p className="text-slate-400">

                            Track Inventory Stock Movements

                        </p>

                    </div>

                    <Button

                        className="text-white"

                        onClick={() =>

                            setCreateOpen(true)

                        }

                    >

                        Add Stock Movement

                    </Button>

                </div>

                <Input

                    placeholder="Search Stock Movements..."

                    value={search}

                    onChange={(e) => {

                        setSearch(

                            e.target.value

                        );

                        setPage(1);

                    }}

                />

                <StockMovementTable

                    stockMovements={paginated}

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

                <CreateStockMovementDialog

                    open={createOpen}

                    onOpenChange={setCreateOpen}

                    loading={createMutation.isPending}

                    onSubmit={handleCreate}

                />

            </div>

        </AppLayout>

    );

}

export default StockMovementPage;