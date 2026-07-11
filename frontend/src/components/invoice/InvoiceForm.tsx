import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
    invoiceSchema,
    type InvoiceFormData
} from "@/schemas/invoice.schema";
import {
    InvoiceStatus
} from "@/types/invoice.types";
import { useSalesOrders } from "@/hooks/salesOrder_hooks/useSalesOrders";
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
    onSubmit: (data: InvoiceFormData) => void;
    loading?: boolean;
    defaultValues?: Partial<InvoiceFormData>;
}

function InvoiceForm({
    onSubmit,
    loading,
    defaultValues
}: Props) {
    const { data } = useSalesOrders();
    const salesOrders = data?.data || [];
    const {
        register,
        handleSubmit,
        setValue
    } = useForm<InvoiceFormData>({ resolver: zodResolver(invoiceSchema) as any,defaultValues });
    return (
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            <Input placeholder="Invoice Number" { ...register("invoiceNumber") }/>
            <Input type="number" step="0.01" placeholder="Amount" { ...register("amount",{valueAsNumber: true}) } />
            <Input type="date" { ...register("dueDate") }/>
            <Select onValueChange={(value) => { setValue("salesOrderId",value); }}>
                <SelectTrigger>
                    <SelectValue placeholder="Sales Order"/>
                </SelectTrigger>
                <SelectContent>
                    { salesOrders.map((order: any) => ( <SelectItem key={order.id} value={order.id}> {order.orderNumber} </SelectItem> )) }
                </SelectContent>
            </Select>
            <Select onValueChange={(value) => { setValue("status",value as InvoiceStatus); }}>
                <SelectTrigger>
                    <SelectValue placeholder="Status"/>
                </SelectTrigger>
                <SelectContent>
                    <SelectItem value="DRAFT"> Draft </SelectItem>
                    <SelectItem value="SENT"> Sent </SelectItem>
                    <SelectItem value="PAID"> Paid </SelectItem>
                    <SelectItem value="OVERDUE"> Overdue </SelectItem>
                </SelectContent>
            </Select>
            <Button className="w-full" disabled={loading}> { loading?"Saving...":"Save" } </Button>
        </form>
    );
}

export default InvoiceForm;