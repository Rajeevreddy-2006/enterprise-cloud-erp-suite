import {
    Card,
    CardContent
} from "@/components/ui/card";

function OpportunityStats({
    opportunities
}: any) {
    const total = opportunities.length;
    const open = opportunities.filter((o: any) => o.status === "OPEN").length;
    const won = opportunities.filter((o: any) => o.status === "WON").length;
    const lost = opportunities.filter((o: any) => o.status === "LOST").length;
    return (
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <Card>
                <CardContent>
                    <p>Total</p>
                    <h2> {total} </h2>
                </CardContent>
            </Card>
            <Card>
                <CardContent>
                    <p>Open</p>
                    <h2> {open} </h2>
                </CardContent>
            </Card>
            <Card>
                <CardContent>
                    <p>Won</p>
                    <h2> {won} </h2>
                </CardContent>
            </Card>
            <Card>
                <CardContent>
                    <p>Lost</p>
                    <h2> {lost} </h2>
                </CardContent>
            </Card>
        </div>
    );
}

export default OpportunityStats;