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

import {
    Textarea
} from "@/components/ui/textarea";

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

function CreatePurchaseRequestDialog({

    open,

    onOpenChange,

    loading,

    onSubmit

}: Props) {

    const {

        data

    } = useInventoryItems();

    const inventoryItems =
        data?.data || [];

    const [

        form,

        setForm

    ] = useState({

        title: "",

        description: "",

        quantity: 1,

        inventoryItemId: ""

    });

    const handleSubmit = () => {

        if (

            form.title.trim().length < 2

        ) {

            toast.error(

                "Title is required"

            );

            return;

        }

        if (

            form.quantity <= 0

        ) {

            toast.error(

                "Quantity must be greater than 0"

            );

            return;

        }

        if (

            !form.inventoryItemId

        ) {

            toast.error(

                "Select an Inventory Item"

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

                        Create Purchase Request

                    </DialogTitle>

                </DialogHeader>

                <div className="space-y-5">

                    <div className="space-y-2">

                        <Label>

                            Title

                        </Label>

                        <Input

                            placeholder="Purchase Request Title"

                            value={form.title}

                            onChange={(e) =>

                                setForm({

                                    ...form,

                                    title:

                                        e.target.value

                                })

                            }

                        />

                    </div>

                    <div className="space-y-2">

                        <Label>

                            Description

                        </Label>

                        <Textarea

                            placeholder="Description"

                            value={form.description}

                            onChange={(e) =>

                                setForm({

                                    ...form,

                                    description:

                                        e.target.value

                                })

                            }

                        />

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

                                <SelectValue

                                    placeholder="Select Inventory Item"

                                />

                            </SelectTrigger>

                            <SelectContent>

                                {

                                    inventoryItems.map(

                                        (

                                            item: any

                                        ) => (

                                            <SelectItem

                                                key={item.id}

                                                value={item.id}

                                            >

                                                {

                                                    item.name

                                                }

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

                                    quantity:

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

                                "Create Purchase Request"

                        }

                    </Button>

                </div>

            </DialogContent>

        </Dialog>

    );

}

export default CreatePurchaseRequestDialog;