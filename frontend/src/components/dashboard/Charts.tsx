import {

Card,
CardHeader,
CardTitle,
CardContent

}

from "@/components/ui/card";

import {

ResponsiveContainer,
LineChart,
Line,
XAxis,
YAxis,
Tooltip,
CartesianGrid

}

from "recharts";

const data=[

{month:"Jan",employees:80},

{month:"Feb",employees:95},

{month:"Mar",employees:105},

{month:"Apr",employees:120},

{month:"May",employees:130},

{month:"Jun",employees:145}

];

function Charts(){

return(

<Card

className="
bg-slate-900
border-slate-800
"

>

<CardHeader>

<CardTitle

className="text-white"

>

Employee Growth

</CardTitle>

</CardHeader>

<CardContent>

<div className="h-80">

<ResponsiveContainer>

<LineChart

data={data}

>

<CartesianGrid

stroke="#334155"

/>

<XAxis

dataKey="month"

/>

<YAxis/>

<Tooltip/>

<Line

type="monotone"

dataKey="employees"

stroke="#3b82f6"

strokeWidth={3}

/>

</LineChart>

</ResponsiveContainer>

</div>

</CardContent>

</Card>

)

}

export default Charts;