import { useLocation } from "react-router-dom";

function QuotationResultPage() {

    const location =
        useLocation();

    const accepted =
        location.pathname.includes(
            "accepted"
        );

    return (

        <div className="min-h-screen flex items-center justify-center bg-slate-950">

            <div className="rounded-xl bg-slate-900 p-10 text-center">

                <h1 className="text-3xl font-bold text-white">

                    Thank You

                </h1>

                <p className="mt-4 text-slate-300">

                    {
                        accepted
                            ? "Your quotation has been accepted successfully."
                            : "Your quotation has been rejected."
                    }

                </p>

                <p className="mt-2 text-slate-400">

                    You may now close this window.

                </p>

            </div>

        </div>

    );

}

export default QuotationResultPage;