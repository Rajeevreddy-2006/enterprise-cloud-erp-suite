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
    useSalesOrders
} from "@/hooks/salesOrder_hooks/useSalesOrders";

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

function CreateInvoiceDialog({

    open,

    onOpenChange,

    loading,

    onSubmit

}: Props) {

    const {

        data

    } = useSalesOrders();

    const salesOrders =
        data?.data || [];

    const [

        form,

        setForm

    ] = useState({

        salesOrderId: "",

        amount: 0,

        dueDate: ""

    });

    useEffect(() => {

        const order =
            salesOrders.find(

                (o: any) =>

                    o.id === form.salesOrderId

            );

        if (!order) return;

        setForm(prev => ({

            ...prev,

            amount:

                Number(

                    order.totalAmount

                )

        }));

    }, [

        form.salesOrderId,

        salesOrders

    ]);

    return (

        <Dialog

            open={open}

            onOpenChange={onOpenChange}

        >

            <DialogContent className="sm:max-w-lg">

                <DialogHeader>

                    <DialogTitle>

                        Create Invoice

                    </DialogTitle>

                </DialogHeader>

                <div className="space-y-5">

                    <div className="space-y-2">

                        <Label>

                            Sales Order

                        </Label>

                        <Select

                            value={form.salesOrderId}

                            onValueChange={(value) =>

                                setForm({

                                    ...form,

                                    salesOrderId: value

                                })

                            }

                        >

                            <SelectTrigger>

                                <SelectValue

                                    placeholder="Select Sales Order"

                                />

                            </SelectTrigger>

                            <SelectContent>

                                {

                                    salesOrders.map(

                                        (

                                            order: any

                                        ) => (

                                            <SelectItem

                                                key={order.id}

                                                value={order.id}

                                            >

                                                {

                                                    order.orderNumber

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

                            Customer

                        </Label>

                        <Input

                            value={

                                salesOrders.find(

                                    (

                                        order: any

                                    ) =>

                                        order.id ===

                                        form.salesOrderId

                                )?.customer?.name ||

                                ""

                            }

                            readOnly

                        />

                    </div>

                    <div className="space-y-2">

                        <Label>

                            Invoice Amount

                        </Label>

                        <Input

                            value={

                                form.amount

                                    ?

                                    `₹ ${form.amount.toLocaleString("en-IN")}`

                                    :

                                    ""

                            }

                            readOnly

                        />

                    </div>

                    <div className="space-y-2">

                        <Label>

                            Due Date

                        </Label>

                        <Input

                            type="date"

                            value={form.dueDate}

                            onChange={(e) =>

                                setForm({

                                    ...form,

                                    dueDate:

                                        e.target.value

                                })

                            }

                        />

                    </div>

                    <Button

                        className="w-full text-white"

                        disabled={loading}

                        onClick={() =>

                            onSubmit(form)

                        }

                    >

                        {

                            loading

                                ?

                                "Creating..."

                                :

                                "Create Invoice"

                        }

                    </Button>

                </div>

            </DialogContent>

        </Dialog>

    );

}

export default CreateInvoiceDialog;