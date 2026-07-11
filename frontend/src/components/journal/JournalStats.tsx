import { Card, CardContent } from "@/components/ui/card";
import type { JournalEntry } from "@/types/journal.types";

interface Props{
    entries:JournalEntry[];
}

function JournalStats({entries}:Props){
    const totalAmount = entries.reduce((sum,item) => sum + Number(item.amount),0);
    return(
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card>
            <CardContent>
                <p>Total Entries</p>
                <h2> {entries.length} </h2>
            </CardContent>
        </Card>
        <Card>
            <CardContent>
                <p>Total Amount</p>
                <h2> ₹{totalAmount} </h2>
            </CardContent>
        </Card>
        <Card>
            <CardContent>
                <p>Transactions</p>
                <h2> { entries.filter(e => e.transaction).length } </h2>
            </CardContent>
        </Card>
        <Card>
            <CardContent>
                <p>Accounts Used</p>
                <h2> { new Set(entries.flatMap(e => [e.debitAccountId,e.creditAccountId])).size } </h2>
            </CardContent>
        </Card>
        </div>
    );
}

export default JournalStats;