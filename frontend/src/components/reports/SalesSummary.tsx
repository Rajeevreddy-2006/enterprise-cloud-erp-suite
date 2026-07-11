import ReportCard from "./ReportCard";

function SalesSummary({
    data
}: any) {
    return (
        <div>
            <h2 className="text-xl font-semibold text-white mb-4"> Sales Summary </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                <ReportCard title="Customers" value={data.customers}/>
                <ReportCard title="Sales Orders" value={data.orders}/>
                <ReportCard title="Invoices" value={data.invoices}/>
                <ReportCard title="Payments" value={data.payments}/>
            </div>
        </div>
    );
}

export default SalesSummary;