import {
    Card,
    CardContent
} from "@/components/ui/card";

function PaymentStats({ payments }: any) {
    const total = payments.length;
    const pending = payments.filter((p: any) => p.status === "PENDING").length;
    const completed = payments.filter((p: any) => p.status === "COMPLETED").length;
    const failed = payments.filter((p: any) => p.status === "FAILED").length;
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
                    <p>Pending</p>
                    <h2> {pending} </h2>
                </CardContent>
            </Card>
            <Card>
                <CardContent>
                    <p>Completed</p>
                    <h2> {completed} </h2>
                </CardContent>
            </Card>
            <Card>
                <CardContent>
                    <p>Failed</p>
                    <h2> {failed} </h2>
                </CardContent>
            </Card>
        </div>
    );
}

export default PaymentStats;