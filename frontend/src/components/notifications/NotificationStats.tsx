import {
    Card,
    CardContent
} from "@/components/ui/card";

function NotificationStats({
    notifications
}: any) {
    const total = notifications.length;
    const unread = notifications.filter((n: any) => !n.isRead).length;
    const read = notifications.filter((n: any) => n.isRead).length;
    return (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <Card>
                <CardContent>
                    <p>Total</p>
                    <h2> {total} </h2>
                </CardContent>
            </Card>
            <Card>
                <CardContent>
                    <p>Unread</p>
                    <h2> {unread} </h2>
                </CardContent>
            </Card>
            <Card>
                <CardContent>
                    <p>Read</p>
                    <h2> {read} </h2>
                </CardContent>
            </Card>
        </div>
    );
}

export default NotificationStats;