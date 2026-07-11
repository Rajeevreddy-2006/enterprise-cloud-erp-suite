import {
    Card,
    CardContent
} from "@/components/ui/card";

function PurchaseRequestStats({ requests }: any) {
    const total = requests.length;
    const pending = requests.filter((r: any) => r.status === "PENDING").length;
    const approved = requests.filter((r: any) => r.status === "APPROVED").length;
    const rejected = requests.filter((r: any) => r.status === "REJECTED").length;
    return (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            <Card>
                <CardContent>
                    <p>Total</p>
                    <h2>{total}</h2>
                </CardContent>
            </Card>
            <Card>
                <CardContent>
                    <p>Pending</p>
                    <h2>{pending}</h2>
                </CardContent>
            </Card>
            <Card>
                <CardContent>
                    <p>Approved</p>
                    <h2>{approved}</h2>
                </CardContent>
            </Card>
            <Card>
                <CardContent>
                    <p>Rejected</p>
                    <h2>{rejected}</h2>
                </CardContent>
            </Card>
        </div>
    );
}

export default PurchaseRequestStats;