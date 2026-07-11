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
    toast
} from "sonner";

import {
    useAccounts
} from "@/hooks/account_hooks/useAccounts";

import {
    useTransactions
} from "@/hooks/transaction_hooks/useTransactions";

interface Props {

    open: boolean;

    onOpenChange: (
        value: boolean
    ) => void;

    journalEntry: any;

    loading?: boolean;

    onSubmit: (
        data: any
    ) => void;

}

function EditJournalEntryDialog({

    open,

    onOpenChange,

    journalEntry,

    loading,

    onSubmit

}: Props) {

    const {

        data: accountData

    } = useAccounts();

    const {

        data: transactionData

    } = useTransactions();

    const accounts =
        accountData?.data || [];

    const transactions =
        transactionData?.data || [];

    const [

        form,

        setForm

    ] = useState({

        amount: 0,

        debitAccountId: "",

        creditAccountId: "",

        transactionId: ""

    });

    useEffect(() => {

        if (!journalEntry) return;

        setForm({

            amount: Number(

                journalEntry.amount

            ),

            debitAccountId:

                journalEntry.debitAccountId,

            creditAccountId:

                journalEntry.creditAccountId,

            transactionId:

                journalEntry.transactionId

        });

    }, [

        journalEntry

    ]);

    const handleSubmit = () => {

        if (form.amount <= 0) {

            toast.error(

                "Amount must be greater than 0"

            );

            return;

        }

        if (!form.debitAccountId) {

            toast.error(

                "Select Debit Account"

            );

            return;

        }

        if (!form.creditAccountId) {

            toast.error(

                "Select Credit Account"

            );

            return;

        }

        if (

            form.debitAccountId ===

            form.creditAccountId

        ) {

            toast.error(

                "Debit and Credit accounts cannot be the same"

            );

            return;

        }

        if (!form.transactionId) {

            toast.error(

                "Select Transaction"

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

                        Edit Journal Entry

                    </DialogTitle>

                </DialogHeader>

                <div className="space-y-5">

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

                    <div className="space-y-2">

                        <Label>

                            Debit Account

                        </Label>

                        <Select

                            value={form.debitAccountId}

                            onValueChange={(value) =>

                                setForm({

                                    ...form,

                                    debitAccountId: value

                                })

                            }

                        >

                            <SelectTrigger>

                                <SelectValue />

                            </SelectTrigger>

                            <SelectContent>

                                {

                                    accounts.map(

                                        (account: any) => (

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

                            Credit Account

                        </Label>

                        <Select

                            value={form.creditAccountId}

                            onValueChange={(value) =>

                                setForm({

                                    ...form,

                                    creditAccountId: value

                                })

                            }

                        >

                            <SelectTrigger>

                                <SelectValue />

                            </SelectTrigger>

                            <SelectContent>

                                {

                                    accounts.map(

                                        (account: any) => (

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

                            Transaction

                        </Label>

                        <Select

                            value={form.transactionId}

                            onValueChange={(value) =>

                                setForm({

                                    ...form,

                                    transactionId: value

                                })

                            }

                        >

                            <SelectTrigger>

                                <SelectValue />

                            </SelectTrigger>

                            <SelectContent>

                                {

                                    transactions.map(

                                        (transaction: any) => (

                                            <SelectItem

                                                key={transaction.id}

                                                value={transaction.id}

                                            >

                                                {

                                                    transaction.description

                                                }

                                            </SelectItem>

                                        )

                                    )

                                }

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

                                "Update Journal Entry"

                        }

                    </Button>

                </div>

            </DialogContent>

        </Dialog>

    );

}

export default EditJournalEntryDialog;