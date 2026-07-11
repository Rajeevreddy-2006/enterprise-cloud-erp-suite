import {
    useMemo,
    useState
} from "react";

import AppLayout
from "@/components/layout/AppLayout";

import {
    Button
} from "@/components/ui/button";

import {
    Input
} from "@/components/ui/input";

import {
    toast
} from "sonner";

import InventoryTable
from "@/components/inventory/InventoryTable";

import CreateInventoryDialog
from "@/components/inventory/CreateInventoryDialog";

import EditInventoryDialog
from "@/components/inventory/EditInventoryDialog";

import {
    useInventoryItems
} from "@/hooks/inventory_hooks/useInventoryItems";

import {
    useCreateInventoryItem
} from "@/hooks/inventory_hooks/useCreateInventoryItem";

import {
    useUpdateInventoryItem
} from "@/hooks/inventory_hooks/useUpdateInventoryItem";

import {
    useDeleteInventoryItem
} from "@/hooks/inventory_hooks/useDeleteInventoryItem";

function InventoryPage() {

    const [createOpen, setCreateOpen] =
        useState(false);

    const [editOpen, setEditOpen] =
        useState(false);

    const [selectedItem, setSelectedItem] =
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

    } = useInventoryItems();

    const create =
        useCreateInventoryItem();

    const update =
        useUpdateInventoryItem();

    const del =
        useDeleteInventoryItem();

    const inventoryItems =
        data?.data || [];

    const filtered =
        useMemo(

            () =>

                inventoryItems.filter(

                    (item: any) =>

                        item.name
                            ?.toLowerCase()
                            .includes(search.toLowerCase())

                        ||

                        item.sku
                            ?.toLowerCase()
                            .includes(search.toLowerCase())

                ),

            [

                inventoryItems,

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

        create.mutate(

            data,

            {

                onSuccess() {

                    toast.success(

                        "Inventory Item Created"

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

                id: selectedItem.id,

                data

            },

            {

                onSuccess() {

                    toast.success(

                        "Inventory Item Updated"

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

                "Delete Inventory Item?"

            )

        ) return;

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

                    Failed to load inventory.

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

                            Inventory

                        </h1>

                        <p className="text-slate-400">

                            Manage Inventory Items

                        </p>

                    </div>

                    <Button

                        className="text-white"

                        onClick={() =>

                            setCreateOpen(true)

                        }

                    >

                        Add Inventory Item

                    </Button>

                </div>

                <Input

                    placeholder="Search by Item Name or SKU..."

                    value={search}

                    onChange={(e) => {

                        setSearch(

                            e.target.value

                        );

                        setPage(1);

                    }}

                />

                <InventoryTable

                    inventoryItems={paginated}

                    onEdit={(item) => {

                        setSelectedItem(item);

                        setEditOpen(true);

                    }}

                    onDelete={handleDelete}

                />

                {

                    totalPages > 1 && (

                        <div className="flex justify-end gap-2">

                            <Button

                                variant="outline"

                                disabled={page === 1}

                                onClick={() =>

                                    setPage(page - 1)

                                }

                            >

                                Previous

                            </Button>

                            <Button

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

                <CreateInventoryDialog

                    open={createOpen}

                    onOpenChange={setCreateOpen}

                    loading={create.isPending}

                    onSubmit={handleCreate}

                />

                {

                    selectedItem && (

                        <EditInventoryDialog

                            open={editOpen}

                            onOpenChange={setEditOpen}

                            inventoryItem={selectedItem}

                            loading={update.isPending}

                            onSubmit={handleUpdate}

                        />

                    )

                }

            </div>

        </AppLayout>

    );

}

export default InventoryPage;