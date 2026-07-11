import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
    journalSchema,
    type JournalFormData
} from "@/schemas/journal.schema";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue
} from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useAccounts } from "@/hooks/account_hooks/useAccounts";
import { useTransactions } from "@/hooks/transaction_hooks/useTransactions";
import type { Account } from "@/types/account.types";
import type { Transaction } from "@/types/transaction.types";

interface Props {
    onSubmit: ( data: JournalFormData ) => void;
    loading?: boolean;
    defaultValues?: Partial<JournalFormData>;
}

function JournalForm({ onSubmit,loading,defaultValues }: Props) {
    const { data: accountsData } = useAccounts();
    const { data: transactionsData } = useTransactions();
    const accounts: Account[] = accountsData || [];
    const transactions: Transaction[] = transactionsData || [];
    const { register,handleSubmit,setValue } = useForm<JournalFormData>({resolver:zodResolver(journalSchema), defaultValues});
    return (
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            <Input type="number" step="0.01" placeholder="Amount" { ...register("amount",{valueAsNumber: true}) }/>
            <Select onValueChange={(value) => setValue("debitAccountId",value)}>
                <SelectTrigger>
                    <SelectValue placeholder="Debit Account"/>
                </SelectTrigger>
                <SelectContent>
                    {
                        accounts.map(account => (
                            <SelectItem key={account.id} value={account.id}>
                                { account.name }
                            </SelectItem>
                        ))
                    }
                </SelectContent>
            </Select>
            <Select onValueChange={(value) => setValue("creditAccountId",value)}>
                <SelectTrigger>
                    <SelectValue placeholder="Credit Account"/>
                </SelectTrigger>
                <SelectContent>
                    {
                        accounts.map(account => (
                                <SelectItem key={account.id} value={account.id}>
                                    { account.name }
                                </SelectItem>
                            )
                        )
                    }
                </SelectContent>
            </Select>
            <Select
                onValueChange={(value) =>
                    setValue("transactionId",value)
                }>
                <SelectTrigger>
                    <SelectValue placeholder="Transaction"/>
                </SelectTrigger>
                <SelectContent>
                    {
                        transactions.map(transaction => (
                            <SelectItem key={transaction.id} value={transaction.id}> { transaction.description } </SelectItem>
                        ))
                    }
                </SelectContent>
            </Select>
            <Button className="w-full" disabled={loading}> {loading?"Saving...":"Save"} </Button>
        </form>
    );
}

export default JournalForm;