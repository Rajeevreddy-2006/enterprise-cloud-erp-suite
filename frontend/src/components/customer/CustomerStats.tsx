import { Card,CardContent } from "@/components/ui/card";

function CustomerStats({ customers }:any){
const total = customers.length;
    return(
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            <Card>
                <CardContent>
                <p>Total Customers</p>
                <h2> {total} </h2>
                </CardContent>
            </Card>
        </div>
    );
}

export default CustomerStats;