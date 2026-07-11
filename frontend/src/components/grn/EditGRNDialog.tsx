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
    usePurchaseOrders
} from "@/hooks/purchaseOrder_hooks/usePurchaseOrders";

interface Props {

    open: boolean;

    onOpenChange: (
        value: boolean
    ) => void;

    grn: any;

    loading?: boolean;

    onSubmit: (
        data: any
    ) => void;

}

function EditGRNDialog({

    open,

    onOpenChange,

    grn,

    loading,

    onSubmit

}: Props) {

    const {

        data

    } = usePurchaseOrders();

    const purchaseOrders =
        data?.data || [];

    const [

        form,

        setForm

    ] = useState({

        purchaseOrderId: "",

        quantityReceived: 1,

        remarks: "",

        status: "PENDING"

    });

    useEffect(() => {

        if (!grn) return;

        setForm({

            purchaseOrderId:

                grn.purchaseOrderId,

            quantityReceived:

                grn.quantityReceived,

            remarks:

                grn.remarks || "",

            status:

                grn.status

        });

    }, [

        grn

    ]);

    const handleSubmit = () => {

        if (!form.purchaseOrderId) {

            toast.error(

                "Select Purchase Order"

            );

            return;

        }

        if (form.quantityReceived <= 0) {

            toast.error(

                "Quantity must be greater than 0"

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

                        Edit Goods Receipt Note

                    </DialogTitle>

                </DialogHeader>

                <div className="space-y-5">

                    <div className="space-y-2">

                        <Label>

                            Purchase Order

                        </Label>

                        <Select

                            value={form.purchaseOrderId}

                            onValueChange={(value) =>

                                setForm({

                                    ...form,

                                    purchaseOrderId: value

                                })

                            }

                        >

                            <SelectTrigger>

                                <SelectValue />

                            </SelectTrigger>

                            <SelectContent>

                                {

                                    purchaseOrders.map(

                                        (

                                            order: any

                                        ) => (

                                            <SelectItem

                                                key={order.id}

                                                value={order.id}

                                            >

                                                {order.orderNumber}

                                            </SelectItem>

                                        )

                                    )

                                }

                            </SelectContent>

                        </Select>

                    </div>

                    <div className="space-y-2">

                        <Label>

                            Quantity Received

                        </Label>

                        <Input

                            type="number"

                            min={1}

                            value={form.quantityReceived}

                            onChange={(e) =>

                                setForm({

                                    ...form,

                                    quantityReceived:

                                        Number(

                                            e.target.value

                                        )

                                })

                            }

                        />

                    </div>

                    <div className="space-y-2">

                        <Label>

                            Remarks

                        </Label>

                        <Textarea

                            value={form.remarks}

                            onChange={(e) =>

                                setForm({

                                    ...form,

                                    remarks:

                                        e.target.value

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

                                <SelectItem value="RECEIVED">

                                    Received

                                </SelectItem>

                                <SelectItem value="REJECTED">

                                    Rejected

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

                                "Update GRN"

                        }

                    </Button>

                </div>

            </DialogContent>

        </Dialog>

    );

}

export default EditGRNDialog;