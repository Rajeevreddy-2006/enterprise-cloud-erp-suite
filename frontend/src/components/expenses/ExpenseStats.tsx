import {
    Card,
    CardContent
} from "@/components/ui/card";

interface Props {
    expenses: any[];
}

function ExpenseStats({
    expenses
}: Props) {
    const total = expenses.length;
    const pending = expenses.filter((e: any) => e.status === "PENDING").length;
    const approved = expenses.filter((e: any) => e.status === "APPROVED").length;
    const paid = expenses.filter((e: any) => e.status === "PAID").length;
    return (
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <Card>
                <CardContent className="p-5">
                    <p>Total</p>
                    <h2 className="text-2xl font-bold"> {total} </h2>
                </CardContent>
            </Card>
            <Card>
                <CardContent className="p-5">
                    <p>Pending</p>
                    <h2 className="text-2xl font-bold"> {pending} </h2>
                </CardContent>
            </Card>
            <Card>
                <CardContent className="p-5">
                    <p>Approved</p>
                    <h2 className="text-2xl font-bold"> {approved} </h2>
                </CardContent>
            </Card>
            <Card>
                <CardContent className="p-5">
                    <p>Paid</p>
                    <h2 className="text-2xl font-bold"> {paid} </h2>
                </CardContent>
            </Card>
        </div>
    );
}

export default ExpenseStats;