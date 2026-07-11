import { Card,CardContent } from "@/components/ui/card";
import type { GoodsReceiptNote } from "@/types/grn.types";

interface Props{
    grns:GoodsReceiptNote[];
}

function GRNStats({ grns }:Props){
    const total = grns.length;
    const pending = grns.filter(g=>g.status==="PENDING").length;
    const received = grns.filter(g=>g.status==="RECEIVED").length;
    const rejected = grns.filter(g=>g.status==="REJECTED").length;
    return(
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
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
            <p>Received</p>
            <h2>{received}</h2>
            </CardContent>
        </Card>
        <Card>
            <CardContent>
            <p>Rejected</p>
            <h2>{rejected}</h2>
            </CardContent>
        </Card>
        </div>
    );
}

export default GRNStats;