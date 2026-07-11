import ReportCard from "./ReportCard";

function InventorySummary({
    data
}: any) {
    return (
        <div>
            <h2 className="text-xl font-semibold text-white mb-4"> Inventory Summary </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                <ReportCard title="Inventory Items" value={data.items}/>
                <ReportCard title="Suppliers" value={data.suppliers}/>
                <ReportCard title="Purchase Orders" value={data.purchaseOrders} />
                <ReportCard title="GRN" value={data.grns}/>
            </div>
        </div>
    );
}

export default InventorySummary;