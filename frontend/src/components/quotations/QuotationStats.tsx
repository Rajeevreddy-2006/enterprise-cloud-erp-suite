import {
    Card,
    CardContent
} from "@/components/ui/card";

interface Props {
    quotations: any[];
}

function QuotationStats({
    quotations
}: Props) {
    const total = quotations.length;
    const draft = quotations.filter((q: any) => q.status === "DRAFT").length;
    const sent = quotations.filter((q: any) => q.status === "SENT").length;
    const accepted = quotations.filter((q: any) => q.status === "ACCEPTED").length;
    const rejected = quotations.filter((q: any) => q.status === "REJECTED").length;
    return (
        <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
            <Card>
                <CardContent className="p-5">
                    <p>Total</p>
                    <h2 className="text-2xl font-bold"> {total} </h2>
                </CardContent>
            </Card>
            <Card>
                <CardContent className="p-5">
                    <p>Draft</p>
                    <h2 className="text-2xl font-bold"> {draft} </h2>
                </CardContent>
            </Card>
            <Card>
                <CardContent className="p-5">
                    <p>Sent</p>
                    <h2 className="text-2xl font-bold"> {sent} </h2>
                </CardContent>
            </Card>
            <Card>
                <CardContent className="p-5">
                    <p>Accepted</p>
                    <h2 className="text-2xl font-bold"> {accepted} </h2>
                </CardContent>
            </Card>
            <Card>
                <CardContent className="p-5">
                    <p>Rejected</p>
                    <h2 className="text-2xl font-bold"> {rejected} </h2>
                </CardContent>
            </Card>
        </div>
    );
}

export default QuotationStats;