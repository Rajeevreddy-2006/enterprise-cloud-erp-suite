import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";

import { quotationSchema } from "@/schemas/quotation.schema";

import type { Customer } from "@/types/customer.types";
import type { Quotation } from "@/types/quotation.types";

import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
} from "@/components/ui/dialog";

import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

type QuotationFormData = z.input<typeof quotationSchema>;
type QuotationFormOutput = z.output<typeof quotationSchema>;

interface Props {
    open: boolean;
    onOpenChange: (value: boolean) => void;

    quotation: Quotation | null;

    customers: Customer[];

    loading: boolean;

    onSubmit: (
        id: string,
        data: QuotationFormOutput
    ) => void;
}

function EditQuotationDialog({
    open,
    onOpenChange,
    quotation,
    customers,
    loading,
    onSubmit,
}: Props) {

    const {
        register,
        handleSubmit,
        reset,
    } = useForm<
        QuotationFormData,
        unknown,
        QuotationFormOutput
    >({
        resolver: zodResolver(quotationSchema),
    });

    useEffect(() => {

        if (!quotation) return;

        reset({
            customerId: quotation.customerId,
            amount: Number(quotation.amount),
            validUntil: quotation.validUntil.slice(0, 10),
        });

    }, [quotation, reset]);

    function handleFormSubmit(
        data: QuotationFormOutput
    ) {

        if (!quotation) return;

        onSubmit(
            quotation.id,
            data
        );

    }

    return (
        <Dialog
            open={open}
            onOpenChange={onOpenChange}
        >
            <DialogContent className="max-w-lg">

                <DialogHeader>

                    <DialogTitle>
                        Edit Quotation
                    </DialogTitle>

                </DialogHeader>

                <form
                    onSubmit={handleSubmit(handleFormSubmit)}
                    className="space-y-5"
                >

                    <div className="space-y-2">

                        <Label>
                            Customer
                        </Label>

                        <select
                            {...register("customerId")}
                            className="w-full rounded-md border bg-background px-3 py-2"
                        >

                            {
                                customers.map(customer => (

                                    <option
                                        key={customer.id}
                                        value={customer.id}
                                    >
                                        {customer.name}
                                    </option>

                                ))
                            }

                        </select>

                    </div>

                    <div className="space-y-2">

                        <Label>
                            Amount
                        </Label>

                        <Input
                            type="number"
                            {...register("amount", {
                                valueAsNumber: true,
                            })}
                        />

                    </div>

                    <div className="space-y-2">

                        <Label>
                            Valid Until
                        </Label>

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
                        {
                            loading
                                ? "Updating..."
                                : "Update Quotation"
                        }
                    </Button>

                </form>

            </DialogContent>

        </Dialog>
    );
}

export default EditQuotationDialog;