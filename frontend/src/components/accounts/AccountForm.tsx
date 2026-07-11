import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { accountSchema, type AccountFormData, type AccountFormInput } from "@/schemas/account.schema";
import type { AccountType } from "@/types/account.types";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

interface Props{
    onSubmit:(data:AccountFormData)=>void;
    loading?:boolean;
    defaultValues?:Partial<AccountFormData>;
}

function AccountForm({ onSubmit,loading,defaultValues }:Props){
    const form = useForm<AccountFormInput, any, AccountFormData>({resolver: zodResolver(accountSchema),defaultValues});
    const { register,handleSubmit,setValue }=form;
    return(
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        <Input placeholder="Account Name" {...register("name")}/>
        <Input placeholder="Code" {...register("code")}/>
        <Select onValueChange={ (value:AccountType) => setValue("type",value) }>
        <SelectTrigger>
        <SelectValue placeholder="Type" />
        </SelectTrigger>
        <SelectContent>
            <SelectItem value="ASSET"> Asset </SelectItem>
            <SelectItem value="LIABILITY"> Liability </SelectItem>
            <SelectItem value="EQUITY"> Equity </SelectItem>
            <SelectItem value="REVENUE"> Revenue </SelectItem>
            <SelectItem value="EXPENSE"> Expense </SelectItem>
        </SelectContent>
        </Select>
        <Input type="number" step="0.01" placeholder="Opening Balance" {...register("balance")}/>
        <Button className="w-full" disabled={loading}> {loading?"Saving...":"Save"} </Button>
        </form>
    );
}

export default AccountForm;