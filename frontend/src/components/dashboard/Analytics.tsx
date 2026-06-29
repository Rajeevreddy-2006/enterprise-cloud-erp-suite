import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";

function Analytics(){
return(
<Card className="bg-slate-900 border-slate-800">
<CardHeader>
<CardTitle className="text-white"> Analytics </CardTitle>
</CardHeader>
<CardContent>
<div className="space-y-4">
<div>
<p className="text-slate-400">
Employee Growth
</p>
<p className="text-white">
+12%
</p>
</div>
<div>
<p className="text-slate-400">
Leave Requests
</p>
<p className="text-white">
18
</p>
</div>
<div>
<p className="text-slate-400">
Revenue Growth
</p>
<p className="text-green-400">
+22%
</p>
</div>
</div>
</CardContent>
</Card>
)

}

export default Analytics;