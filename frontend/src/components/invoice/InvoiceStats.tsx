import {
    Card,
    CardContent
} from "@/components/ui/card";

function InvoiceStats({ invoices }: any) {
    const total = invoices.length;
    const draft = invoices.filter((i: any) => i.status === "DRAFT").length;
    const sent = invoices.filter( (i: any) => i.status === "SENT").length;
    const paid = invoices.filter((i: any) => i.status === "PAID").length;
    return (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            <Card>
                <CardContent>
                    <p>Total</p>
                    <h2> {total} </h2>
                </CardContent>
            </Card>
            <Card>
                <CardContent>
                    <p>Draft</p>
                    <h2> {draft} </h2>
                </CardContent>
            </Card>
            <Card>
                <CardContent>
                    <p>Sent</p>
                    <h2> {sent} </h2>
                </CardContent>
            </Card>
            <Card>
                <CardContent>
                    <p>Paid</p>
                    <h2> {paid} </h2>
                </CardContent>
            </Card>
        </div>
    );
}

export default InvoiceStats;