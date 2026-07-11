import AppLayout from "@/components/layout/AppLayout";
import HRSummary from "@/components/reports/HRSummary";
import FinancialSummary from "@/components/reports/FinancialSummary";
import InventorySummary from "@/components/reports/InventorySummary";
import SalesSummary from "@/components/reports/SalesSummary";
import { useReports } from "@/hooks/useReports";
import { Button } from "@/components/ui/button";

function ReportsPage() {
    const {
        data,
        isLoading,
        isError
    } = useReports();
    if (isLoading) {
        return (
            <AppLayout>
                <div className="text-white text-center py-20">
                    Loading Reports...
                </div>
            </AppLayout>
        );
    }
    if (isError) {
        return (
            <AppLayout>
                <div className="text-red-500 text-center py-20">
                    Failed to load reports
                </div>
            </AppLayout>
        );
    }
    const report = data?.data;
    return (
        <AppLayout>
            <div className="space-y-6">
                <div className="flex jutify-between items-center">
                    <h1 className="text-3xl font-bold text-white"> Reports </h1>
                    <div className="flex gap-3">
                        <Button> Export PDF </Button>
                        <Button> Export Excel </Button>
                    </div>
                </div>
                <HRSummary data={report.hr}/>
                <FinancialSummary data={report.finance}/>
                <InventorySummary data={report.inventory}/>
                <SalesSummary data={report.sales}/>
            </div>
        </AppLayout>
    );
}

export default ReportsPage;