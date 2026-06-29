import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";

interface Props{ 
    approvals:any[]; 
}

function ApprovalQueue({ approvals }:Props){
    return(
        <Card className="bg-slate-900 border-slate-800">
        <CardHeader>
            <CardTitle className="text-white"> Approval Queue </CardTitle>
        </CardHeader>
        <CardContent>
        <div className="space-y-4">
        {
            approvals.map((item)=>(
                <div key={item.id} className="flex justify-between">
                    <div>
                        <p className="text-white"> {item.name} </p>
                        <p className="text-slate-400"> {item.module} </p>
                    </div>
                    <p className="text-yellow-400"> {item.status} </p>
                </div>
            ))
        }
        </div>
        </CardContent>
        </Card>
    )
}

export default ApprovalQueue;