import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
    opportunitySchema,
    type OpportunityFormData
} from "@/schemas/opportunity.schema";
import { OpportunityStatus } from "@/types/opportunity.types";
import { useCustomers } from "@/hooks/customer_hooks/useCustomers";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue
} from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

interface Props {
    onSubmit: (data: OpportunityFormData) => void;
    loading?: boolean;
    defaultValues?: Partial<OpportunityFormData>;
}

function OpportunityForm({
    onSubmit,
    loading,
    defaultValues
}: Props) {
    const { data } = useCustomers();
    const customers = data?.data || [];
    const {
        register,
        handleSubmit,
        setValue
    } = useForm<OpportunityFormData>({resolver: zodResolver(opportunitySchema) as any,defaultValues});
    return (
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            <Input placeholder="Title" { ...register("title") }/>
            <Input type="number" step="0.01" placeholder="Value" {...register("value",{valueAsNumber: true})}/>
            <Select onValueChange={(value) => { setValue("customerId",value); }}>
                <SelectTrigger>
                    <SelectValue placeholder="Customer"/>
                </SelectTrigger>
                <SelectContent>
                    {
                        customers.map((customer: any) => (
                                <SelectItem key={customer.id} value={customer.id}>
                                    {customer.name}
                                </SelectItem>
                            )
                        )
                    }
                </SelectContent>
            </Select>
            <Select onValueChange={(value) => {setValue("status",value as OpportunityStatus); }}>
                <SelectTrigger>
                    <SelectValue placeholder="Status"/>
                </SelectTrigger>
                <SelectContent>
                    <SelectItem value="OPEN"> OPEN </SelectItem>
                    <SelectItem value="WON"> WON </SelectItem>
                    <SelectItem value="LOST"> LOST </SelectItem>
                </SelectContent>
            </Select>
            <Button className="w-full" disabled={loading}>
                { loading?"Saving...":"Save" }
            </Button>
        </form>
    );
}

export default OpportunityForm;