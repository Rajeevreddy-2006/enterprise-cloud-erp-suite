import {

    useMemo,

    useState

}

from "react";

import AppLayout

from "@/components/layout/AppLayout";

import CustomerTable

from "@/components/customer/CustomerTable";

import CreateCustomerDialog

from "@/components/customer/CreateCustomerDialog";

import EditCustomerDialog

from "@/components/customer/EditCustomerDialog";

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

import {

    useCustomers

}

from "@/hooks/customer_hooks/useCustomers";

import {

    useCreateCustomer

}

from "@/hooks/customer_hooks/useCreateCustomer";

import {

    useUpdateCustomer

}

from "@/hooks/customer_hooks/useUpdateCustomer";

import {

    useDeleteCustomer

}

from "@/hooks/customer_hooks/useDeleteCustomer";

function CustomersPage() {

    const [

        createOpen,

        setCreateOpen

    ]

    =

    useState(

        false

    );

    const [

        editOpen,

        setEditOpen

    ]

    =

    useState(

        false

    );

    const [

        selectedCustomer,

        setSelectedCustomer

    ]

    =

    useState<any>(

        null

    );

    const [

        search,

        setSearch

    ]

    =

    useState(

        ""

    );

    const [

        page,

        setPage

    ]

    =

    useState(

        1

    );

    const pageSize =

        10;

    const {

        data,

        refetch,

        isLoading,

        isError

    }

    =

    useCustomers();

    const create =

        useCreateCustomer();

    const update =

        useUpdateCustomer();

    const del =

        useDeleteCustomer();

    const customers =

        data?.data

        ||

        [];

    const filteredCustomers =

        useMemo(

            () =>

                customers.filter(

                    (

                        customer: any

                    ) =>

                        customer.name

                            ?.toLowerCase()

                            .includes(

                                search

                                .toLowerCase()

                            )

                        ||

                        customer.email

                            ?.toLowerCase()

                            .includes(

                                search

                                .toLowerCase()

                            )

                ),

            [

                customers,

                search

            ]

        );

    const totalPages =

        Math.ceil(

            filteredCustomers.length /

            pageSize

        );

    const paginatedCustomers =

        filteredCustomers.slice(

            (

                page - 1

            )

            *

            pageSize,

            page

            *

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

                        "Customer created successfully"

                    );

                    setCreateOpen(

                        false

                    );

                    refetch();

                },

                onError(

                    error: any

                ) {

                    toast.error(

                        error.response?.data?.message

                        ||

                        "Failed to create customer"

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

                    selectedCustomer.id,

                data

            },

            {

                onSuccess() {

                    toast.success(

                        "Customer updated successfully"

                    );

                    setEditOpen(

                        false

                    );

                    refetch();

                },

                onError(

                    error: any

                ) {

                    toast.error(

                        error.response?.data?.message

                        ||

                        "Failed to update customer"

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

                "Delete this customer?"

            )

        )

            return;

        del.mutate(

            id,

            {

                onSuccess() {

                    toast.success(

                        "Customer deleted"

                    );

                    refetch();

                },

                onError(

                    error: any

                ) {

                    toast.error(

                        error.response?.data?.message

                        ||

                        "Delete failed"

                    );

                }

            }

        );

    };

    // if (

    //     isLoading

    // ) {

    //     return (

    //         <AppLayout>

    //             <div

    //                 className="text-center py-10"

    //             >

    //                 Loading...

    //             </div>

    //         </AppLayout>

    //     );

    // }

    // if (

    //     isError

    // ) {

    //     return (

    //         <AppLayout>

    //             <div

    //                 className="text-center py-10 text-red-500"

    //             >

    //                 Failed to load customers

    //             </div>

    //         </AppLayout>

    //     );

    // }

    return (

        <AppLayout>

            <div

                className="space-y-6"

            >

                <div

                    className="flex items-center justify-between"

                >

                    <div>

                        <h1

                            className="text-3xl font-bold text-white"

                        >

                            Customers

                        </h1>

                        <p

                            className="text-slate-400"

                        >

                            Manage customers

                        </p>

                    </div>

                    <Button

                        className="text-white"

                        onClick={() =>

                            setCreateOpen(

                                true

                            )

                        }

                    >

                        Add Customer

                    </Button>

                </div>

                <Input

                    placeholder="Search customers..."

                    value={

                        search

                    }

                    onChange={(e) => {

                        setSearch(

                            e.target.value

                        );

                        setPage(

                            1

                        );

                    }}

                />

                <CustomerTable

                    customers={

                        paginatedCustomers

                    }

                    onEdit={(customer
                    ) => {

                        setSelectedCustomer(

                            customer

                        );

                        setEditOpen(

                            true

                        );

                    }}

                    onDelete={

                        handleDelete

                    }

                />

                {

                    totalPages >

                    1

                    &&

                    (

                        <div

                            className="flex justify-end gap-2"

                        >

                            <Button

                                variant="outline"

                                disabled={

                                    page === 1

                                }

                                onClick={() =>

                                    setPage(

                                        (

                                            prev

                                        ) =>

                                            prev - 1

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

                                        (

                                            prev

                                        ) =>

                                            prev + 1

                                    )

                                }

                            >

                                Next

                            </Button>

                        </div>

                    )

                }

                <CreateCustomerDialog

                    open={

                        createOpen

                    }

                    onOpenChange={

                        setCreateOpen

                    }

                    loading={

                        create.isPending

                    }

                    onSubmit={

                        handleCreate

                    }

                />

                {

                    selectedCustomer

                    &&

                    (

                        <EditCustomerDialog

                            open={

                                editOpen

                            }

                            onOpenChange={

                                setEditOpen

                            }

                            customer={

                                selectedCustomer

                            }

                            loading={

                                update.isPending

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

export default CustomersPage;