import { useMemo, useState } from "react";

import { toast } from "sonner";

import AppLayout from "@/components/layout/AppLayout";

import InviteCustomerDialog from "@/components/customerInvitation/InviteCustomerDialog";
import CustomerInvitationTable from "@/components/customerInvitation/CustomerInvitationTable";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

import {
    useCustomerInvitations,
} from "@/hooks/customerInvitation_hooks/useCustomerInvitations";

import {
    useCreateCustomerInvitation,
} from "@/hooks/customerInvitation_hooks/useCreateCustomerInvitation";

import {
    useDeleteCustomerInvitation,
} from "@/hooks/customerInvitation_hooks/useDeleteCustomerInvitation";

import {
    useResendCustomerInvitation,
} from "@/hooks/customerInvitation_hooks/useResendCustomerInvitation";

import type {
    InviteCustomerFormData,
} from "@/schemas/customerInvitation.schema";

import type { CustomerInvitation } from "@/types/customerInvitation.types";

function CustomerInvitationPage() {

    const [open, setOpen] =
        useState(false);

    const [search, setSearch] =
        useState("");

    const [page, setPage] =
        useState(1);

    const pageSize = 10;

    const {
        data: invitations = [],
        isLoading,
        isError,
    } = useCustomerInvitations() as {
        data: CustomerInvitation[];
        isLoading: boolean;
        isError: boolean;
    };

    const {
        mutate: inviteCustomer,
        isPending: creating,
    } = useCreateCustomerInvitation();

    const {
        mutate: resendInvitation,
    } = useResendCustomerInvitation();

    const {
        mutate: deleteInvitation,
    } = useDeleteCustomerInvitation();

    function handleInvite(data: InviteCustomerFormData) {
        inviteCustomer(
            data,
            {
                onSuccess() {
                    toast.success(
                        "Invitation sent successfully."
                    );
                    setOpen(false);
                },
                onError(error: any) {
                    toast.error(
                        error?.response?.data?.message ??
                        "Unable to send invitation."
                    );
                },
            }
        );
    }
    function handleResend(id: string) {
        resendInvitation(
            id,
            {
                onSuccess() {
                    toast.success(
                        "Invitation resent successfully."
                    );
                },
                onError(error: any) {
                    toast.error(
                        error?.response?.data?.message ??
                        "Unable to resend invitation."
                    );
                },
            }
        );
    }
    function handleDelete(id: string) {
        if (
            !window.confirm(
                "Delete this invitation?"
            )
        ) {
            return;
        }
        deleteInvitation(
            id,
            {
                onSuccess() {
                    toast.success(
                        "Invitation deleted successfully."
                    );
                },
                onError(error: any) {
                    toast.error(
                        error?.response?.data?.message ??
                        "Unable to delete invitation."
                    );
                },
            }
        );
    }
    const filteredInvitations =
        useMemo(() => {
            return invitations.filter(
                invitation =>
                    invitation.email
                        .toLowerCase()
                        .includes(
                            search.toLowerCase()
                        )
            );
        }, [
            invitations,
            search,
        ]);
    const paginatedInvitations =
        useMemo(() => {
            const start =
                (page - 1) * pageSize;
            return filteredInvitations.slice(
                start,
                start + pageSize
            );
        }, [
            filteredInvitations,
            page,
        ]);
    const totalPages =
        Math.max(
            1,
            Math.ceil(
                filteredInvitations.length /
                pageSize
            )
        );
    return (
        <AppLayout>
            <div className="space-y-6">
                <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                    <h1 className="text-3xl font-bold text-white">
                        Customer Invitations
                    </h1>
                    <Button className="w-full sm:w-auto text-white"
                        onClick={() =>
                            setOpen(true)
                        }
                    >
                        Invite Customer
                    </Button>
                </div>
                <Input
                    className="w-full"
                    placeholder="Search by email..."
                    value={search}
                    onChange={e =>
                        setSearch(
                            e.target.value
                        )
                    }
                />
                {
                    isLoading ? (
                        <p className="text-slate-400">
                            Loading...
                        </p>
                    ) : isError ? (
                        <p className="text-red-400">
                            Failed to load invitations.
                        </p>
                    ) : (
                        <div className="overflow-x-auto rounded-lg">
                        <CustomerInvitationTable
                            invitations={
                                paginatedInvitations
                            }
                            onResend={
                                handleResend
                            }
                            onDelete={
                                handleDelete
                            }
                        />
                        </div>
                    )
                }
                <div className="flex flex-col gap-2 sm:flex-row sm:justify-end">
                    <Button
                        variant="outline"
                        disabled={
                            page === 1
                        }
                        onClick={() =>
                            setPage(
                                prev =>
                                    prev - 1
                            )
                        }
                    >
                        Previous
                    </Button>

                    <Button
                        variant="outline"
                        disabled={
                            page >= totalPages
                        }
                        onClick={() =>
                            setPage(
                                prev =>
                                    prev + 1
                            )
                        }
                    >
                        Next
                    </Button>
                </div>
            </div>
            <InviteCustomerDialog
                open={open}
                onOpenChange={setOpen}
                loading={creating}
                onSubmit={handleInvite}
            />
        </AppLayout>
    );
}

export default CustomerInvitationPage;