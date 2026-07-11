import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
    interactionSchema,
    type InteractionFormData
} from "@/schemas/interaction.schema";
import { InteractionType } from "@/types/interaction.types";
import { useCustomers } from "@/hooks/customer_hooks/useCustomers";
import { useLeads } from "@/hooks/lead_hooks/useLeads";
import { useOpportunities } from "@/hooks/opportunity_hooks/useOpportunities";
import { useEmployees } from "@/hooks/employee_hooks/useEmployees";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue
} from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";

interface Props {
    onSubmit: (data: InteractionFormData) => void;
    loading?: boolean;
    defaultValues?: Partial<InteractionFormData>;
}

function InteractionForm({
    onSubmit,
    loading,
    defaultValues
}: Props) {
    const customers = useCustomers().data?.data || [];
    const leads = useLeads().data?.data || [];
    const opportunities = useOpportunities().data?.data || [];
    const employees = useEmployees().data?.data || [];
    const {
        register,
        handleSubmit,
        setValue
    } = useForm<InteractionFormData>({resolver: zodResolver(interactionSchema) as any,defaultValues});
    return (
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            <Input placeholder="Subject" { ...register("subject") }/>
            <Textarea placeholder="Notes" { ...register("notes") }/>
            <Input type="datetime-local" {...register("interactionDate")}/>
            <Select
                onValueChange={(value) => { setValue("customerId",value); }}>
                <SelectTrigger>
                    <SelectValue placeholder="Customer" />
                </SelectTrigger>
                <SelectContent>
                    { customers.map((customer: any) => (<SelectItem key={customer.id} value={customer.id}> {customer.name} </SelectItem>)) }
                </SelectContent>
            </Select>
            <Select onValueChange={(value) => { setValue("leadId",value); }}>
                <SelectTrigger>
                    <SelectValue placeholder="Lead" />
                </SelectTrigger>
                <SelectContent>
                    { leads.map((lead: any) => (<SelectItem key={lead.id} value={lead.id}> {lead.title} </SelectItem>)) }
                </SelectContent>
            </Select>
            <Select onValueChange={(value) => { setValue("opportunityId",value); }}>
                <SelectTrigger>
                    <SelectValue placeholder="Opportunity" />
                </SelectTrigger>
                <SelectContent>
                    {
                        opportunities.map((opportunity: any) => (
                                <SelectItem key={opportunity.id} value={opportunity.id}>
                                    {opportunity.title}
                                </SelectItem>
                        ))
                    }
                </SelectContent>
            </Select>
            <Select onValueChange={(value) => {setValue("employeeId",value);}}>
                <SelectTrigger>
                    <SelectValue placeholder="Employee" />
                </SelectTrigger>
                <SelectContent>
                    {
                        employees.map((employee: any) => (
                                <SelectItem key={employee.id} value={employee.id}>
                                    {employee.firstName}
                                    {" "}
                                    {employee.lastName}
                                </SelectItem>
                            )
                        )
                    }
                </SelectContent>
            </Select>
            <Select onValueChange={(value) => {setValue("interactionType",value as InteractionType);}}>
                <SelectTrigger>
                    <SelectValue placeholder="Type" />
                </SelectTrigger>
                <SelectContent>
                    <SelectItem value="CALL">
                        CALL
                    </SelectItem>
                    <SelectItem value="EMAIL">
                        EMAIL
                    </SelectItem>
                    <SelectItem value="MEETING">
                        MEETING
                    </SelectItem>
                    <SelectItem value="FOLLOW_UP">
                        FOLLOW UP
                    </SelectItem>
                    <SelectItem value="NOTE">
                        NOTE
                    </SelectItem>
                </SelectContent>
            </Select>
            <Button className="w-full" disabled={loading}> { loading?"Saving...":"Save" } </Button>
        </form>
    );
}

export default InteractionForm;