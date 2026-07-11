import { useState } from "react";

import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle
} from "@/components/ui/dialog";

import { Button } from "@/components/ui/button";

import { Input } from "@/components/ui/input";

import { Label } from "@/components/ui/label";

import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue
} from "@/components/ui/select";

import { toast } from "sonner";

import { useInventoryItems } from "@/hooks/inventory_hooks/useInventoryItems";
import { useSuppliers } from "@/hooks/supplier_hooks/useSuppliers";

interface Props {

    open: boolean;

    onOpenChange: (value: boolean) => void;

    loading?: boolean;

    onSubmit: (data: any) => void;

}

function CreatePurchaseOrderDialog({

    open,

    onOpenChange,

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

        unitPrice: 0

    });

    const handleSubmit = () => {

        if (!form.inventoryItemId) {

            toast.error(

                "Select an Inventory Item"

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

                        Create Purchase Order

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

                                <SelectValue

                                    placeholder="Select Inventory Item"

                                />

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

                                <SelectValue

                                    placeholder="Select Supplier"

                                />

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

                    <Button

                        className="w-full text-white"

                        disabled={loading}

                        onClick={handleSubmit}

                    >

                        {

                            loading

                                ? "Creating..."

                                : "Create Purchase Order"

                        }

                    </Button>

                </div>

            </DialogContent>

        </Dialog>

    );

}

export default CreatePurchaseOrderDialog;