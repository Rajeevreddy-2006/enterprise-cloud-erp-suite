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

import PurchaseRequestTable from "@/components/purchaseRequest/PurchaseRequestTable";

import CreatePurchaseRequestDialog from "@/components/purchaseRequest/CreatePurchaseRequestDialog";

import EditPurchaseRequestDialog from "@/components/purchaseRequest/EditPurchaseRequestDialog";

import {
    usePurchaseRequests
} from "@/hooks/purchaseRequest_hooks/usePurchaseRequests";

import {
    useCreatePurchaseRequest
} from "@/hooks/purchaseRequest_hooks/useCreatePurchaseRequest";

import {
    useUpdatePurchaseRequest
} from "@/hooks/purchaseRequest_hooks/useUpdatePurchaseRequest";

import {
    useDeletePurchaseRequest
} from "@/hooks/purchaseRequest_hooks/useDeletePurchaseRequest";

import {
    useApprovePurchaseRequest
} from "@/hooks/purchaseRequest_hooks/useApprovePurchaseRequest";

import {
    useRejectPurchaseRequest
} from "@/hooks/purchaseRequest_hooks/useRejectPurchaseRequest";

import { useCreatePurchaseOrder } from "@/hooks/purchaseRequest_hooks/useCreatePurchaseOrder";

function PurchaseRequestPage() {

    const [

        createOpen,

        setCreateOpen

    ] = useState(false);

    const [

        editOpen,

        setEditOpen

    ] = useState(false);

    const [

        selectedRequest,

        setSelectedRequest

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

    } = usePurchaseRequests();

    const createMutation =
        useCreatePurchaseRequest();

    const updateMutation =
        useUpdatePurchaseRequest();

    const deleteMutation =
        useDeletePurchaseRequest();

    const approveMutation =
        useApprovePurchaseRequest();

    const rejectMutation =
        useRejectPurchaseRequest();

    const createPOMutation =
        useCreatePurchaseOrder();

    const requests =
        data?.data || [];

    const filtered =
        useMemo(

            () =>

                requests.filter(

                    (request: any) =>

                        request.title

                            .toLowerCase()

                            .includes(

                                search.toLowerCase()

                            )

                        ||

                        request.status

                            .toLowerCase()

                            .includes(

                                search.toLowerCase()

                            )

                        ||

                        request.inventoryItem?.name

                            ?.toLowerCase()

                            .includes(

                                search.toLowerCase()

                            )

                ),

            [

                requests,

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

                        "Purchase Request Created Successfully"

                    );

                    setCreateOpen(false);

                    refetch();

                },

                onError(error: any) {

                    toast.error(

                        error.response?.data?.message ||

                        "Failed"

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

                    selectedRequest.id,

                data

            },

            {

                onSuccess() {

                    toast.success(

                        "Purchase Request Updated Successfully"

                    );

                    setEditOpen(false);

                    refetch();

                },

                onError(error: any) {

                    toast.error(

                        error.response?.data?.message ||

                        "Failed"

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

                "Delete this Purchase Request?"

            )

        ) {

            return;

        }

        deleteMutation.mutate(

            id,

            {

                onSuccess() {

                    toast.success(

                        "Purchase Request Deleted Successfully"

                    );

                    refetch();

                }

            }

        );

    };

    const handleApprove = (

        id: string

    ) => {

        approveMutation.mutate(

            id,

            {

                onSuccess() {

                    toast.success(

                        "Purchase Request Approved"

                    );

                    refetch();

                }

            }

        );

    };

    const handleReject = (

        id: string

    ) => {

        rejectMutation.mutate(

            id,

            {

                onSuccess() {

                    toast.success(

                        "Purchase Request Rejected"

                    );

                    refetch();

                }

            }

        );

    };

    const handleCreatePO = (

        id: string

    ) => {

        createPOMutation.mutate(

            id,

            {

                onSuccess() {

                    toast.success(

                        "Purchase Order Created"

                    );

                    refetch();

                }

            }

        );

    };

    if (isLoading) {

        return (

            <AppLayout>

                <div className="text-center py-10">

                    Loading...

                </div>

            </AppLayout>

        );

    }

    if (isError) {

        return (

            <AppLayout>

                <div className="text-center py-10 text-red-500">

                    Failed to load Purchase Requests.

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

                            Purchase Requests

                        </h1>

                        <p className="text-slate-400">

                            Procurement Workflow

                        </p>

                    </div>

                    <Button

                        className="text-white"

                        onClick={() =>

                            setCreateOpen(true)

                        }

                    >

                        Add Purchase Request

                    </Button>

                </div>

                <Input

                    placeholder="Search..."

                    value={search}

                    onChange={(e) => {

                        setSearch(

                            e.target.value

                        );

                        setPage(1);

                    }}

                />

                <PurchaseRequestTable

                    requests={paginated}

                    onEdit={(request) => {

                        setSelectedRequest(

                            request

                        );

                        setEditOpen(true);

                    }}

                    onDelete={handleDelete}

                    onApprove={handleApprove}

                    onReject={handleReject}

                    onCreatePO={handleCreatePO}

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

                <CreatePurchaseRequestDialog

                    open={createOpen}

                    onOpenChange={setCreateOpen}

                    loading={createMutation.isPending}

                    onSubmit={handleCreate}

                />

                {

                    selectedRequest && (

                        <EditPurchaseRequestDialog

                            open={editOpen}

                            onOpenChange={setEditOpen}

                            request={selectedRequest}

                            loading={updateMutation.isPending}

                            onSubmit={handleUpdate}

                        />

                    )

                }

            </div>

        </AppLayout>

    );

}

export default PurchaseRequestPage;