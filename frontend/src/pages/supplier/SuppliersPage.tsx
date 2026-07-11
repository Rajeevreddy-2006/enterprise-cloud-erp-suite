import {

    useState

}

from "react";

import AppLayout

from "@/components/layout/AppLayout";

import SupplierTable

from "@/components/supplier/SupplierTable";

import CreateSupplierDialog

from "@/components/supplier/CreateSupplierDialog";

import EditSupplierDialog

from "@/components/supplier/EditSupplierDialog";

import {

    Button

}

from "@/components/ui/button";

import {

    toast

}

from "sonner";

import {

    useSuppliers

}

from "@/hooks/supplier_hooks/useSuppliers";

import {

    useCreateSupplier

}

from "@/hooks/supplier_hooks/useCreateSupplier";

import {

    useUpdateSupplier

}

from "@/hooks/supplier_hooks/useUpdateSupplier";

import {

    useDeleteSupplier

}

from "@/hooks/supplier_hooks/useDeleteSupplier";

function SupplierPage() {

    const [

        createOpen,

        setCreateOpen

    ] = useState(

        false

    );

    const [

        editOpen,

        setEditOpen

    ] = useState(

        false

    );

    const [

        selectedSupplier,

        setSelectedSupplier

    ] = useState<any>(

        null

    );

    const {

        data,

        refetch

    } =

    useSuppliers();

    const create =

        useCreateSupplier();

    const update =

        useUpdateSupplier();

    const del =

        useDeleteSupplier();

    const suppliers =

        data?.data ||

        [];

    const handleCreate = (

        data: any

    ) => {

        create.mutate(

            data,

            {

                onSuccess() {

                    toast.success(

                        "Supplier created successfully"

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

                        error?.response?.data?.message ||

                        "Failed to create supplier"

                    );

                }

            }

        );

    };

    const handleUpdate = (

        data: any

    ) => {

        if (

            !selectedSupplier

        )

            return;

        update.mutate(

            {

                id:

                    selectedSupplier.id,

                data

            },

            {

                onSuccess() {

                    toast.success(

                        "Supplier updated successfully"

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

                        error?.response?.data?.message ||

                        "Failed to update supplier"

                    );

                }

            }

        );

    };

    const handleDelete = (

        supplierId: string

    ) => {

        del.mutate(

            supplierId,

            {

                onSuccess() {

                    toast.success(

                        "Supplier deleted successfully"

                    );

                    refetch();

                },

                onError(

                    error: any

                ) {

                    toast.error(

                        error?.response?.data?.message ||

                        "Failed to delete supplier"

                    );

                }

            }

        );

    };

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

                            Suppliers

                        </h1>

                        <p

                            className="text-slate-400"

                        >

                            Manage company suppliers

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

                        Add Supplier

                    </Button>

                </div>

                <SupplierTable

                    suppliers={

                        suppliers

                    }

                    onEdit={(

                        supplier

                    ) => {

                        setSelectedSupplier(

                            supplier

                        );

                        setEditOpen(

                            true

                        );

                    }}

                    onDelete={

                        handleDelete

                    }

                />

                <CreateSupplierDialog

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

                    selectedSupplier &&

                    (

                        <EditSupplierDialog

                            open={

                                editOpen

                            }

                            onOpenChange={

                                setEditOpen

                            }

                            supplier={

                                selectedSupplier

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

export default SupplierPage;