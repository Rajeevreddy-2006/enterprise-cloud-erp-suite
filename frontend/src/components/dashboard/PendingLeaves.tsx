import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";

interface Props{
    leaves:any[];
}

function PendingLeaves({ leaves } : Props){
    return(
        <Card className="bg-slate-900 border-slate-800">
        <CardHeader>
            <CardTitle className="text-white"> Pending Leaves </CardTitle>
        </CardHeader>
        <CardContent>
        <div className="space-y-4">
        {
            leaves.map((leave)=>(
                <div key={leave.id} className="flex justify-between">
                    <p className="text-white"> {leave.employee} </p>
                    <p className="text-yellow-400"> {leave.status} </p>
                </div>
            ))
        }
        </div>
        </CardContent>
        </Card>
    )
}

export default PendingLeaves;
