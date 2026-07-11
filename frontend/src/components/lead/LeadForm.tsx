import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
    leadSchema,
    type LeadFormData
} from "@/schemas/lead.schema";
import {
    LeadStatus
} from "@/types/lead.types";
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
    onSubmit: (data: LeadFormData) => void;
    loading?: boolean;
    defaultValues?: Partial<LeadFormData>;
}

function LeadForm({
    onSubmit,
    loading,
    defaultValues
}: Props) {
    const { data } = useCustomers();
    const customers = data?.data || [];
    const { register,handleSubmit,setValue } = useForm<LeadFormData>({resolver: zodResolver(leadSchema) as any,defaultValues});
    return (
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            <Input placeholder="Lead Title" { ...register("title") }/>
            <Select onValueChange={(value) => { setValue("customerId",value); }} >
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
            <Select onValueChange={(value) => { setValue("status",value as LeadStatus); }}>
                <SelectTrigger>
                    <SelectValue placeholder="Status"/>
                </SelectTrigger>
                <SelectContent>
                    <SelectItem value="NEW"> NEW </SelectItem>
                    <SelectItem value="CONTACTED"> CONTACTED </SelectItem>
                    <SelectItem value="QUALIFIED"> QUALIFIED </SelectItem>
                    <SelectItem value="LOST"> LOST </SelectItem>
                    <SelectItem value="WON"> WON </SelectItem>
                </SelectContent>
            </Select>
            <Button className="w-full" disabled={loading}>
                { loading?"Saving...":"Save" }
            </Button>
        </form>
    );
}

export default LeadForm;