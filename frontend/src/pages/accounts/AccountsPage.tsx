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

import AccountTable from "@/components/accounts/AccountTable";
import CreateAccountDialog from "@/components/accounts/CreateAccountDialog";
import EditAccountDialog from "@/components/accounts/EditAccountDialog";

import {
    useAccounts
} from "@/hooks/account_hooks/useAccounts";

import {
    useCreateAccount
} from "@/hooks/account_hooks/useCreateAccount";

import {
    useUpdateAccount
} from "@/hooks/account_hooks/useUpdateAccount";

import {
    useDeleteAccount
} from "@/hooks/account_hooks/useDeleteAccount";

function AccountPage() {

    const [

        createOpen,

        setCreateOpen

    ] = useState(false);

    const [

        editOpen,

        setEditOpen

    ] = useState(false);

    const [

        selectedAccount,

        setSelectedAccount

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

    } = useAccounts();

    const createMutation =
        useCreateAccount();

    const updateMutation =
        useUpdateAccount();

    const deleteMutation =
        useDeleteAccount();

    const accounts =
        data?.data || [];

    const filtered =
        useMemo(

            () =>

                accounts.filter(

                    (account: any) =>

                        account.name
                            .toLowerCase()
                            .includes(
                                search.toLowerCase()
                            )

                        ||

                        account.code
                            .toLowerCase()
                            .includes(
                                search.toLowerCase()
                            )

                        ||

                        account.type
                            .toLowerCase()
                            .includes(
                                search.toLowerCase()
                            )

                ),

            [

                accounts,

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

                        "Account Created Successfully"

                    );

                    setCreateOpen(false);

                    refetch();

                },

                onError(error: any) {

                    toast.error(

                        error.response?.data?.message ||

                        "Failed to Create Account"

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

                    selectedAccount.id,

                data

            },

            {

                onSuccess() {

                    toast.success(

                        "Account Updated Successfully"

                    );

                    setEditOpen(false);

                    refetch();

                },

                onError(error: any) {

                    toast.error(

                        error.response?.data?.message ||

                        "Failed to Update Account"

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

                "Delete this account?"

            )

        ) {

            return;

        }

        deleteMutation.mutate(

            id,

            {

                onSuccess() {

                    toast.success(

                        "Account Deleted Successfully"

                    );

                    refetch();

                },

                onError(error: any) {

                    toast.error(

                        error.response?.data?.message ||

                        "Failed to Delete Account"

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

                    Failed to load accounts.

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

                            Accounts

                        </h1>

                        <p className="text-slate-400">

                            Manage Financial Accounts

                        </p>

                    </div>

                    <Button

                        className="text-white"

                        onClick={() =>

                            setCreateOpen(true)

                        }

                    >

                        Add Account

                    </Button>

                </div>

                <Input

                    placeholder="Search by Name, Code or Type..."

                    value={search}

                    onChange={(e) => {

                        setSearch(

                            e.target.value

                        );

                        setPage(1);

                    }}

                />

                <AccountTable

                    accounts={paginated}

                    onEdit={(account) => {

                        setSelectedAccount(

                            account

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

                                    page ===

                                    totalPages

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

                <CreateAccountDialog

                    open={createOpen}

                    onOpenChange={

                        setCreateOpen

                    }

                    loading={

                        createMutation.isPending

                    }

                    onSubmit={

                        handleCreate

                    }

                />

                {

                    selectedAccount && (

                        <EditAccountDialog

                            open={editOpen}

                            onOpenChange={

                                setEditOpen

                            }

                            account={

                                selectedAccount

                            }

                            loading={

                                updateMutation.isPending

                            }

                            onSubmit={

                                handleUpdate

                            }

                        />

                    )

                }

            </div>

        </AppLayout>

    );

}

export default AccountPage;