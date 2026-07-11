import { Card,CardContent } from "@/components/ui/card";
import type { PurchaseOrder } from "@/types/purchase.types";

interface Props{
    orders:PurchaseOrder[];
}

function PurchaseStats({ orders }:Props){
    const total = orders.length;
    const pending = orders.filter(o=>o.status==="PENDING").length;
    const approved = orders.filter(o=>o.status==="APPROVED").length;
    const received = orders.filter(o=>o.status==="RECEIVED").length;
    return(
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card>
            <CardContent>
            <p>Total Orders</p>
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
            <p>Received</p>
            <h2>{received}</h2>
            </CardContent>
        </Card>
        </div>
    )
}

export default PurchaseStats;