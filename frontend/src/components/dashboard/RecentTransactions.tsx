import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";

interface Props{
    transactions:any[];
}

function RecentTransactions({ transactions }:Props){
    return(
        <Card className="bg-slate-900 border-slate-800">
        <CardHeader>
            <CardTitle className="text-white"> Recent Transactions </CardTitle>
        </CardHeader>
        <CardContent>
        {
            transactions.map((transaction)=>(
                <div key={transaction.id} className="flex justify-between py-2 border-b border-slate-800">
                <div>
                    <p className="text-white"> {transaction.description} </p>
                    <p className="text-sm text-slate-400"> {transaction.type} </p>
                </div>
                    <p className="tet-green-500 font-semibold"> ₹{transaction.amount} </p>
                </div>
            ))
        }
        </CardContent>
        </Card>
    )
}

export default RecentTransactions;