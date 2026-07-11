import {
Card,
CardContent
} from "@/components/ui/card";

function StockMovementStats({ movements }:any){
    const total = movements.length;
    const purchase = movements.filter((m:any) => m.movementType==="PURCHASE").length;
    const sale = movements.filter((m:any) => m.movementType==="SALE").length;
    const adjustment = movements.filter((m:any) => m.movementType==="ADJUSTMENT").length;
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
            <p>Purchase</p>
            <h2>{purchase}</h2>
            </CardContent>
        </Card>
        <Card>
            <CardContent>
            <p>Sale</p>
            <h2>{sale}</h2>
            </CardContent>
        </Card>
        <Card>
            <CardContent>
            <p>Adjustment</p>
            <h2>{adjustment}</h2>
            </CardContent>
        </Card>
        </div>
    );
}

export default StockMovementStats;