import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
transactionSchema,
type TransactionFormData
} from "@/schemas/transaction.schema";
import { TransactionType } from "@/types/transaction.types";
import { useAccounts } from "@/hooks/account_hooks/useAccounts";
import type { Account } from "@/types/account.types";
import {
Select,
SelectContent,
SelectItem,
SelectTrigger,
SelectValue
} from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

interface Props{
    onSubmit:(data:TransactionFormData)=>void;
    loading?:boolean;
    defaultValues?:Partial<TransactionFormData>;
}

function TransactionForm({ onSubmit,loading,defaultValues }:Props){
    const {data} = useAccounts();
    const accounts:Account[] = data || [];
    const { register,handleSubmit,setValue }=useForm<TransactionFormData>({ resolver:zodResolver(transactionSchema), defaultValues });
    return(
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        <Input placeholder="Description" { ...register("description") }/>
        <Input type="number" step="0.01" placeholder="Amount" { ...register("amount", { valueAsNumber:true }) }/>
        <Select onValueChange={(value:string) => setValue("accountId",value) }>
            <SelectTrigger>
                <SelectValue placeholder="Account"/>
            </SelectTrigger>
            <SelectContent>
                { accounts.map((account)=>(<SelectItem key={account.id} value={account.id}> {account.name} </SelectItem>)) }
            </SelectContent>
        </Select>
        <Select onValueChange={ (value:TransactionType) => setValue("type",value) }>
            <SelectTrigger>
                <SelectValue placeholder="Type"/>
            </SelectTrigger>
            <SelectContent>
                <SelectItem value="CREDIT"> Credit </SelectItem>
                <SelectItem value="DEBIT"> Debit </SelectItem>
            </SelectContent>
        </Select>
        <Button className="w-full" disabled={loading}> {loading?"Saving...":"Save"} </Button>
        </form>
    );
}

export default TransactionForm;