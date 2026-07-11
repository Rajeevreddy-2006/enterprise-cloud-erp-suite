import {
    useEffect,
    useState
} from "react";

import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle
} from "@/components/ui/dialog";

import {
    Button
} from "@/components/ui/button";

import {
    Input
} from "@/components/ui/input";

import {
    Label
} from "@/components/ui/label";

import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue
} from "@/components/ui/select";

import {
    toast
} from "sonner";

import {
    useInventoryItems
} from "@/hooks/inventory_hooks/useInventoryItems";

import {
    useSuppliers
} from "@/hooks/supplier_hooks/useSuppliers";

interface Props {

    open: boolean;

    onOpenChange: (
        value: boolean
    ) => void;

    purchaseOrder: any;

    loading?: boolean;

    onSubmit: (
        data: any
    ) => void;

}

function EditPurchaseOrderDialog({

    open,

    onOpenChange,

    purchaseOrder,

    loading,

    onSubmit

}: Props) {

    const {

        data: inventoryData

    } = useInventoryItems();

    const {

        data: supplierData

    } = useSuppliers();

    const inventoryItems =
        inventoryData?.data || [];

    const suppliers =
        supplierData?.data || [];

    const [

        form,

        setForm

    ] = useState({

        inventoryItemId: "",

        supplierId: "",

        quantity: 1,

        unitPrice: 0,

        status: "PENDING"

    });

    useEffect(() => {

        if (!purchaseOrder) return;

        setForm({

            inventoryItemId:

                purchaseOrder.inventoryItemId,

            supplierId:

                purchaseOrder.supplierId || "",

            quantity:

                purchaseOrder.quantity,

            unitPrice:

                Number(

                    purchaseOrder.unitPrice

                ),

            status:

                purchaseOrder.status

        });

    }, [

        purchaseOrder

    ]);

    const handleSubmit = () => {

        if (!form.inventoryItemId) {

            toast.error(

                "Select Inventory Item"

            );

            return;

        }

        if (form.quantity <= 0) {

            toast.error(

                "Quantity must be greater than 0"

            );

            return;

        }

        if (form.unitPrice <= 0) {

            toast.error(

                "Unit Price must be greater than 0"

            );

            return;

        }

        onSubmit(form);

    };

    return (

        <Dialog

            open={open}

            onOpenChange={onOpenChange}

        >

            <DialogContent className="sm:max-w-lg">

                <DialogHeader>

                    <DialogTitle>

                        Edit Purchase Order

                    </DialogTitle>

                </DialogHeader>

                <div className="space-y-5">

                    <div className="space-y-2">

                        <Label>

                            Inventory Item

                        </Label>

                        <Select

                            value={form.inventoryItemId}

                            onValueChange={(value) =>

                                setForm({

                                    ...form,

                                    inventoryItemId: value

                                })

                            }

                        >

                            <SelectTrigger>

                                <SelectValue />

                            </SelectTrigger>

                            <SelectContent>

                                {

                                    inventoryItems.map(

                                        (item: any) => (

                                            <SelectItem

                                                key={item.id}

                                                value={item.id}

                                            >

                                                {item.name}

                                            </SelectItem>

                                        )

                                    )

                                }

                            </SelectContent>

                        </Select>

                    </div>

                    <div className="space-y-2">

                        <Label>

                            Supplier

                        </Label>

                        <Select

                            value={form.supplierId}

                            onValueChange={(value) =>

                                setForm({

                                    ...form,

                                    supplierId: value

                                })

                            }

                        >

                            <SelectTrigger>

                                <SelectValue placeholder="Select Supplier" />

                            </SelectTrigger>

                            <SelectContent>

                                {

                                    suppliers.map(

                                        (supplier: any) => (

                                            <SelectItem

                                                key={supplier.id}

                                                value={supplier.id}

                                            >

                                                {supplier.name}

                                            </SelectItem>

                                        )

                                    )

                                }

                            </SelectContent>

                        </Select>

                    </div>

                    <div className="space-y-2">

                        <Label>

                            Quantity

                        </Label>

                        <Input

                            type="number"

                            min={1}

                            value={form.quantity}

                            onChange={(e) =>

                                setForm({

                                    ...form,

                                    quantity: Number(

                                        e.target.value

                                    )

                                })

                            }

                        />

                    </div>

                    <div className="space-y-2">

                        <Label>

                            Unit Price

                        </Label>

                        <Input

                            type="number"

                            min={0}

                            step="0.01"

                            value={form.unitPrice}

                            onChange={(e) =>

                                setForm({

                                    ...form,

                                    unitPrice: Number(

                                        e.target.value

                                    )

                                })

                            }

                        />

                    </div>

                    <div className="space-y-2">

                        <Label>

                            Status

                        </Label>

                        <Select

                            value={form.status}

                            onValueChange={(value) =>

                                setForm({

                                    ...form,

                                    status: value

                                })

                            }

                        >

                            <SelectTrigger>

                                <SelectValue />

                            </SelectTrigger>

                            <SelectContent>

                                <SelectItem value="PENDING">

                                    Pending

                                </SelectItem>

                                <SelectItem value="APPROVED">

                                    Approved

                                </SelectItem>

                                <SelectItem value="RECEIVED">

                                    Received

                                </SelectItem>

                                <SelectItem value="CANCELLED">

                                    Cancelled

                                </SelectItem>

                            </SelectContent>

                        </Select>

                    </div>

                    <Button

                        className="w-full text-white"

                        disabled={loading}

                        onClick={handleSubmit}

                    >

                        {

                            loading

                                ?

                                "Updating..."

                                :

                                "Update Purchase Order"

                        }

                    </Button>

                </div>

            </DialogContent>

        </Dialog>

    );

}

export default EditPurchaseOrderDialog;