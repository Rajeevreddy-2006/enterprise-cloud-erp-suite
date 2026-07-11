import AppLayout
    from "@/components/layout/AppLayout";

import PayrollTable
    from "@/components/payroll/PayrollTable";

import {
    usePayrolls
} from "@/hooks/payroll_hooks/usePayrolls";

import {
    useMarkAsPaid
} from "@/hooks/payroll_hooks/useMarkAsPaid";

import {
    toast
} from "sonner";

function PayrollApprovalPage() {
    const {
        data,
        isLoading,
        isError,
        refetch
    } = usePayrolls();
    const markAsPaid = useMarkAsPaid();
    const payrolls = data || [];
    const handlePay = (payrollId: string) => {
        markAsPaid.mutate(
            payrollId,
            {
                onSuccess() {
                    toast.success(
                        "Payroll approved successfully."
                    );
                    refetch();
                },
                onError(error: any) {
                    toast.error(
                        error?.response?.data?.message ||
                        "Failed to approve payroll."
                    );
                }
            }
        );
    };
    return (
        <AppLayout>
            <div className="space-y-6">
                <div className="flex items-center justify-between">
                    <div>
                        <h1 className="text-3xl font-bold text-white">
                            Payroll Approval
                        </h1>
                        <p className="text-slate-400">
                            Review pending payrolls and approve salary payments.
                        </p>
                    </div>
                </div>
                {
                    isLoading && (
                        <div className="flex justify-center py-10">
                            Loading payrolls...
                        </div>
                    )
                }
                {
                    isError && (
                        <div className="rounded-md border border-red-500 bg-red-500/10 p-4 text-red-500">
                            Failed to load payrolls.
                        </div>
                    )
                }
                {
                    !isLoading &&
                    !isError &&
                    (
                        <PayrollTable
                            payrolls={payrolls}
                            showActions
                            onPay={handlePay}
                        />
                    )
                }
            </div>
        </AppLayout>
    );
}

export default PayrollApprovalPage;