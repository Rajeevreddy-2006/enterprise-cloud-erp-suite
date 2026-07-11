import {
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

    loading?: boolean;

    onSubmit: (
        data: any
    ) => void;

}

function CreateInventoryDialog({

    open,

    onOpenChange,

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

                        Create Inventory Item

                    </DialogTitle>

                </DialogHeader>

                <div className="space-y-5">

                    <div className="space-y-2">

                        <Label>

                            Item Name

                        </Label>

                        <Input

                            placeholder="Enter Item Name"

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

                            placeholder="Enter SKU"

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

                            placeholder="Enter Quantity"

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

                            placeholder="Enter Unit Price"

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

                                "Creating..."

                                :

                                "Create Inventory Item"

                        }

                    </Button>

                </div>

            </DialogContent>

        </Dialog>

    );

}

export default CreateInventoryDialog;