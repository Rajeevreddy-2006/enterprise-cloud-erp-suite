import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";

interface Props{
    total:number;
    lowStock:number;
}

function InventorySummary({ total, lowStock }:Props){
    return(
        <Card className="bg-slate-900 border-slate-800">
        <CardHeader>
            <CardTitle className="text-white"> Inventory Summary </CardTitle>
        </CardHeader>
        <CardContent>
            <div className="space-y-4">
                <div>
                    <p className=" text-slate-400"> Total Items </p>
                    <p className="text-3xl font-bold text-white"> {total} </p>
                </div>
                <div>
                    <p className="text-red-400"> Low Stock </p>
                    <p className="text-2xl font-bold text-red-500"> {lowStock} </p>
                </div>
            </div>
        </CardContent>
        </Card>
    )
}

export default InventorySummary;