import { Card,CardContent } from "@/components/ui/card";
import type { Transaction } from "@/types/transaction.types";

interface Props{
    transactions:Transaction[];
}

function TransactionStats({ transactions }:Props){
    const credits = transactions.filter(t=>t.type==="CREDIT").length;
    const debits = transactions.filter(t=>t.type==="DEBIT").length;
    const total = transactions.reduce((sum,t) => sum+t.amount,0);
    return(
        <div className="grid md:grid-cols-4 gap-4">
            <Card>
                <CardContent>
                    <div>
                        <p>Total</p>
                        <h2> { transactions.length } </h2>
                    </div>
                </CardContent>
            </Card>
            <Card>
                <CardContent>
                <div>
                    <p>Credits</p>
                    <h2> { credits } </h2>
                </div>
                </CardContent>
            </Card>
            <Card>
                <CardContent>
                <div>
                    <p>Debits</p>
                    <h2> { debits } </h2>
                </div>
                </CardContent>
            </Card>
            <Card>
                <CardContent>
                <div>
                    <p>Amount</p>
                    <h2> ₹{total} </h2>
                </div>
                </CardContent>
            </Card>
        </div>
    );
}

export default TransactionStats;