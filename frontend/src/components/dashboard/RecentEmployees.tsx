import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";

interface Props{
    employees:any[];
}

function RecentEmployees({ employees }:Props){
    return(
        <Card className="bg-slate-900 border-slate-800">
        <CardHeader>
            <CardTitle className="text-white"> Recent Employees </CardTitle>
        </CardHeader>
        <CardContent>
        <div className="space-y-4">
        {
            employees.map((employee)=>(
                <div key={employee.id}>
                    <p className="text-white"> {employee.name} </p>
                    <p className="text-sm text-slate-400"> {employee.email} </p>
                </div>
            ))
        }
        </div>
        </CardContent>
        </Card>
    )
}

export default RecentEmployees;
