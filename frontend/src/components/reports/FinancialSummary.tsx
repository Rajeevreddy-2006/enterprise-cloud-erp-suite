import ReportCard from "./ReportCard";

function FinancialSummary({
    data
}: any) {
    return (
        <div>
            <h2 className="text-xl font-semibold text-white mb-4"> Financial Summary </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                <ReportCard title="Accounts" value={data.accounts}/>
                <ReportCard title="Transactions" value={data.transactions}/>
                <ReportCard title="Journal Entries" value={data.entries}/>
                <ReportCard title="Revenue" value={`₹ ${data.revenue}`}/>
            </div>
        </div>
    );
}

export default FinancialSummary;