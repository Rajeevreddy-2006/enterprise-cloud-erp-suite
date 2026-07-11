import {
Card,
CardContent
} from "@/components/ui/card";

function SalesOrderStats({orders}:any){
    const total = orders.length;
    const pending = orders.filter((o:any) => o.status==="PENDING").length;
    const confirmed = orders.filter((o:any) => o.status==="CONFIRMED").length;
    const completed = orders.filter((o:any) => o.status==="COMPLETED").length;
    return(
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
            <p>Confirmed</p>
            <h2>{confirmed}</h2>
            </CardContent>
        </Card>
        <Card>
            <CardContent>
            <p>Completed</p>
            <h2>{completed}</h2>
            </CardContent>
        </Card>
        </div>
    );
}

export default SalesOrderStats;