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

interface Props {

    open: boolean;

    onOpenChange: (
        value: boolean
    ) => void;

    inventoryItem: any;

    loading?: boolean;

    onSubmit: (
        data: any
    ) => void;

}

function EditInventoryDialog({

    open,

    onOpenChange,

    inventoryItem,

    loading,

    onSubmit

}: Props) {

    const [

        form,

        setForm

    ] = useState({

        name: "",

        sku: "",

        quantity: 0,

        unitPrice: 0

    });

    useEffect(() => {

        if (!inventoryItem) return;

        setForm({

            name:
                inventoryItem.name,

            sku:
                inventoryItem.sku,

            quantity:
                inventoryItem.quantity,

            unitPrice:
                Number(
                    inventoryItem.unitPrice
                )

        });

    }, [

        inventoryItem

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

                        Edit Inventory Item

                    </DialogTitle>

                </DialogHeader>

                <div className="space-y-5">

                    <div className="space-y-2">

                        <Label>

                            Item Name

                        </Label>

                        <Input

                            value={form.name}

                            onChange={(e) =>

                                setForm({

                                    ...form,

                                    name:
                                        e.target.value

                                })

                            }

                        />

                    </div>

                    <div className="space-y-2">

                        <Label>

                            SKU

                        </Label>

                        <Input

                            value={form.sku}

                            onChange={(e) =>

                                setForm({

                                    ...form,

                                    sku:
                                        e.target.value

                                })

                            }

                        />

                    </div>

                    <div className="space-y-2">

                        <Label>

                            Quantity

                        </Label>

                        <Input

                            type="number"

                            min={0}

                            value={form.quantity}

                            onChange={(e) =>

                                setForm({

                                    ...form,

                                    quantity:
                                        Number(
                                            e.target.value
                                        )

                                })

                            }

                        />

                    </div>

                    <div className="space-y-2">

                        <Label>

                            Unit Price (₹)

                        </Label>

                        <Input

                            type="number"

                            min={0}

                            value={form.unitPrice}

                            onChange={(e) =>

                                setForm({

                                    ...form,

                                    unitPrice:
                                        Number(
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

                                ?

                                "Updating..."

                                :

                                "Update Inventory Item"

                        }

                    </Button>

                </div>

            </DialogContent>

        </Dialog>

    );

}

export default EditInventoryDialog;