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
    useAccounts
} from "@/hooks/account_hooks/useAccounts";

interface Props {

    open: boolean;

    onOpenChange: (
        value: boolean
    ) => void;

    transaction: any;

    loading?: boolean;

    onSubmit: (
        data: any
    ) => void;

}

function EditTransactionDialog({

    open,

    onOpenChange,

    transaction,

    loading,

    onSubmit

}: Props) {

    const {

        data

    } = useAccounts();

    const accounts =
        data?.data || [];

    const [

        form,

        setForm

    ] = useState({

        description: "",

        accountId: "",

        type: "DEBIT",

        amount: 0

    });

    useEffect(() => {

        if (!transaction) return;

        setForm({

            description:

                transaction.description,

            accountId:

                transaction.accountId,

            type:

                transaction.type,

            amount:

                Number(

                    transaction.amount

                )

        });

    }, [

        transaction

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

                        Edit Transaction

                    </DialogTitle>

                </DialogHeader>

                <div className="space-y-5">

                    <div className="space-y-2">

                        <Label>

                            Description

                        </Label>

                        <Input

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

                            Account

                        </Label>

                        <Select

                            value={form.accountId}

                            onValueChange={(value) =>

                                setForm({

                                    ...form,

                                    accountId: value

                                })

                            }

                        >

                            <SelectTrigger>

                                <SelectValue />

                            </SelectTrigger>

                            <SelectContent>

                                {

                                    accounts.map(

                                        (

                                            account: any

                                        ) => (

                                            <SelectItem

                                                key={account.id}

                                                value={account.id}

                                            >

                                                {

                                                    account.code

                                                }

                                                {" - "}

                                                {

                                                    account.name

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

                            Transaction Type

                        </Label>

                        <Select

                            value={form.type}

                            onValueChange={(value) =>

                                setForm({

                                    ...form,

                                    type: value

                                })

                            }

                        >

                            <SelectTrigger>

                                <SelectValue />

                            </SelectTrigger>

                            <SelectContent>

                                <SelectItem

                                    value="DEBIT"

                                >

                                    Debit

                                </SelectItem>

                                <SelectItem

                                    value="CREDIT"

                                >

                                    Credit

                                </SelectItem>

                            </SelectContent>

                        </Select>

                    </div>

                    <div className="space-y-2">

                        <Label>

                            Amount

                        </Label>

                        <Input

                            type="number"

                            min={0}

                            value={form.amount}

                            onChange={(e) =>

                                setForm({

                                    ...form,

                                    amount: Number(

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

                                "Update Transaction"

                        }

                    </Button>

                </div>

            </DialogContent>

        </Dialog>

    );

}

export default EditTransactionDialog;