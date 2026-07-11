import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";

import { quotationSchema } from "@/schemas/quotation.schema";

import type { Customer } from "@/types/customer.types";

import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
} from "@/components/ui/dialog";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

import { Controller } from "react-hook-form";

import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

type QuotationFormData = z.input<typeof quotationSchema>;
type QuotationFormOutput = z.output<typeof quotationSchema>;

interface Props {
    open: boolean;
    onOpenChange: (value: boolean) => void;

    customers: Customer[];

    loading: boolean;

    onSubmit: (
        data: QuotationFormOutput
    ) => void;
}

function CreateQuotationDialog({
    open,
    onOpenChange,
    customers,
    loading,
    onSubmit,
}: Props) {

    const {
        control,
        register,
        handleSubmit,
        reset,
    } = useForm<
        QuotationFormData,
        unknown,
        QuotationFormOutput
    >({
        resolver: zodResolver(quotationSchema),
        defaultValues: {
            customerId: "",
            amount: 0,
            validUntil: "",
        },
    });

    function handleFormSubmit(
        data: QuotationFormOutput
    ) {
        onSubmit(data);
        reset();
    }

    return (
        <Dialog
            open={open}
            onOpenChange={onOpenChange}
        >
            <DialogContent className="max-w-lg">
                <DialogHeader>
                    <DialogTitle>
                        Create Quotation
                    </DialogTitle>
                </DialogHeader>

                <form
                    onSubmit={handleSubmit(handleFormSubmit)}
                    className="space-y-5"
                >
                    <div className="space-y-2">
                        <Label>Customer</Label>
                        <Controller
                            control={control}
                            name="customerId"
                            render={({ field }) => (
                                <Select
                                    value={field.value}
                                    onValueChange={field.onChange}
                                >
                                    <SelectTrigger className="w-full">
                                        <SelectValue placeholder="Select Customer" />
                                    </SelectTrigger>

                                    <SelectContent>
                                        {customers.map(customer => (
                                            <SelectItem
                                                key={customer.id}
                                                value={customer.id}
                                            >
                                                {customer.name}
                                            </SelectItem>
                                        ))}
                                    </SelectContent>
                                </Select>
                            )}
                        />
                    </div>
                    <div className="space-y-2">
                        <Label>Amount</Label>
                        <Input
                            type="number"
                            placeholder="50000"
                            {...register("amount", {
                                valueAsNumber: true,
                            })}
                        />
                    </div>
                    <div className="space-y-2">
                        <Label>Valid Until</Label>
                        <Input
                            type="date"
                            {...register("validUntil")}
                        />
                    </div>
                    <Button
                        type="submit"
                        className="w-full"
                        disabled={loading}
                    >
                        {loading
                            ? "Creating..."
                            : "Create Quotation"}
                    </Button>
                </form>
            </DialogContent>
        </Dialog>
    );
}

export default CreateQuotationDialog;