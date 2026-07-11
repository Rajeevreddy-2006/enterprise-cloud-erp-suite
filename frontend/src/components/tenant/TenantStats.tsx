import {
    Card,
    CardContent
} from "@/components/ui/card";

function TenantStats({ tenants }: any) {
    const total = tenants.length;
    const active = tenants.filter((t: any) => t.isActive).length;
    const inactive = total - active;
    return (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <Card>
                <CardContent>
                    <p>Total Tenants</p>
                    <h2> {total} </h2>
                </CardContent>
            </Card>
            <Card>
                <CardContent>
                    <p>Active</p>
                    <h2> {active} </h2>
                </CardContent>
            </Card>
            <Card>
                <CardContent>
                    <p>Inactive</p>
                    <h2> {inactive} </h2>
                </CardContent>
            </Card>
        </div>
    );
}

export default TenantStats;