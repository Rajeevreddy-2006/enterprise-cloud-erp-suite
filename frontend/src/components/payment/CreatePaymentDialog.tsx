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

    loading?: boolean;

    onSubmit: (
        data: any
    ) => void;

}

function CreatePaymentDialog({

    open,

    onOpenChange,

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

                        Create Payment

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

                                <SelectValue

                                    placeholder="Select Invoice"

                                />

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

                            Invoice Amount

                        </Label>

                        <Input

                            readOnly

                            value={

                                form.amount

                                    ?

                                    `₹ ${form.amount.toLocaleString("en-IN")}`

                                    :

                                    ""

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

                                "Create Payment"

                        }

                    </Button>

                </div>

            </DialogContent>

        </Dialog>

    );

}

export default CreatePaymentDialog;