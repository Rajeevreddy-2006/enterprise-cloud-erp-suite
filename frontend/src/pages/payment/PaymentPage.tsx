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

import PaymentTable from "@/components/payment/PaymentTable";
import CreatePaymentDialog from "@/components/payment/CreatePaymentDialog";
import EditPaymentDialog from "@/components/payment/EditPaymentDialog";

import {
    usePayments
} from "@/hooks/payment_hooks/usePayments";

import {
    useCreatePayment
} from "@/hooks/payment_hooks/useCreatePayment";

import {
    useUpdatePayment
} from "@/hooks/payment_hooks/useUpdatePayment";

import {
    useDeletePayment
} from "@/hooks/payment_hooks/useDeletePayment";

import {
    useCompletePayment
} from "@/hooks/payment_hooks/useCompletePayment";

import {
    useFailPayment
} from "@/hooks/payment_hooks/useFailPayment";

function PaymentPage() {

    const [createOpen, setCreateOpen] =
        useState(false);

    const [editOpen, setEditOpen] =
        useState(false);

    const [selectedPayment, setSelectedPayment] =
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

    } = usePayments();

    const createMutation =
        useCreatePayment();

    const updateMutation =
        useUpdatePayment();

    const deleteMutation =
        useDeletePayment();

    const completeMutation =
        useCompletePayment();

    const failMutation =
        useFailPayment();

    const payments =
        data?.data || [];

    const filtered =
        useMemo(() =>

            payments.filter((payment: any) =>

                payment.paymentNumber
                    ?.toLowerCase()
                    .includes(search.toLowerCase())

                ||

                payment.invoice?.invoiceNumber
                    ?.toLowerCase()
                    .includes(search.toLowerCase())

                ||

                payment.invoice?.salesOrder?.customer?.name
                    ?.toLowerCase()
                    .includes(search.toLowerCase())

            ),

            [

                payments,

                search

            ]

        );

    const totalPages =
        Math.ceil(filtered.length / pageSize);

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

                        "Payment Created Successfully"

                    );

                    setCreateOpen(false);

                    refetch();

                },

                onError(error: any) {

                    toast.error(

                        error.response?.data?.message ||

                        "Failed to Create Payment"

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

                id: selectedPayment.id,

                data

            },

            {

                onSuccess() {

                    toast.success(

                        "Payment Updated Successfully"

                    );

                    setEditOpen(false);

                    refetch();

                },

                onError(error: any) {

                    toast.error(

                        error.response?.data?.message ||

                        "Failed to Update Payment"

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

                "Delete Payment?"

            )

        ) {

            return;

        }

        deleteMutation.mutate(

            id,

            {

                onSuccess() {

                    toast.success(

                        "Payment Deleted Successfully"

                    );

                    refetch();

                },

                onError(error: any) {

                    toast.error(

                        error.response?.data?.message ||

                        "Failed to Delete Payment"

                    );

                }

            }

        );

    };

    const handleComplete = (

        id: string

    ) => {

        completeMutation.mutate(

            id,

            {

                onSuccess() {

                    toast.success(

                        "Payment Completed"

                    );

                    refetch();

                },

                onError(error: any) {

                    toast.error(

                        error.response?.data?.message ||

                        "Operation Failed"

                    );

                }

            }

        );

    };

    const handleFail = (

        id: string

    ) => {

        failMutation.mutate(

            id,

            {

                onSuccess() {

                    toast.success(

                        "Payment Marked as Failed"

                    );

                    refetch();

                },

                onError(error: any) {

                    toast.error(

                        error.response?.data?.message ||

                        "Operation Failed"

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

                    Failed to load payments.

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

                            Payments

                        </h1>

                        <p className="text-slate-400">

                            Manage Customer Payments

                        </p>

                    </div>

                    {/* <Button

                        className="text-white"

                        onClick={() =>

                            setCreateOpen(true)

                        }

                    >

                        Add Payment

                    </Button> */}

                </div>

                <Input

                    placeholder="Search by Payment Number, Invoice or Customer..."

                    value={search}

                    onChange={(e) => {

                        setSearch(

                            e.target.value

                        );

                        setPage(1);

                    }}

                />

                <PaymentTable

                    payments={paginated}

                    onEdit={(payment) => {

                        setSelectedPayment(payment);

                        setEditOpen(true);

                    }}

                    onDelete={handleDelete}

                    onComplete={handleComplete}

                    onFail={handleFail}

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

                <CreatePaymentDialog

                    open={createOpen}

                    onOpenChange={setCreateOpen}

                    loading={createMutation.isPending}

                    onSubmit={handleCreate}

                />

                {

                    selectedPayment && (

                        <EditPaymentDialog

                            open={editOpen}

                            onOpenChange={setEditOpen}

                            payment={selectedPayment}

                            loading={updateMutation.isPending}

                            onSubmit={handleUpdate}

                        />

                    )

                }

            </div>

        </AppLayout>

    );

}

export default PaymentPage;