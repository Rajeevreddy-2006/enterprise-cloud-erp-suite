import {
    Card,
    CardContent
} from "@/components/ui/card";

function LeadStats({
    leads
}: any) {
    const total = leads.length;
    const newLeads = leads.filter((l: any) => l.status === "NEW").length;
    const contacted = leads.filter((l: any) => l.status === "CONTACTED").length;
    const qualified = leads.filter((l: any) => l.status === "QUALIFIED").length;
    return (
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <Card>
                <CardContent>
                    <p>Total Leads</p>
                    <h2> {total} </h2>
                </CardContent>
            </Card>
            <Card>
                <CardContent>
                    <p>New</p>
                    <h2> {newLeads} </h2>
                </CardContent>
            </Card>
            <Card>
                <CardContent>
                    <p>Contacted</p>
                    <h2> {contacted} </h2>
                </CardContent>
            </Card>
            <Card>
                <CardContent>
                    <p>Qualified</p>
                    <h2> {qualified} </h2>
                </CardContent>
            </Card>
        </div>
    );
}

export default LeadStats;