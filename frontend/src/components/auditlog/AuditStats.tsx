import {
    Card,
    CardContent
} from "@/components/ui/card";

function AuditStats({
    logs
}: any) {
    const total = logs.length;
    const users = new Set(logs.map((log: any) => log.userId)).size;
    const entities = new Set(logs.map((log: any) => log.entity)).size;
    return (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <Card>
                <CardContent>
                    <p>Total Logs</p>
                    <h2> {total} </h2>
                </CardContent>
            </Card>
            <Card>
                <CardContent>
                    <p>Users</p>
                    <h2> {users} </h2>
                </CardContent>
            </Card>
            <Card>
                <CardContent>
                    <p>Entities</p>
                    <h2> {entities} </h2>
                </CardContent>
            </Card>
        </div>
    );
}

export default AuditStats;