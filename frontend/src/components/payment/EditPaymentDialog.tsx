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
    useInvoices
} from "@/hooks/invoice_hooks/useInvoices";

interface Props {

    open: boolean;

    onOpenChange: (
        value: boolean
    ) => void;

    payment: any;

    loading?: boolean;

    onSubmit: (
        data: any
    ) => void;

}

function EditPaymentDialog({

    open,

    onOpenChange,

    payment,

    loading,

    onSubmit

}: Props) {

    const {

        data

    } = useInvoices();

    const invoices =
        data?.data || [];

    const [

        form,

        setForm

    ] = useState({

        invoiceId: "",

        amount: 0,

        paymentDate: ""

    });

    useEffect(() => {

        if (!payment) return;

        setForm({

            invoiceId:

                payment.invoiceId,

            amount:

                Number(payment.amount),

            paymentDate:

                payment.paymentDate?.split("T")[0]

        });

    }, [

        payment

    ]);

    useEffect(() => {

        const invoice =
            invoices.find(

                (i: any) =>

                    i.id === form.invoiceId

            );

        if (!invoice) return;

        setForm(prev => ({

            ...prev,

            amount:

                Number(

                    invoice.amount

                )

        }));

    }, [

        form.invoiceId,

        invoices

    ]);

    const selectedInvoice =
        invoices.find(

            (i: any) =>

                i.id === form.invoiceId

        );

    return (

        <Dialog

            open={open}

            onOpenChange={onOpenChange}

        >

            <DialogContent className="sm:max-w-lg">

                <DialogHeader>

                    <DialogTitle>

                        Edit Payment

                    </DialogTitle>

                </DialogHeader>

                <div className="space-y-5">

                    <div className="space-y-2">

                        <Label>

                            Invoice

                        </Label>

                        <Select

                            value={form.invoiceId}

                            onValueChange={(value) =>

                                setForm({

                                    ...form,

                                    invoiceId: value

                                })

                            }

                        >

                            <SelectTrigger>

                                <SelectValue />

                            </SelectTrigger>

                            <SelectContent>

                                {

                                    invoices.map(

                                        (

                                            invoice: any

                                        ) => (

                                            <SelectItem

                                                key={invoice.id}

                                                value={invoice.id}

                                            >

                                                {

                                                    invoice.invoiceNumber

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

                            readOnly

                            value={

                                selectedInvoice?.salesOrder?.customer?.name ||

                                ""

                            }

                        />

                    </div>

                    <div className="space-y-2">

                        <Label>

                            Amount

                        </Label>

                        <Input

                            readOnly

                            value={

                                `₹ ${form.amount.toLocaleString("en-IN")}`

                            }

                        />

                    </div>

                    <div className="space-y-2">

                        <Label>

                            Payment Date

                        </Label>

                        <Input

                            type="date"

                            value={form.paymentDate}

                            onChange={(e) =>

                                setForm({

                                    ...form,

                                    paymentDate:

                                        e.target.value

                                })

                            }

                        />

                    </div>

                    <div className="space-y-2">

                        <Label>

                            Current Status

                        </Label>

                        <Input

                            readOnly

                            value={

                                payment?.status ||

                                ""

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

                                "Updating..."

                                :

                                "Update Payment"

                        }

                    </Button>

                </div>

            </DialogContent>

        </Dialog>

    );

}

export default EditPaymentDialog;