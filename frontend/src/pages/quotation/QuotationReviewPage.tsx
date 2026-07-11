import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

import { toast } from "sonner";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

import {
    useReviewQuotation,
} from "@/hooks/quotation_hooks/useReviewQuotation";

import {
    useAcceptQuotation,
} from "@/hooks/quotation_hooks/useAcceptQuotation";

import {
    useRejectQuotation,
} from "@/hooks/quotation_hooks/useRejectQuotation";

function QuotationReviewPage() {

    const { token = "" } =
        useParams();

    const navigate =
        useNavigate();

    const [requestedQuantity, setRequestedQuantity] =
        useState(1);

    const {
        data: quotation,
        isLoading,
        isError,
    } = useReviewQuotation(token);

    const {
        mutate: acceptQuotation,
        isPending: accepting,
    } = useAcceptQuotation();

    const {
        mutate: rejectQuotation,
        isPending: rejecting,
    } = useRejectQuotation();

    function handleAccept() {

        if (requestedQuantity <= 0) {

            toast.error(
                "Please enter a valid quantity."
            );

            return;

        }

        acceptQuotation(
            {
                token,
                data: {
                    requestedQuantity,
                },
            },
            {
                onSuccess() {

                    toast.success(
                        "Quotation accepted."
                    );

                    navigate(
                        "/quotation/result/accepted"
                    );

                },

                onError(error: any) {

                    toast.error(
                        error?.response?.data?.message ??
                        "Unable to accept quotation."
                    );

                },
            }
        );

    }

    function handleReject() {

        rejectQuotation(
            token,
            {
                onSuccess() {

                    toast.success(
                        "Quotation rejected."
                    );

                    navigate(
                        "/quotation/result/rejected"
                    );

                },

                onError(error: any) {

                    toast.error(
                        error?.response?.data?.message ??
                        "Unable to reject quotation."
                    );

                },
            }
        );

    }

    if (isLoading) {

        return (

            <div className="flex min-h-screen items-center justify-center">

                Loading quotation...

            </div>

        );

    }

    if (isError || !quotation) {

        return (

            <div className="flex min-h-screen items-center justify-center">

                Invalid or expired quotation.

            </div>

        );

    }

    return (

        <div className="min-h-screen bg-slate-950 flex items-center justify-center p-6">

            <div className="w-full max-w-2xl rounded-xl border bg-slate-900 p-8 shadow-xl text-white">

                <h1 className="text-3xl font-bold">

                    Quotation Review

                </h1>

                <p className="mt-2 text-slate-400">

                    Please review your quotation below.

                </p>

                <div className="mt-8 space-y-4">

                    <div>

                        <strong>

                            Company

                        </strong>

                        <p>

                            {quotation.tenant.name}

                        </p>

                    </div>

                    <div>

                        <strong>

                            Customer

                        </strong>

                        <p>

                            {quotation.customer.name}

                        </p>

                    </div>

                    <div>

                        <strong>

                            Quotation Number

                        </strong>

                        <p>

                            {quotation.quotationNumber}

                        </p>

                    </div>

                    <div>

                        <strong>

                            Price Per Unit

                        </strong>

                        <p>

                            ₹{Number(
                                quotation.amount
                            ).toLocaleString()}

                        </p>

                    </div>

                    <div>

                        <strong>

                            Valid Until

                        </strong>

                        <p>

                            {new Date(
                                quotation.validUntil
                            ).toLocaleDateString()}

                        </p>

                    </div>

                    <div className="space-y-2">

                        <Label>

                            Quantity Required

                        </Label>

                        <Input
                            type="number"
                            min={1}
                            value={requestedQuantity}
                            onChange={(e) =>
                                setRequestedQuantity(
                                    Number(
                                        e.target.value
                                    )
                                )
                            }
                        />

                    </div>

                    <div>

                        <strong>

                            Estimated Total

                        </strong>

                        <p>

                            ₹
                            {(
                                Number(
                                    quotation.amount
                                ) *
                                requestedQuantity
                            ).toLocaleString()}

                        </p>

                    </div>

                </div>

                <div className="mt-10 flex gap-4">

                    <Button
                        className="flex-1"
                        disabled={
                            accepting ||
                            rejecting
                        }
                        onClick={handleAccept}
                    >

                        Accept

                    </Button>

                    <Button
                        variant="destructive"
                        className="flex-1"
                        disabled={
                            accepting ||
                            rejecting
                        }
                        onClick={handleReject}
                    >

                        Reject

                    </Button>

                </div>

            </div>

        </div>

    );

}

export default QuotationReviewPage;