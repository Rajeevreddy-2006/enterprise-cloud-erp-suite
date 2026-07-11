import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
    quotationSchema,
    type QuotationFormData
} from "@/schemas/quotation.schema";
import { QuotationStatus } from "@/types/quotation.types";
import { useCustomers } from "@/hooks/customer_hooks/useCustomers";
import { useOpportunities } from "@/hooks/opportunity_hooks/useOpportunities";
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
    onSubmit:(data:QuotationFormData)=>void;
    loading?:boolean;
    defaultValues?:Partial<QuotationFormData>;
}

function QuotationForm({
    onSubmit,
    loading,
    defaultValues
}:Props){
    const customers = useCustomers().data?.data || [];
    const opportunities = useOpportunities().data?.data || [];
    const {
        register,
        handleSubmit,
        setValue
    } = useForm<QuotationFormData>({resolver: zodResolver(quotationSchema) as any,defaultValues});
    return(
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            <Input placeholder="Quotation Number" { ...register("quotationNumber") }/>
            <Input type="number" step="0.01" placeholder="Amount" { ...register("amount",{valueAsNumber:true}) }/>
            <Input type="date" { ...register("validUntil") }/>
            <Select onValueChange={value => setValue("customerId",value)}>
                <SelectTrigger>
                    <SelectValue placeholder="Customer"/>
                </SelectTrigger>
                <SelectContent>
                    {
                        customers.map(
                            (customer:any)=>(
                                <SelectItem key={customer.id} value={customer.id}>
                                    { customer.name }
                                </SelectItem>
                            )
                        )
                    }
                </SelectContent>
            </Select>
            <Select onValueChange={value => setValue("opportunityId",value)}>
                <SelectTrigger>
                    <SelectValue placeholder="Opportunity"/>
                </SelectTrigger>
                <SelectContent>
                    {
                        opportunities.map(
                            (opportunity:any)=>(
                                <SelectItem key={opportunity.id} value={opportunity.id}> {opportunity.title} </SelectItem>
                            )
                        )
                    }
                </SelectContent>
            </Select>
            <Select onValueChange={value => setValue("status",value as QuotationStatus)}>
                <SelectTrigger>
                    <SelectValue placeholder="Status"/>
                </SelectTrigger>
                <SelectContent>
                    <SelectItem value="DRAFT">
                        DRAFT
                    </SelectItem>
                    <SelectItem value="SENT">
                        SENT
                    </SelectItem>
                    <SelectItem value="ACCEPTED">
                        ACCEPTED
                    </SelectItem>
                    <SelectItem value="REJECTED">
                        REJECTED
                    </SelectItem>
                    <SelectItem value="EXPIRED">
                        EXPIRED
                    </SelectItem>
                </SelectContent>
            </Select>
            <Button className="w-full" disabled={loading}>
                { loading?"Saving...":"Save" }
            </Button>
        </form>
    );
}

export default QuotationForm;