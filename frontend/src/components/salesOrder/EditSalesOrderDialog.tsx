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
    useCustomers
} from "@/hooks/customer_hooks/useCustomers";

import {
    useInventoryItems
} from "@/hooks/inventory_hooks/useInventoryItems";

interface Props {

    open: boolean;

    onOpenChange: (
        value: boolean
    ) => void;

    salesOrder: any;

    loading?: boolean;

    onSubmit: (
        data: any
    ) => void;

}

function EditSalesOrderDialog({

    open,

    onOpenChange,

    salesOrder,

    loading,

    onSubmit

}: Props) {

    const {

        data: customerData

    } = useCustomers();

    const {

        data: inventoryData

    } = useInventoryItems();

    const customers =
        customerData?.data || [];

    const inventoryItems =
        inventoryData?.data || [];

    const [

        form,

        setForm

    ] = useState({

        customerId: "",

        inventoryItemId: "",

        quantity: 1,

        unitPrice: 0,

        totalAmount: 0

    });

    useEffect(() => {

        if (!salesOrder) return;

        setForm({

            customerId:
                salesOrder.customerId,

            inventoryItemId:
                salesOrder.inventoryItemId,

            quantity:
                salesOrder.quantity,

            unitPrice:
                Number(
                    salesOrder.unitPrice
                ),

            totalAmount:
                Number(
                    salesOrder.totalAmount
                )

        });

    }, [

        salesOrder

    ]);

    useEffect(() => {

        setForm(prev => ({

            ...prev,

            totalAmount:

                prev.quantity *

                prev.unitPrice

        }));

    }, [

        form.quantity,

        form.unitPrice

    ]);

    const handleSubmit = () => {

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

                        Edit Sales Order

                    </DialogTitle>

                </DialogHeader>

                <div className="space-y-5">

                    <div className="space-y-2">

                        <Label>

                            Customer

                        </Label>

                        <Select

                            value={form.customerId}

                            onValueChange={(value) =>

                                setForm({

                                    ...form,

                                    customerId: value

                                })

                            }

                        >

                            <SelectTrigger>

                                <SelectValue />

                            </SelectTrigger>

                            <SelectContent>

                                {

                                    customers.map(

                                        (customer: any) => (

                                            <SelectItem

                                                key={customer.id}

                                                value={customer.id}

                                            >

                                                {customer.name}

                                            </SelectItem>

                                        )

                                    )

                                }

                            </SelectContent>

                        </Select>

                    </div>

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

                            Total Amount

                        </Label>

                        <Input

                            value={`₹ ${form.totalAmount.toLocaleString("en-IN")}`}

                            readOnly

                        />

                    </div>

                    <div className="space-y-2">

                        <Label>

                            Current Status

                        </Label>

                        <Input

                            value={salesOrder?.status ?? ""}

                            readOnly

                            className="font-semibold"

                        />

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

                                "Update Sales Order"

                        }

                    </Button>

                </div>

            </DialogContent>

        </Dialog>

    );

}

export default EditSalesOrderDialog;