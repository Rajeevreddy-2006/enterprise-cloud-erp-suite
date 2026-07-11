import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useForm } from "react-hook-form";

import { toast } from "sonner";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

import {
    useVerifyCustomerInvitation,
} from "@/hooks/customerInvitation_hooks/useVerifyCustomerInvitation";

import {
    useCompleteCustomerRegistration,
} from "@/hooks/customerInvitation_hooks/useCompleteCustomerRegistration";

import type {
    CompleteCustomerRegistration,
} from "@/types/customerInvitation.types";

function CustomerRegisterPage() {

    const { token = "" } = useParams();

    const [completed, setCompleted] = useState(false);

    const {
        data,
        isLoading,
        isError,
    } = useVerifyCustomerInvitation(token);

    const {
        mutate,
        isPending,
    } = useCompleteCustomerRegistration();

    const {
        register,
        handleSubmit,
        reset,
    } = useForm<CompleteCustomerRegistration>();

    useEffect(() => {
        if (data) {
            reset({
                email: data.email,
            });
        }
    }, [data, reset]);

    function onSubmit(
        formData: CompleteCustomerRegistration
    ) {
        mutate(
            {
                token,
                data: formData,
            },
            {
                onSuccess() {
                    toast.success(
                        "Registration completed successfully."
                    );
                    setCompleted(true);
                },
                onError(error: any) {
                    toast.error(
                        error?.response?.data?.message ??
                        "Registration failed."
                    );
                },
            }
        );
    }

    if (isLoading) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-slate-950 text-white">
                Loading...
            </div>
        );
    }

    if (isError || !data) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-slate-950 text-red-400">
                Invalid or expired invitation.
            </div>
        );
    }
    if (completed) {
        return (
            <div className="min-h-screen bg-slate-950 flex items-center justify-center px-4">

                <div className="w-full max-w-lg rounded-xl border border-slate-700 bg-slate-900 p-8 text-center">

                    <h1 className="text-3xl font-bold text-white">
                        Thank You!
                    </h1>

                    <p className="mt-6 text-slate-300">
                        Your customer registration has been completed successfully.
                    </p>

                    <p className="mt-4 text-slate-400">
                        Thank you for registering with us.
                        Your information has been securely received.
                    </p>

                    <p className="mt-2 text-slate-400">
                        Our team will contact you if any further information is required.
                    </p>

                    <Button
                        className="mt-8 w-full"
                        onClick={() => window.location.href = "about:blank"}
                    >
                        Close
                    </Button>

                </div>

            </div>
        );
    }
    return (
        <div className="min-h-screen bg-slate-950 flex items-center justify-center px-4 py-8">
            <div className="w-full max-w-lg rounded-xl border border-slate-700 bg-slate-900 p-8">
                <h1 className="text-3xl font-bold text-white">
                    Customer Registration
                </h1>
                <p className="mt-2 mb-8 text-slate-400">
                    Complete your registration.
                </p>
                <form
                    onSubmit={handleSubmit(onSubmit)}
                    className="space-y-5"
                >
                    <div>
                        <Label>Name</Label>
                        <Input
                            placeholder="Full Name"
                            {...register("name")}
                        />
                    </div>
                    <div>
                        <Label>Email</Label>
                        <Input
                            placeholder="Email"
                            {...register("email")}
                        />
                    </div>
                    <div>
                        <Label>Phone</Label>
                        <Input
                            placeholder="Phone Number"
                            {...register("phone")}
                        />
                    </div>
                    <div>
                        <Label>Address</Label>
                        <Input
                            placeholder="Address"
                            {...register("address")}
                        />
                    </div>
                    <Button
                        className="w-full text-white"
                        type="submit"
                        disabled={isPending}
                    >
                        {
                            isPending
                                ? "Registering..."
                                : "Complete Registration"
                        }
                    </Button>
                </form>
            </div>
        </div>
    );
}

export default CustomerRegisterPage;