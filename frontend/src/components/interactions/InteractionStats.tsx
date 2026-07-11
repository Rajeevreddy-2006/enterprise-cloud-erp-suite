import {
    Card,
    CardContent
} from "@/components/ui/card";

function InteractionStats({
    interactions
}: any) {
    const total = interactions.length;
    const calls = interactions.filter((i: any) => i.interactionType === "CALL").length;
    const emails = interactions.filter((i: any) => i.interactionType === "EMAIL").length;
    const meetings = interactions.filter((i: any) => i.interactionType === "MEETING").length;
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
                    <p>Calls</p>
                    <h2> {calls} </h2>
                </CardContent>
            </Card>
            <Card>
                <CardContent>
                    <p>Emails</p>
                    <h2> {emails} </h2>
                </CardContent>
            </Card>
            <Card>
                <CardContent>
                    <p>Meetings</p>
                    <h2> {meetings} </h2>
                </CardContent>
            </Card>
        </div>
    );
}

export default InteractionStats;