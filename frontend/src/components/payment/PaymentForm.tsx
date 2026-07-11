import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
    paymentSchema,
    type PaymentFormData
} from "@/schemas/payment.schema";
import { PaymentStatus } from "@/types/payment.types";
import { useInvoices } from "@/hooks/invoice_hooks/useInvoices";
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
    onSubmit: (data: PaymentFormData) => void;
    loading?: boolean;
    defaultValues?: Partial<PaymentFormData>;
}

function PaymentForm({
    onSubmit,
    loading,
    defaultValues
}: Props) {
    const { data } = useInvoices();
    const invoices = data?.data || [];
    const { register,handleSubmit,setValue } = useForm<PaymentFormData>({ resolver: zodResolver(paymentSchema) as any,defaultValues });
    return (
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            <Input placeholder="Payment Number" { ...register("paymentNumber") }/>
            <Input type="number" step="0.01" placeholder="Amount" { ...register("amount",{ valueAsNumber: true }) }/>
            <Input type="date" { ...register("paymentDate") }/>
            <Select
                onValueChange={(value) => { setValue("invoiceId",value); }}>
                <SelectTrigger> <SelectValue placeholder="Invoice"/> </SelectTrigger>
                <SelectContent>
                    { invoices.map((invoice: any) => ( <SelectItem key={invoice.id} value={invoice.id}> {invoice.invoiceNumber} </SelectItem> )) }
                </SelectContent>
            </Select>
            <Select onValueChange={(value) => { setValue("status",value as PaymentStatus); }}>
                <SelectTrigger>
                    <SelectValue placeholder="Status"/>
                </SelectTrigger>
                <SelectContent>
                    <SelectItem value="PENDING"> Pending </SelectItem>
                    <SelectItem value="COMPLETED"> Completed </SelectItem>
                    <SelectItem value="FAILED"> Failed </SelectItem>
                </SelectContent>
            </Select>
            <Button className="w-full" disabled={loading}>
                {
                    loading?
                        "Saving..."
                        :
                        "Save"
                }
            </Button>
        </form>
    );
}

export default PaymentForm;