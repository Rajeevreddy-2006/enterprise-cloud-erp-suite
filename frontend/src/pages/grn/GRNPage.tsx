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

import GRNTable from "@/components/grn/GRNTable";

import CreateGRNDialog from "@/components/grn/CreateGRNDialog";

import EditGRNDialog from "@/components/grn/EditGRNDialog";

import {
    useGRNs
} from "@/hooks/grn_hooks/useGRNs";

import {
    useCreateGRN
} from "@/hooks/grn_hooks/useCreateGRN";

import {
    useUpdateGRN
} from "@/hooks/grn_hooks/useUpdateGRN";

import {
    useDeleteGRN
} from "@/hooks/grn_hooks/useDeleteGRN";

function GRNPage() {

    const [

        createOpen,

        setCreateOpen

    ] = useState(false);

    const [

        editOpen,

        setEditOpen

    ] = useState(false);

    const [

        selectedGRN,

        setSelectedGRN

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

    } = useGRNs();

    const createMutation =
        useCreateGRN();

    const updateMutation =
        useUpdateGRN();

    const deleteMutation =
        useDeleteGRN();

    const grns =
        data?.data || [];

    const filtered =
        useMemo(

            () =>

                grns.filter(

                    (grn: any) =>

                        grn.grnNumber

                            ?.toLowerCase()

                            .includes(

                                search.toLowerCase()

                            )

                        ||

                        grn.purchaseOrder?.orderNumber

                            ?.toLowerCase()

                            .includes(

                                search.toLowerCase()

                            )

                        ||

                        grn.status

                            ?.toLowerCase()

                            .includes(

                                search.toLowerCase()

                            )

                        ||

                        grn.remarks

                            ?.toLowerCase()

                            .includes(

                                search.toLowerCase()

                            )

                ),

            [

                grns,

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

                        "GRN Created Successfully"

                    );

                    setCreateOpen(false);

                    refetch();

                },

                onError(error: any) {

                    toast.error(

                        error.response?.data?.message ||

                        "Failed to create GRN"

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

                id:

                    selectedGRN.id,

                data

            },

            {

                onSuccess() {

                    toast.success(

                        "GRN Updated Successfully"

                    );

                    setEditOpen(false);

                    refetch();

                },

                onError(error: any) {

                    toast.error(

                        error.response?.data?.message ||

                        "Failed to update GRN"

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

                "Delete this GRN?"

            )

        ) {

            return;

        }

        deleteMutation.mutate(

            id,

            {

                onSuccess() {

                    toast.success(

                        "GRN Deleted Successfully"

                    );

                    refetch();

                },

                onError(error: any) {

                    toast.error(

                        error.response?.data?.message ||

                        "Failed to delete GRN"

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

                    Failed to load GRNs.

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

                            Goods Receipt Notes

                        </h1>

                        <p className="text-slate-400">

                            Manage Goods Receipt Notes

                        </p>

                    </div>

                    <Button

                        className="text-white"

                        onClick={() =>

                            setCreateOpen(true)

                        }

                    >

                        Add GRN

                    </Button>

                </div>

                <Input

                    placeholder="Search GRNs..."

                    value={search}

                    onChange={(e) => {

                        setSearch(

                            e.target.value

                        );

                        setPage(1);

                    }}

                />

                <GRNTable

                    grns={paginated}

                    onEdit={(grn) => {

                        setSelectedGRN(

                            grn

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

                <CreateGRNDialog

                    open={createOpen}

                    onOpenChange={setCreateOpen}

                    loading={createMutation.isPending}

                    onSubmit={handleCreate}

                />

                {

                    selectedGRN && (

                        <EditGRNDialog

                            open={editOpen}

                            onOpenChange={setEditOpen}

                            grn={selectedGRN}

                            loading={updateMutation.isPending}

                            onSubmit={handleUpdate}

                        />

                    )

                }

            </div>

        </AppLayout>

    );

}

export default GRNPage;