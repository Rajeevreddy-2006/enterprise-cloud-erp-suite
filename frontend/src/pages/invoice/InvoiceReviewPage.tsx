import { useNavigate, useParams } from "react-router-dom";

import { toast } from "sonner";

import { Button } from "@/components/ui/button";

import { useReviewInvoice } from "@/hooks/invoice_hooks/useReviewInvoice";
import { usePayInvoice } from "@/hooks/invoice_hooks/usePayInvoice";
import {
    useFailInvoice,
} from "@/hooks/invoice_hooks/useFailInvoice";

function InvoiceReviewPage() {
    const { token = "" } = useParams();
    const navigate = useNavigate();
    const {
        data: invoice,
        isLoading,
        isError,
    } = useReviewInvoice(token);
    const {
        mutate: payInvoice,
        isPending: paying,
    } = usePayInvoice();
    const {
        mutate: failInvoice,
        isPending: failing,
    } = useFailInvoice();
    function handlePay() {
        payInvoice(
            token,
            {
                onSuccess() {
                    toast.success(
                        "Payment completed successfully."
                    );
                    navigate(
                        "/invoice/payment/success"
                    );

                },
                onError(error: any) {
                    toast.error(
                        error?.response?.data?.message ??
                        "Payment failed."
                    );
                    navigate(
                        "/invoice/payment/failed"
                    );
                },
            }
        );
    }
    function handleFail() {
        failInvoice(
            token,
            {
                onSuccess() {
                    toast.success(
                        "Payment cancelled."
                    );
                    navigate(
                        "/invoice/payment/failed"
                    );
                },
                onError(error: any) {
                    toast.error(
                        error?.response?.data?.message ??
                        "Unable to cancel payment."
                    );
                },
            }
        );
    }
    if (isLoading) {
        return (
            <div className="flex min-h-screen items-center justify-center">
                Loading invoice...
            </div>
        );
    }
    if (isError || !invoice) {
        return (
            <div className="flex min-h-screen items-center justify-center">
                Invalid or expired invoice.
            </div>
        );
    }
    return (
        <div className="min-h-screen bg-slate-950 flex items-center justify-center p-6">
            <div className="w-full max-w-2xl rounded-xl border bg-slate-900 p-8 shadow-xl text-white">
                <h1 className="text-3xl font-bold">
                    Invoice Payment
                </h1>
                <p className="mt-2 text-slate-400">
                    Please review your invoice before payment.
                </p>
                <div className="mt-8 space-y-5">
                    <div>
                        <strong>
                            Company
                        </strong>
                        <p>
                            {invoice.tenant.name}
                        </p>
                    </div>
                    <div>
                        <strong>
                            Customer
                        </strong>
                        <p>
                            {invoice.salesOrder.customer.name}
                        </p>
                    </div>
                    <div>
                        <strong>
                            Invoice Number
                        </strong>
                        <p>
                            {invoice.invoiceNumber}
                        </p>
                    </div>
                    <div>
                        <strong>
                            Amount
                        </strong>
                        <p>
                            ₹
                            {
                                Number(
                                    invoice.amount
                                ).toLocaleString()
                            }
                        </p>
                    </div>
                    <div>
                        <strong>
                            Due Date
                        </strong>
                        <p>
                            {
                                new Date(
                                    invoice.dueDate
                                ).toLocaleDateString()
                            }
                        </p>
                    </div>
                    <div>
                        <strong>
                            Status
                        </strong>
                        <p>
                            {invoice.status}
                        </p>
                    </div>
                </div>
                <div className="mt-8 flex gap-4">
                    <Button
                        className="flex-1"
                        disabled={
                            paying ||
                            failing
                        }
                        onClick={
                            handlePay
                        }
                    >
                        Pay Now
                    </Button>
                    <Button
                        variant="destructive"
                        className="flex-1"
                        disabled={
                            paying ||
                            failing
                        }
                        onClick={
                            handleFail
                        }
                    >
                        Not Interested
                    </Button>
                </div>
            </div>
        </div>
    );
}

export default InvoiceReviewPage;