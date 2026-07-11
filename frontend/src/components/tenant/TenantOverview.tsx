import {
    Card,
    CardContent
} from "@/components/ui/card";

interface Props {
    tenant?: any;
}

function TenantOverview({tenant}: Props) {
    if (!tenant) {
        return null;
    }
    return (
        <Card>
            <CardContent className="p-5">
                <h2 className="text-lg font-semibold mb-4">
                    Tenant Overview
                </h2>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                    <div>
                        <p className="text-slate-400"> Employees </p>
                        <h3 className="text-xl font-bold"> {tenant.employees || 0} </h3>
                    </div>
                    <div>
                        <p className="text-slate-400"> Customers </p>
                        <h3 className="text-xl font-bold"> {tenant.customers || 0} </h3>
                    </div>
                    <div>
                        <p className="text-slate-400"> Projects </p>
                        <h3 className="text-xl font-bold"> {tenant.projects || 0} </h3>
                    </div>
                    <div>
                        <p className="text-slate-400"> Invoices </p>
                        <h3 className="text-xl font-bold"> {tenant.invoices || 0} </h3>
                    </div>
                </div>
            </CardContent>
        </Card>
    );
}

export default TenantOverview;