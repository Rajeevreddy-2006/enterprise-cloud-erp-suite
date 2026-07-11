import { useNavigate } from "react-router-dom";

import { Button } from "@/components/ui/button";

interface Props {
    success: boolean;
}

function InvoicePaymentResult({
    success,
}: Props) {

    const navigate =
        useNavigate();

    return (

        <div className="min-h-screen bg-slate-950 flex items-center justify-center p-6">

            <div className="w-full max-w-lg rounded-xl border bg-slate-900 p-10 text-center text-white shadow-xl">

                <div className="text-6xl">

                    {success ? "✅" : "❌"}

                </div>

                <h1 className="mt-6 text-3xl font-bold">

                    {
                        success
                            ? "Payment Successful"
                            : "Payment Failed"
                    }

                </h1>

                <p className="mt-3 text-slate-400">

                    {
                        success
                            ? "Thank you. Your payment has been recorded successfully."
                            : "Your payment could not be completed. Please contact the company."
                    }

                </p>

                <Button
                    className="mt-8 w-full"
                    onClick={() =>
                        navigate("/")
                    }
                >
                    Close
                </Button>

            </div>

        </div>

    );

}

export default InvoicePaymentResult;